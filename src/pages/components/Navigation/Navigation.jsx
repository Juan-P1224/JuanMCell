import React, { useState } from 'react';
import './Navigation.css';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Aquí puedes realizar cualquier lógica adicional antes de cerrar sesión
    localStorage.removeItem('account'); // Eliminar el estado de inicio de sesión al cerrar sesión
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  const isLoggedIn = localStorage.getItem('account'); // Verificar si el usuario ha iniciado sesión

  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
    navigate('/login');
    return null;
  }

  return (
    <div>
      <Navbar className='navbar'>
        <NavbarBrand href='/home'>
          <img src={process.env.PUBLIC_URL + '/favicon.ico'} width='50' height='50' alt='Logo' />
          <span className={location.pathname === '/home' ? 'nav-link active' : 'nav-link inicio'}>Inicio</span>
        </NavbarBrand>
        <Nav className='mr-auto'>
          <NavItem>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret color=''>
                Cuenta
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link to='/login' onClick={handleLogout}>
                    Cerrar sesión
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </Navbar>
      <div className='container'>{props.children}</div>
    </div>
  );
};

export default Navigation;