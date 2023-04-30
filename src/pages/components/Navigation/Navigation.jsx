import React from 'react';
import './Navigation.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <div>
      <Navbar color='dark'>
        <NavbarBrand href='/'>Inicio</NavbarBrand>
        <Nav className="mr-auto">
          <NavItem>
            <NavLink>
              <Link className="nav-link" to='/display'>Display</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link className="nav-link" to='/articulo'>Articulo</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div className='container'>
        {props.children}
      </div>
    </div>
  );
}

export default Navigation;
