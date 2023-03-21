import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {deleteInToBasket, getBasket} from "../api/drinkApi";
import {Button, ButtonGroup, Card, Col, Container, Row} from 'react-bootstrap'
import {observer} from "mobx-react-lite";

const Basket = observer(() => {
    const {drink} = useContext(Context)

    useEffect(() => {
        getBasket().then(data => drink.setBaskets(data.rows))
    }, [])

    let prices = 0;
    {drink.basket.map(product =>
        prices += Number(product.price)
    )}

    const deleteItem=(id)=>{
        console.log(id)
        deleteInToBasket(id).then(response=>alert('deleted'))
        getBasket().then(data => drink.setBaskets(data.rows))
    }

    console.log(drink.basket)
    return (
        <Container
            className="d-flex flex-sm-column align-items-center mt-3"
        >
            {drink.basket.map(product =>
                <Card className="d-flex w-100 p-2 mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col md={1} className="d-flex align-items-center">
                            <Button variant='danger' onClick={()=>deleteItem(product.item_id)}>del</Button>
                        </Col>
                        <Col className="d-flex">
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.img} width={50}/>
                                <h1 className="pl-3">{product.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.price} $</h2>
                            </div>
                        </Col>
                    </Row>

                </Card>
            )}
            <Card className="d-flex flex-row  p-2 align-items-center mb-2">
                <Col className="d-flex align-items-center me-2">
                    <h2>Оформить заказ:</h2>
                </Col>
                <Button
                    onClick={()=>alert('Оформить заказ можно будет после открытия магазина...наверное!')}
                    variant='success'
                    className='d-flex justify-content-end'>
                    <h2 className="me-2">Итого:</h2>
                    <h2>{prices}<span className="font-weight-light pl-2"> $</span></h2>
                </Button>
            </Card>
        </Container>
    );
});

export default Basket;