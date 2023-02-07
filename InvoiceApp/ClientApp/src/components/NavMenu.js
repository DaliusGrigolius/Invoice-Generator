import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-5 navbar-dark bg-dark pt-4 pb-4" container light>
                <NavbarBrand tag={Link} to="/">Invoicer 5000</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav nav-circle nav-fill">
                        <NavItem className="m-2">
                            <NavLink tag={Link} className="customHover bg-warning fw-bold rounded-pill" to="/provider-client">Add Service Provider / Client</NavLink>
                        </NavItem>
                        <NavItem className="m-2">
                            <NavLink tag={Link} className="customHover bg-warning fw-bold rounded-pill" to="/goods-services">Add Product / Service</NavLink>
                        </NavItem>
                        <NavItem className="m-2">
                            <NavLink tag={Link} className="customHover bg-warning fw-bold rounded-pill" to="/fetch-data">Invoice Generator</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;