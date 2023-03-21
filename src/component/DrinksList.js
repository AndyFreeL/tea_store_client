import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DrinkItem from "./DrinkItem";
import {observer} from "mobx-react-lite";

const DrinksList = observer(() => {
    const {drink} = useContext(Context)

    return (
        <Row>
            {drink.drinks.map(drink =>
            <DrinkItem key={drink.id} drink={drink}/>
            )}
        </Row>
    );
});

export default DrinksList;