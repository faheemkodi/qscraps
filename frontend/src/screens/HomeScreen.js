import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Listing from '../components/Listing';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { listListings } from '../actions/listingActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const make = match.params.make;
  const model = match.params.model;
  const year = match.params.year;
  const category = match.params.category;

  const dispatch = useDispatch();

  const listingList = useSelector((state) => state.listingList);
  const { loading, error, listings } = listingList;

  useEffect(() => {
    dispatch(listListings(keyword, make, model, year, category));
  }, [dispatch, keyword, make, model, year, category]);

  return (
    <>
      <h1 className="text-center text-uppercase text-white">Latest Listings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {listings.map((listing) => (
            <Col key={listing._id} sm={12}>
              <Listing listing={listing} />
            </Col>
          ))}
        </Row>
        // <Table striped bordered hover responsive variant="dark">
        //   <thead>
        //     <tr>
        //       <th>COVER</th>
        //       <th>TITLE</th>
        //       <th>MAKE</th>
        //       <th>MODEL</th>
        //       <th>YEAR</th>
        //       <th>CATEGORY</th>

        //       <th>VENDOR</th>
        //       <th>CONTACT 1</th>
        //       <th>CONTACT 2</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {listings.map((listing) => (
        //       <LinkContainer to={`/listing/${listing._id}`}>
        //         <tr key={listing._id} className="home-table-row">
        //           <td>
        //             <Image
        //               width="200"
        //               height="200"
        //               fluid
        //               src={listing.coverImage}
        //               alt="listing pic"
        //             />
        //           </td>
        //           <td>{listing.title}</td>
        //           <td>{listing.make}</td>
        //           <td>{listing.model}</td>
        //           <td>{listing.year.join(', ')}</td>
        //           <td>{listing.category.join(', ')}</td>

        //           <td>{listing.vendorName.vendorName}</td>
        //           <td>{listing.primaryContactNo}</td>
        //           <td>{listing.alternateContactNo}</td>
        //         </tr>
        //       </LinkContainer>
        //     ))}
        //   </tbody>
        // </Table>
      )}
    </>
  );
};

export default HomeScreen;
