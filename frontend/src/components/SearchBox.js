import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
        size="sm"
        name="q"
        value={keyword}
        placeholder="Search for vehicles or spare parts"
      ></Form.Control>
      <Button
        size="sm"
        type="submit"
        variant="outline-primary"
        className="search-button"
      >
        <FaSearch />
      </Button>
    </Form>
  );
};

export default withRouter(SearchBox);
