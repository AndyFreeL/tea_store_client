import React, {useContext} from 'react';
import {Accordion, Card, Col} from 'react-bootstrap';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const TypeBar = observer(() => {
    const {drink} = useContext(Context)

    return (
        <div>
            <Accordion>{drink.types.map(type =>
                <Accordion.Item key={type.id} eventKey={type.id}>
                    <Accordion.Header
                        onClick={() => {
                            drink.setSelectedType(type)
                            drink.setPage(1)
                            drink.setSelectedSubtype({})
                        }}
                    >{type.name}</Accordion.Header>
                    <Accordion.Body>
                        <Col>
                            {drink.subtypes.map(subtype => (subtype.type_id === type.id) &&
                                <Card style={{cursor: 'pointer', color: 'green'}}
                                      className='p-1 fs-5'
                                      onClick={() => drink.setSelectedSubtype(subtype)}
                                      key={subtype.id}
                                      border={subtype.id === drink.selectedSubtype.id ? 'warning' : 'light'}
                                >{subtype.name}</Card>)}
                        </Col>
                    </Accordion.Body>
                </Accordion.Item>
            )}</Accordion>
        </div>
    )
});

export default TypeBar;