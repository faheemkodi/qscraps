import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBox = () => {
  const history = useHistory();

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
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        size="md"
        name="q"
        placeholder="Search for your vehicle"
      ></Form.Control>
      <Button type="submit" variant="outline-primary" className="search-button">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default SearchBox;
