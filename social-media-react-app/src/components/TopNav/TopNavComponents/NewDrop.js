import React, { useState, useEffect, useRef } from 'react'
import {DropdownWrapper, Ul, FWButton, FlexBetween} from '../TopNav.styles';
const NewDrop = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, []);
    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }
    const DropItem = (props) => {
        return (
            <>
                <li>
                    <FWButton onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                            {props.text}
                    </FWButton>
                </li>
            </>
        );
    }
    return (
        <DropdownWrapper>
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <Ul>
                <DropItem text="asd" />
                <DropItem text="das" />
                <DropItem text="das" />
                <DropItem text="ads" />
            </Ul>
        </div>
        </DropdownWrapper>
    );

}
export default NewDrop