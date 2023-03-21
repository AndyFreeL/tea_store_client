import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../component/modals/CreateType";
import CreateSubtype from "../component/modals/CreateSubtype";
import CreateDrink from "../component/modals/CreateDrink";
import {fetchSubtypes, fetchTypes} from "../api/drinkApi";
import {Context} from "../index";

const Admin = () => {
    const {drink} = useContext(Context)

    const [drinkVisible, setDrinkVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [subtypeVisible, setSubtypeVisible] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => drink.setTypes(data))
        fetchSubtypes().then(data => drink.setSubtypes(data))
    })

    return (
        <Container className='d-flex flex-column'>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>Добавить
                тип</Button>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setSubtypeVisible(true)}>Добавить
                подтип</Button>
            <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setDrinkVisible(true)}>Добавить
                напиток</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateSubtype show={subtypeVisible} onHide={() => setSubtypeVisible(false)}/>
            <CreateDrink show={drinkVisible} onHide={() => setDrinkVisible(false)}/>
        </Container>
    );
};

export default Admin;