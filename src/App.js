import React, {useContext, useEffect, useState} from 'react';
import Header from "./component/Header";
import AppRouter from "./component/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {check} from "./api/userApi";
import {Container, Spinner} from "react-bootstrap";
import {Context} from "./index";
import Loader from "./component/Loader";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Loader/>

    }

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
