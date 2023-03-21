import React from 'react';
import {Container, Spinner,Row, Col} from "react-bootstrap";

const Loader = () => {
    return (
        <Container className='d-flex justify-content-center' style={{marginTop:'400px'}}>
                    <Spinner animation='border' variant='success'/>
        </Container>
    );
};

export default Loader;