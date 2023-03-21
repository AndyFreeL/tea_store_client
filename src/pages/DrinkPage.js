import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Image, Overlay, Row, Tooltip} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {addToBasket, fetchOneDrink, getBasket} from "../api/drinkApi";
import Loader from "../component/Loader";
import ToastBasket from "../component/ToastBasket";
import {Context} from "../index";

const DrinkPage = () => {
    const {user, drink} = useContext(Context)
    const [btnInBasket, setBtnInBasket] = useState(false)
    const [drinkOne, setDrinkOne] = useState([])
    const {id} = useParams()
    const [showToast, setShowToast] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);

    useEffect(() => {
        fetchOneDrink(id).then(data => {
            setDrinkOne(data)
            console.log('component')
        })
        getBasket().then(data => drink.setBaskets(data.rows))
    }, [])

    useEffect(() => {
        console.log('basket')
        getBasket().then(data => drink.setBaskets(data.rows))
    }, [drink.basket])

    const checkBasket = () => {
        let inBasket = 0;
        for (let i = 0; i < drink.basket.length; i++) {
            if (Number(id) === drink.basket[i].id) {
                console.log('in the basket')
                setBtnInBasket(true)
                inBasket = 1;
            }
        }
        if (drink.basket.length === 0) {
            addDrink()
        } else if (inBasket === 0) {
            addDrink()
        }
    }

    const addDrink = () => {
        console.log('addDrink')
        if (user.isAuth) {
            const formData = new FormData()
            formData.append('drinkId', id)
            addToBasket(formData).then(response => setShowToast(true))
        } else {
            setShowTooltip(!showTooltip)
        }
    }


    if (drinkOne.length === 0) {
        return <Loader/>
    }

    return (
        <Container>
            <ToastBasket show={showToast} onHide={() => setShowToast(false)}/>
            <Row className='d-flex flex-row align-items-center justify-content-around'>
                <Col md={4}>
                    <div className='d-flex flex-column align-items-center justify-content-around'
                         style={{width: 300, height: 300, fontSize: 32}}>
                        <h3>{drinkOne.name}</h3>
                        <Button ref={target} variant={btnInBasket ? 'secondary' :'outline-success'} onClick={checkBasket}>
                            {btnInBasket
                                ? 'Товар уже в корзине'
                                : 'Добавить в корзину'}
                            <div
                                className='fs-5'>{drinkOne.price} $
                            </div>
                        </Button>
                        <Overlay target={target.current} show={showTooltip} placement="right">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    Авторизируйтесь для добавления товара
                                </Tooltip>
                            )}
                        </Overlay>
                    </div>
                    <Row className='d-flex flex-column m-3'>

                        {drinkOne.info.map((info, index) =>
                            <Row key={info.id}
                                 style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                                {info.title}: {info.description}
                            </Row>
                        )}
                    </Row>
                </Col>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + drinkOne.img}/>
                </Col>
            </Row>
        </Container>
    );
};

export default DrinkPage;