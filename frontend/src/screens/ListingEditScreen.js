import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import FormContainer from '../components/FormContainer';
import { listListingDetails, updateListing } from '../actions/listingActions';
import {
  LISTING_DETAILS_RESET,
  LISTING_UPDATE_RESET,
} from '../constants/listingConstants';

import { listMakes, listMakeModels } from '../actions/makeActions';
import { listYears } from '../actions/yearActions';
import { listCategories } from '../actions/categoryActions';

const ListingEditScreen = ({ match, history }) => {
  const listingId = match.params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState([]);
  const [category, setCategory] = useState([]);
  const [coverImage, setCoverImage] = useState('');
  const [images, setImages] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [primaryContactNo, setPrimaryContactNo] = useState('');
  const [alternateContactNo, setAlternateContactNo] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const listingDetails = useSelector((state) => state.listingDetails);
  const { loading, error, listing } = listingDetails;

  //copy
  const makeList = useSelector((state) => state.makeList);
  const { makes } = makeList;

  const modelList = useSelector((state) => state.modelList);
  const { models } = modelList;

  const yearList = useSelector((state) => state.yearList);
  const { years } = yearList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listMakes());
    dispatch(listYears());
    dispatch(listCategories());
  }, [dispatch, make]);

  const makeChangeHandler = (e) => {
    e.preventDefault();
    setMake(e.target.value);
    dispatch(listMakeModels(e.target.value));
  };
  //end

  const listingUpdate = useSelector((state) => state.listingUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = listingUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LISTING_UPDATE_RESET });
      dispatch({ type: LISTING_DETAILS_RESET });
      history.push('/dashboard');
    } else {
      if (!listing.title || listing._id !== listingId) {
        dispatch(listListingDetails(listingId));
      } else {
        setTitle(listing.title);
        setDescription(listing.description);
        setMake(listing.make);
        setModel(listing.model);
        setYear(listing.year);
        setCategory(listing.category);
        setCoverImage(listing.coverImage);
        setImages(listing.images);
        setVendorName(listing.vendorName);
        setPrimaryContactNo(listing.primaryContactNo);
        setAlternateContactNo(listing.alternateContactNo);
      }
    }
  }, [dispatch, history, listingId, listing, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('coverImage', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload/covers', formData, config);

      setCoverImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadFilesHandler = async (e) => {
    const files = e.target.files;
    const formsData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formsData.append('images', files[i]);
      formsData.getAll('images');
    }

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(
        '/api/upload/images',
        formsData,
        config
      );

      setImages(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateListing({
        _id: listingId,
        title,
        description,
        make,
        model,
        year,
        category,
        coverImage,
        images,
        vendorName,
        primaryContactNo,
        alternateContactNo,
      })
    );
  };

  return (
    <>
      <Meta title="Q-Scraps | Edit Listing" />
      <Link
        to="/dashboard"
        className="btn btn-light btn-sm text-uppercase my-3"
      >
        Go Back
      </Link>
      <FormContainer>
        <h1 className="text-light">Listing Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter a listing title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe listing details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="make">
              <Form.Label>Make</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter vehicle make"
                value={make}
                onChange={makeChangeHandler}
              >
                <option key="blankValue" hidden value>
                  --Select Make--
                </option>
                {makes.map((make, _id) => {
                  return (
                    <option key={_id} value={make.name}>
                      {make.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="model">
              <Form.Label>Model</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter vehicle model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option key="blankValue" hidden value>
                  --Select Model--
                </option>
                {models.map((model, _id) => {
                  return (
                    <option key={_id} value={model.name}>
                      {model.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="year">
              <Form.Label>Years</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter compatible years"
                value={year}
                onChange={(e) =>
                  setYear(
                    [].slice
                      .call(e.target.selectedOptions)
                      .map((item) => item.value)
                  )
                }
                multiple
              >
                {years.map((year, _id) => {
                  return (
                    <option key={_id} value={year.makeYear}>
                      {year.makeYear}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter scrap categories"
                value={category}
                onChange={(e) =>
                  setCategory(
                    [].slice
                      .call(e.target.selectedOptions)
                      .map((item) => item.value)
                  )
                }
                multiple
              >
                {categories.map((category, _id) => {
                  return (
                    <option key={_id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="coverImage">
              <Form.Label>Cover Image</Form.Label>
              {coverImage ? (
                <div>
                  <Image
                    fluid
                    thumbnail
                    height="50"
                    width="50"
                    src={coverImage}
                  />
                </div>
              ) : (
                console.log('No cover')
              )}
              <Form.Control
                type="text"
                disabled
                placeholder="Cover image URL"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="coverImage-file"
                label="Choose cover image"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Listing Images</Form.Label>
              <div className="d-flex flex-row">
                {images?.map((img, _id) => {
                  return (
                    <Image fluid thumbnail height="50" width="50" src={img} />
                  );
                })}
              </div>
              <Form.Control
                multiple
                disabled
                type="text"
                placeholder="Listing image URLs"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
              <Form.File
                multiple
                id="images-files"
                label="Choose multiple images"
                custom
                onChange={uploadFilesHandler}
              ></Form.File>

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="vendorName">
              <Form.Label>Vendor Name</Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder="Enter vendor name"
                value={listing.vendorName?.vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="primaryContactNo">
              <Form.Label>Primary Contact Number</Form.Label>
              <Form.Control
                type="tel"
                disabled
                placeholder="Enter vendor's primary contact number"
                value={primaryContactNo}
                onChange={(e) => setPrimaryContactNo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="alternateContactNo">
              <Form.Label>Alternate Contact Number</Form.Label>
              <Form.Control
                type="tel"
                disabled
                placeholder="Enter vendor's alternate contact number"
                value={alternateContactNo}
                onChange={(e) => setAlternateContactNo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="secondary"
              className="text-uppercase text-light font-weight-bold"
              block
            >
              Update Listing
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ListingEditScreen;
