import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
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

  const [msg, setMsg] = useState('Advanced Search');

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
      setMsg('Make, Model, Year & Category Required');
      history.push('/');
    }
  };

  return (
    <>
      <Col xs={12}>
        <h4 className="small text-uppercase text-muted text-center pt-2 font-weight-bold">
          {msg}
        </h4>
      </Col>

      <Form onSubmit={submitHandler} className="search-filters ml-md-5">
        <Form.Control
          as="select"
          value={make}
          size="sm"
          onChange={makeChangeHandler}
        >
          <option key="blankValue" hidden value>
            --Make--
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
          size="sm"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option key="blankValue" hidden value>
            --Model--
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
          size="sm"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option key="blankValue" hidden value>
            --Year--
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
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option key="blankValue" hidden value>
            --Category--
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
          size="sm"
          className="search-button"
        >
          <FaCar />
        </Button>
      </Form>
    </>
  );
};

export default withRouter(SearchFilters);
