import { TopNavWrapper } from "./TopNav3.styles";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function TopNav3() {
  return (
    <TopNavWrapper>
      <body>
        <code>
          {/* Top Nav Icons */}
          <Navbar>
            <NavItem icon={<PlusIcon />} />
            <NavItem icon={<BellIcon />} />
            <NavItem icon={<MessengerIcon />} />

            <NavItem icon={<CaretIcon />}>
              <DropdownMenu></DropdownMenu>
            </NavItem>
          </Navbar>
        </code>
      </body>
    </TopNavWrapper>
  );
}

function Navbar(props) {
  return (
    <TopNavWrapper>
      <body>
        <code>
          <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
          </nav>
        </code>
      </body>
    </TopNavWrapper>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <TopNavWrapper>
      <body>
        <code>
          <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
              {props.icon}
            </a>

            {open && props.children}
          </li>
        </code>
      </body>
    </TopNavWrapper>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <TopNavWrapper>
        <body>
          <code>
            <a
              href="#"
              className="menu-item"
              onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
            >
              <span className="icon-button">{props.leftIcon}</span>
              {props.children}
              <span className="icon-right">{props.rightIcon}</span>
            </a>
          </code>
        </body>
      </TopNavWrapper>
    );
  }

  return (
    <TopNavWrapper>
      <body>
        <code>
          <div
            className="dropdown"
            style={{ height: menuHeight }}
            ref={dropdownRef}
          >
            <CSSTransition
              in={activeMenu === "main"}
              timeout={500}
              classNames="menu-primary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="menu">
                <DropdownItem>My Profile</DropdownItem>
                <DropdownItem
                  leftIcon={<CogIcon />}
                  rightIcon={<ChevronIcon />}
                  goToMenu="settings"
                >
                  Settings
                </DropdownItem>
              </div>
            </CSSTransition>

            <CSSTransition
              in={activeMenu === "settings"}
              timeout={500}
              classNames="menu-secondary"
              unmountOnExit
              onEnter={calcHeight}
            >
              <div className="menu">
                <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                  <h2>Quick Settings</h2>
                </DropdownItem>
                <DropdownItem leftIcon={<BoltIcon />}>Account</DropdownItem>
                <DropdownItem leftIcon={<BoltIcon />}>Application</DropdownItem>
                <DropdownItem leftIcon={<BoltIcon />}>Billing</DropdownItem>
                <DropdownItem leftIcon={<BoltIcon />}>Support</DropdownItem>
                <DropdownItem leftIcon={<BoltIcon />}>Settings</DropdownItem>
              </div>
            </CSSTransition>
          </div>
        </code>
      </body>
    </TopNavWrapper>
  );
}

export default TopNav3;
