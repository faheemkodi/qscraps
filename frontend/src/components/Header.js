import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
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
    <header className="header">
      <Navbar
        sticky="top"
        bg="light"
        variant="light"
        expand="md"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src="/qscraps.svg" height="80px" width="200px" alt="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Col>
              <Row>
                <SearchBox />
              </Row>

              <Row>
                <SearchFilters />
              </Row>
            </Col>

            <Nav className="ml-auto text-uppercase font-weight-bold">
              {vendorInfo ? (
                <NavDropdown title={vendorInfo.vendorName} id="vendorname">
                  <LinkContainer to="/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <Button className="search-button" variant="light">
                      <FaUser className="text-primary" />
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              )}
              {vendorInfo && vendorInfo.isAdmin && (
                <NavDropdown title="Superuser" id="adminmenu">
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
