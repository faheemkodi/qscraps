import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="qscraps-footer">
      <Container>
        <Row className="py-3">
          <Col className="text-center py-3 text-primary font-weight-bold">
            &copy; Copyright 2021 QScraps. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
