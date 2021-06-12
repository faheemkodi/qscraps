//Search keywords in description, make, model, category as well

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-box ml-md-5 mt-2">
      <Form.Control
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        size="md"
        name="q"
        placeholder="Search for vehicles or spare parts"
      ></Form.Control>
      <Button type="submit" variant="outline-primary" className="search-button">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBox;
