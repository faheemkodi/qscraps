//do the parent-child relationship between make and model on the frontend via the backend
//the frontend is grabbing data from the form and generating a url with the required req.query
//somehow, the listings are not being dispatched wrt the passed in data, error is possibly in
//homescreen useEffect or listListings listingActions

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import { listMakes } from '../actions/makeActions';
import { listModels } from '../actions/modelActions';
import { listYears } from '../actions/yearActions';
import { listCategories } from '../actions/categoryActions';

const SearchFilters = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');

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
    dispatch(listModels());
    dispatch(listYears());
    dispatch(listCategories());
  }, [dispatch]);

  //this submitHandler gets data from the form and sends it as URL params
  const submitHandler = (e) => {
    e.preventDefault();
    if (make && model && year && category) {
      history.push(`/search/${make}/${model}/${year}/${category}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Group controlId="makeSelect">
        <Form.Label>Make</Form.Label>
        <Form.Control
          as="select"
          value={make}
          onChange={(e) => setMake(e.target.value)}
        >
          {makes.map((make, _id) => {
            return (
              <option key={_id} value={make.name}>
                {make.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="modelSelect">
        <Form.Label>Model</Form.Label>
        <Form.Control
          as="select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {models.map((model, _id) => {
            return (
              <option key={_id} value={model.name}>
                {model.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="yearSelect">
        <Form.Label>Year</Form.Label>
        <Form.Control
          as="select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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

      <Form.Group controlId="categorySelect">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      <Button type="submit" variant="outline-primary" className="search-button">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchFilters;
