import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light">
      <Container>
        <Row className="py-3">
          <Col className="text-center py-3 text-primary">
            &copy; Copyright 2021 QScraps. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
