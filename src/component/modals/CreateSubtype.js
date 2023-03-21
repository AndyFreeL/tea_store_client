import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createSubtype, fetchTypes} from "../../api/drinkApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateSubtype = observer(({show, onHide}) => {
    const {drink} = useContext(Context)
    const [value, setValue] = useState('')

    const addSubtype = () => {
        createSubtype({name: value, type_id: drink.selectedType.id}).then(data => {
            setValue('')
            onHide()
        })
    }

    useEffect(() => {
        fetchTypes().then(data => drink.setTypes(data))
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
                    Добавить новый подтип
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
                <Form>
                    <Form.Control placeholder={'Введите название типа'} value={value}
                                  onChange={e => setValue(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Close</Button>
                <Button variant='outline-success' onClick={addSubtype}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateSubtype;