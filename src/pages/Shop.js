import React, {useContext, useEffect} from 'react';
import TypeBar from "../component/TypeBar";
import {Col, Container, Row} from "react-bootstrap";
import {Context} from "../index";
import {fetchDrinks, fetchSubtypes, fetchTypes} from "../api/drinkApi";
import DrinksList from "../component/DrinksList";
import {observer} from "mobx-react-lite";
import Pages from "../component/Pages";

const Shop = observer(() => {
    const {drink} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => drink.setTypes(data))
        fetchSubtypes().then(data => drink.setSubtypes(data))
        fetchDrinks(null, null, 1, drink.limit).then(data => {
            drink.setDrinks(data.rows)
            drink.setTotalCount(data.count.count)
            console.log(data.count.count)
        })
    }, [])

    useEffect(() => {
        fetchDrinks(drink.selectedType.id,
            drink.selectedSubtype.id,
            drink.page, drink.limit).then(data => {
            drink.setDrinks(data.rows)
            drink.setTotalCount(data.count)
        })
    }, [drink.selectedType, drink.selectedSubtype, drink.page])

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <DrinksList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;