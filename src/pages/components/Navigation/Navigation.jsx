import React from 'react';
import './Navigation.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <div>
      <Navbar color='dark'>
        <NavbarBrand href='/home'>

          <img src={process.env.PUBLIC_URL + '/favicon.ico'} width="50" height="50" alt="Logo" />
          <span className="nav-link">Inicio</span>
        </NavbarBrand>
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
          <NavItem>
            <NavLink>
              <Link className="nav-link" to='/contabilidad'>Contabilidad</Link>
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
