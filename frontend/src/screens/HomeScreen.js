import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Listing from '../components/Listing';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

import { listListings } from '../actions/listingActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const make = match.params.make;
  const model = match.params.model;
  const year = match.params.year;
  const category = match.params.category;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const listingList = useSelector((state) => state.listingList);
  const { loading, error, listings, page, pages } = listingList;

  useEffect(() => {
    dispatch(listListings(keyword, make, model, year, category, pageNumber));
  }, [dispatch, keyword, make, model, year, category, pageNumber]);

  return (
    <>
      <Meta />
      <h1 className="text-center text-uppercase text-white">Latest Listings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {listings.map((listing) => (
              <Col key={listing._id} md={6}>
                <Listing listing={listing} />
              </Col>
            ))}
          </Row>
          <div className="pagenums">
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
              make={make ? make : ''}
              model={model ? model : ''}
              year={year ? year : ''}
              category={category ? category : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
