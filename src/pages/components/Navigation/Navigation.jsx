import React from 'react';
import './Navigation.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation} from 'react-router-dom';

const Navigation = (props) => {
  const location = useLocation();
  return (
    <div>
      <Navbar color='dark'>
        <NavbarBrand href='/home'>

          <img src={process.env.PUBLIC_URL + '/favicon.ico'} width="50" height="50" alt="Logo" />
          <span className={location.pathname === '/home' ? 'nav-link active' : 'nav-link inicio'}>Inicio</span>
        </NavbarBrand>
        <Nav className="mr-auto">
          <NavItem>
          <NavLink tag={Link} to='/display' className={location.pathname === '/display' ? 'active' : ''}>
            Display
          </NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={Link} to='/articulo' className={location.pathname === '/articulo' ? 'active' : ''}>
            Articulo
          </NavLink>
          </NavItem>
          <NavItem>
          <NavLink tag={Link} to='/contabilidad' className={location.pathname === '/contabilidad' ? 'active' : ''}>
            Contabilidad
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
