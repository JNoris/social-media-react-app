import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../icons/chevron.svg';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { DropdownWrapper } from '../TopNav.styles';

const DropdownMenu = () => {
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
    function DropdownItem(props) {
        return (
            <li>
                <Button onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div>{props.leftIcon}</div>
                        <div>{props.text}</div>
                    </div>
                </Button>
            </li>
        );
    }
    return (
        <DropdownWrapper>
            <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={500}
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        <ul>
                            <DropdownItem
                                text="My Profile"
                            ></DropdownItem>
                            <DropdownItem
                                leftIcon={<CogIcon />}
                                rightIcon={<ChevronIcon />}
                                goToMenu="settings"
                                text="Settings">
                            </DropdownItem>
                        </ul>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={activeMenu === 'settings'}
                    timeout={0}
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        <DropdownItem goToMenu="main" leftIcon={<ArrowLeftIcon />}
                            text="Quick Settings"/>                
                        <DropdownItem leftIcon={<OfflineBoltIcon />} text="asd"/>
                        <DropdownItem leftIcon={<OfflineBoltIcon />} text="asd"/>
                        <DropdownItem leftIcon={<OfflineBoltIcon />} text="asd"/>
                        <DropdownItem leftIcon={<OfflineBoltIcon />} text="asd"/>
                    </div>
                </CSSTransition>
            </div>
        </DropdownWrapper>
    );
}
export default DropdownMenu