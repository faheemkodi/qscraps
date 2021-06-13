import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Button, Table, Row, Col, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
  listMyListings,
  deleteListing,
  createListing,
} from '../actions/listingActions';
import { LISTING_CREATE_RESET } from '../constants/listingConstants';

const DashboardScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const listingList = useSelector((state) => state.listingList);
  const { loading, error, listings } = listingList;

  const listingDelete = useSelector((state) => state.listingDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = listingDelete;

  const listingCreate = useSelector((state) => state.listingCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    listing: createdListing,
  } = listingCreate;

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;

  useEffect(() => {
    dispatch({ type: LISTING_CREATE_RESET });
    if (!vendorInfo) {
      history.push('/login');
    } else {
      dispatch(listMyListings());
    }
    if (successCreate) {
      history.push(`/admin/listing/${createdListing._id}/edit`);
    } else {
      dispatch(listMyListings());
    }
  }, [
    dispatch,
    history,
    vendorInfo,
    successDelete,
    successCreate,
    createdListing,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteListing(id));
    }
  };

  const createListingHandler = () => {
    dispatch(createListing());
  };

  return (
    <>
      <Meta title="Q-Scraps | Vendor Dashboard" />
      <Link className="btn btn-light btn-sm my-5 text-uppercase" to="/">
        Go Back
      </Link>
      <Row className="align-items-center">
        <Col>
          <h1 className="text-light">Dashboard</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3 text-light btn-sm"
            variant="secondary"
            onClick={createListingHandler}
          >
            <FaPlus /> Create Listing
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm bg-light">
          <thead>
            <tr>
              <th>COVER</th>
              <th>TITLE</th>
              <th>DESCRIPTION</th>
              <th>MAKE</th>
              <th>MODEL</th>
              <th>YEAR</th>
              <th>CATEGORY</th>
              <th>MODIFY</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id}>
                <td>
                  <Image
                    fluid
                    thumbnail
                    height="100"
                    width="100"
                    src={listing.coverImage}
                  />
                </td>
                <td>{listing.title}</td>
                <td>{listing.description}</td>
                <td>{listing.make}</td>
                <td>{listing.model}</td>
                <td>
                  {listing.year?.map((yr, index) => (
                    <p key={index}>{yr}</p>
                  ))}
                </td>
                <td>
                  {listing.category?.map((cat, index) => (
                    <p key={index}>{cat}</p>
                  ))}
                </td>
                <td>
                  <LinkContainer to={`/admin/listing/${listing._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(listing._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DashboardScreen;
