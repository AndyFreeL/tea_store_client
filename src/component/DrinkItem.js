import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Image} from "react-bootstrap";
import {DRINK_ROUTE} from "../consts";

const DrinkItem = ({drink}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className='mt-3'>
            <Card style={{width: 200, cursor: 'pointer'}} border={'light'}>
                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + drink.img}/>
                <div className='d-flex justify-content-between align-items-center m-1 text-black-50'>
                    <div>В наличии</div>
                </div>
                <div className='pb-3'>{drink.name}</div>
                <div>{drink.price} $</div>
                <Button variant={'outline-success'} onClick={() => navigate(DRINK_ROUTE + "/" + drink.id)}>Подробнее</Button>
            </Card>
        </Col>
    );
};

export default DrinkItem;