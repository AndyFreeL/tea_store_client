import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../consts";
import {login, registration} from "../api/userApi";
import {Button, Card, Container, Form, Row} from "react-bootstrap";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const navigate = useNavigate()

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const click = async () => {
        try{
            let data;
            if(isLogin){
                data = await login(email,password)
            }else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if (email === "admin@test.ru"){
                user.setIsAdmin(true)
            }
            navigate(SHOP_ROUTE)
        }catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className='d-flex justify-content-center align-items-center'
                   style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className='p-5'>
                <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <div>Тестовый аккаун: test@test.ru / test</div>
                <Form className='d-flex flex-column'>
                    <Form.Control className='mt-3' placeholder='Введите e-mail' value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Form.Control className='mt-3' placeholder='Введите пароль' value={password} onChange={e=>setPassword(e.target.value)} type='password'/>
                    <Row className='d-flex justify-content-between mt-3'>
                        {isLogin ?
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></div>
                            :
                            <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизируйтесь!</NavLink></div>
                        }
                        <Button variant={'outline-success'} onClick={click}>
                            {isLogin ? ' Войти' : 'Зарегестрироваться'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;