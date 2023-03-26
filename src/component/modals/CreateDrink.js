import React, {useContext, useEffect, useState} from 'react';
import {createDrink, fetchSubtypes, fetchTypes} from "../../api/drinkApi";
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {initializeApp} from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";

const firebaseConfig = {
    storageBucket: "filestorage-e5c3b.appspot.com",
};


let firebaseApp = initializeApp(firebaseConfig)


const CreateDrink = observer(({show, onHide}) => {
    const {drink} = useContext(Context)

    const storage = getStorage(firebaseApp, "gs://filestorage-e5c3b.appspot.com");

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState('')
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        const fileImg = e.target.files[0]
        const fileName = fileImg.name
        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, fileImg);

        uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log('Error is', error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setFile(downloadURL)
                });
            });
    }

    const addDrink = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('subtypeId', drink.selectedSubtype.id)
        formData.append('typeId', drink.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDrink(formData).then(data => onHide())
    }

    useEffect(() => {
        fetchTypes().then(data => drink.setTypes(data))
        fetchSubtypes().then(data => drink.setSubtypes(data))
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{drink.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {drink.types.map(type =>
                            <Dropdown.Item onClick={() => {
                                drink.setSelectedType(type)
                            }} key={type.id}>{type.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{drink.selectedSubtype.name || 'Выберите подтип'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {drink.subtypes.map(subtype => (subtype.type_id === drink.selectedType.id) &&
                            <Dropdown.Item onClick={() => {
                                drink.setSelectedSubtype(subtype)
                            }} key={subtype.id}>{subtype.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className='mt-3' placeholder='Введите название напитка' value={name}
                              onChange={e => setName(e.target.value)}/>
                <Form.Control className='mt-3' type='number' placeholder='Введите стоимость напитка' value={price}
                              onChange={e => setPrice(Number(e.target.value))}/>
                <Form.Control className='mt-3' type='file' onChange={selectFile}/>
                <hr/>
                <Button variant='outline-dark' onClick={addInfo}>Добавить новое свойство</Button>
                {info.map(i =>
                    <Row className='mt-4' key={i.number}>
                        <Col md={4}>
                            <Form.Control value={i.title}
                                          onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                          placeholder='Введите название свойства'/>
                        </Col>
                        <Col md={4}>
                            <Form.Control value={i.description}
                                          onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                          placeholder='Введите описание свойства'/>
                        </Col>
                        <Col md={4}>
                            <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Удалить</Button>
                        </Col>
                    </Row>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button variant='outline-success' onClick={addDrink}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDrink;