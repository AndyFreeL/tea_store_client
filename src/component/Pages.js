import React, {useContext} from 'react';
import {Context} from "../index";
import {Pagination} from 'react-bootstrap';
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {drink} = useContext(Context)
    console.log(drink)
    const pageCount = Math.ceil(drink.totalCount / drink.limit)
    const pages = []

    for(let i=0; i<pageCount;i++){
        pages.push(i+1)
    }

    return (
        <Pagination className='mt-3'>
            {pages.map(page =>
                <Pagination.Item key={page}
                                 active={drink.page === page}
                                 onClick={()=>drink.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;