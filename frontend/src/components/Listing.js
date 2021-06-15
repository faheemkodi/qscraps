import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Image, Row, Col } from 'react-bootstrap';

const Listing = ({ listing }) => {
  return (
    <Card className="my-2 my-sm-3 listing">
      <Card.Header className="text-center font-weight-bold lead small text-uppercase text-primary">
        {listing.title}
      </Card.Header>
      <Card.Body>
        <LinkContainer to={`/listing/${listing._id}`}>
          <Row>
            <Col xs={2} className="d-flex flex-row justify-content-center">
              <Image fluid src={listing.coverImage} alt="listing cover image" />
            </Col>
            <Col xs={10} className="text-center text-muted text-uppercase">
              <Row xs={1}>
                <Col xs={4} className="d-flex flex-row justify-content-center">
                  <p className="small text-center font-weight-bold">
                    {listing.make}
                  </p>
                </Col>
                <Col xs={4} className="d-flex flex-row justify-content-center">
                  <p className="small text-center font-weight-bold">
                    {listing.model}
                  </p>
                </Col>
                <Col xs={4} className="d-flex flex-row justify-content-center">
                  <p className="small text-center font-weight-bold">
                    {listing.year.join(', ')}
                  </p>
                </Col>
              </Row>
              <Row xs={1}>
                <Col xs={12} className="d-flex flex-row justify-content-center">
                  <p className="small text-center font-weight-bold">
                    {listing.category.join(', ')}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default Listing;
