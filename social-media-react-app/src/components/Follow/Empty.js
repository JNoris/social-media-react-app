import React, {useState, useEffect} from 'react'
import {EmptyWrapper} from './Follow.styles';
const Empty = (props) => {
    const [show, setShow] = useState(false);
    useEffect(()=> {
        let timer = setTimeout(()=> setShow(true), 500);
        return () => {
            clearTimeout(timer);
        }
    },[])
    return show? ( 
        <EmptyWrapper>
            <h1>{props.text}</h1>
        </EmptyWrapper>):(
        null
    );
}
export default Empty