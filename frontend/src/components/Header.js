import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { logout } from '../actions/vendorActions';

import SearchBox from './SearchBox';
import SearchFilters from './SearchFilters';

const Header = () => {
  const dispatch = useDispatch();

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        fixed="top"
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="/qscraps.svg" height="40px" width="100px" alt="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Route
              render={({ history }) => <SearchFilters history={history} />}
            />
            <Nav className="ml-auto text-uppercase font-weight-bold">
              {vendorInfo ? (
                <NavDropdown title={vendorInfo.vendorName} id="vendorname">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Button variant="outline-primary">
                    <FaUser />
                  </Button>
                </LinkContainer>
              )}
              {vendorInfo && vendorInfo.isAdmin && (
                <NavDropdown title="Admin Menu" id="adminmenu">
                  <LinkContainer to="/admin/vendorlist">
                    <NavDropdown.Item>Vendors Directory</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/listinglist">
                    <NavDropdown.Item>Listings Directory</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
