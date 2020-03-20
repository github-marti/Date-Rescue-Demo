import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import "./style.css";

const NavTop = function(props) {
  return (
    <div className="dates">
      <Navbar color="secondary alert" light expand="sm">
        <Nav className="mr-auto" navbar>
          <NavItem className="ml-auto">
            <a href="/" 
            className="logo">
              <img
                src={require("./redblock2.png")}
                height="75"
                width=""
                alt="logo"
              />
            </a>
          </NavItem>
          <NavItem>
            <NavLink name="events" onClick={props.handleClick} className="link">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              name="locations"
              onClick={props.handleClick}
              className="link"
            >
              Recommendations
            </NavLink>
          </NavItem>
          <NavItem className="signOut">
            <NavLink onClick={props.handleLogout} className="link">
              Log Out
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavTop;
