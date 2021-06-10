import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listVendors, deleteVendor } from '../actions/vendorActions';

const VendorListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors } = vendorList;

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;

  const vendorDelete = useSelector((state) => state.vendorDelete);
  const { success: successDelete } = vendorDelete;

  useEffect(() => {
    if (vendorInfo && vendorInfo.isAdmin) {
      dispatch(listVendors());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, vendorInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteVendor(id));
    }
  };

  return (
    <>
      <h1>Vendor List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PRI CONTACT</th>
              <th>ALT CONTACT</th>
              <th>CR NO.</th>
              <th>ADDRESS</th>
              <th>ADMIN</th>
              <th>MODIFY</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor._id}</td>
                <td>{vendor.vendorName}</td>
                <td>
                  <a href={`mailto:${vendor.email}`}>{vendor.email}</a>
                </td>
                <td>{vendor.primaryContactNo}</td>
                <td>{vendor.alternateContactNo}</td>
                <td>{vendor.companyRegistration}</td>
                <td>{vendor.address}</td>
                <td>
                  {vendor.isAdmin ? (
                    <FaCheck color="green" />
                  ) : (
                    <FaTimes color="red" />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/vendor/${vendor._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(vendor._id)}
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

export default VendorListScreen;
