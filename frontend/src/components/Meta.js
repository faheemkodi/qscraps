import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To Q-Scraps',
  description:
    'An exclusive directory for automobiles spares and scraps, from verified and authentic garages across Qatar',
};

export default Meta;
