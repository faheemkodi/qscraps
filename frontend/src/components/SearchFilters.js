import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';

import { listMakes, listMakeModels } from '../actions/makeActions';
import { listYears } from '../actions/yearActions';
import { listCategories } from '../actions/categoryActions';

const SearchFilters = ({ history }) => {
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
    dispatch(listYears());
    dispatch(listCategories());
  }, [dispatch, make]);

  const makeChangeHandler = (e) => {
    e.preventDefault();
    setMake(e.target.value);
    dispatch(listMakeModels(e.target.value));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (make && model && year && category) {
      history.push(`/search/filters/${make}/${model}/${year}/${category}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-filters ml-md-5 my-2">
      <Form.Control
        as="select"
        value={make}
        size="md"
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

      <Form.Control
        as="select"
        size="md"
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

      <Form.Control
        as="select"
        size="md"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option key="blankValue" hidden value>
          --Select Year--
        </option>
        {years.map((year, _id) => {
          return (
            <option key={_id} value={year.makeYear}>
              {year.makeYear}
            </option>
          );
        })}
      </Form.Control>

      <Form.Control
        as="select"
        size="md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option key="blankValue" hidden value>
          --Select Category--
        </option>
        {categories.map((category, _id) => {
          return (
            <option key={_id} value={category.name}>
              {category.name}
            </option>
          );
        })}
      </Form.Control>

      <Button
        type="submit"
        variant="outline-primary"
        size="md"
        className="search-button"
      >
        <FaCar />
      </Button>
    </Form>
  );
};

export default SearchFilters;
