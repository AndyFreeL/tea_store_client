import React from 'react';
import Toast from 'react-bootstrap/Toast';
import {ToastContainer} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {BASKET_ROUTE} from "../consts";

const ToastBasket = ({show, onHide}) => {
    const navigate = useNavigate()

    return (
        <ToastContainer  position="top-end" className="p-5">
            <Toast  onClick={() => navigate(BASKET_ROUTE)}
                    onClose={onHide} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Товар добавлен в корзину</strong>
                    <small className="text-muted">just now</small>
                </Toast.Header>
            </Toast>
        </ToastContainer>
    );
};

export default ToastBasket;