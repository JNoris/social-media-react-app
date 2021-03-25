import React, { Component } from "react";
import { TopNavItems } from "./TopNavItems";
import "./TopNav.css";

// Utilizing state
class TopNav extends Component {
  state = { clicked: false };

  handleClick = () => {
    // Toggle x and 3 line button
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="TopNavItems">
        <h1 className="navbar-logo">
          <i className="fab fa-react"></i> FakeGram
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          {/* Ternary operator dictates state of menu bar: fa-times = 3 lines. 
          Probably going to remove this later, taking too much time */}
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <div className="container">
          <div className="content">
            <div className="input-group">
              <input
                type="text"
                className="form-control search-form"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="button"
                  className="pull-right btn btn-default search-btn"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* nav menu */}
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {TopNavItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default TopNav;
