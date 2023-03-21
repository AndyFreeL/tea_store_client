import React, {useContext, useEffect} from 'react';
import {Button, Container, Image, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../consts";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import enter from '../assets/enter.png';
import logout from '../assets/logout.png';
import admin from '../assets/admin.png';
import cart from '../assets/cart.png';
import logo from '../assets/logo.webp';
import {getBasket} from "../api/drinkApi";


const Header = observer(() => {
    const {user} = useContext(Context)
    const {drink} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
    }
    useEffect(() => {
        getBasket().then(data => drink.setBaskets(data.rows))
    }, [])


    return (
        <Navbar bg="white" variant="dark" className='shadow mb-5'>
            <Container>
                <NavLink style={{color: 'black'}} onClick={() => navigate(SHOP_ROUTE)}><Image src={logo}/></NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {user.isAdmin &&
                        <Button className='d-flex flex-column align-items-center' variant={'outline-dark'}
                                onClick={() => navigate(ADMIN_ROUTE)}>
                            <Image width={25} height={25} src={admin}/>
                            Админ панель
                        </Button>
                        }


                        <Button variant={'outline-dark'} className="d-flex flex-column align-items-center ms-2"
                                onClick={() => navigate(BASKET_ROUTE)}>
                            <div className='d-inline-flex'>
                                <Image width={25} height={25} src={cart}/>
                                {
                                    drink.basket.length !=0 && <div>o</div>
                                }
                            </div>
                            Корзина
                        </Button>

                        <Button className='d-flex flex-column align-items-center ms-2' variant={'outline-dark'}
                                onClick={() => logOut()}>
                            <Image width={25} height={25} src={logout}/>
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button className='d-flex flex-column align-items-center' variant={'outline-dark'}
                                onClick={() => navigate(LOGIN_ROUTE)}>
                            <Image width={25} height={25} src={enter}/>
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default Header;