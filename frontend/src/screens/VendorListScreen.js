import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginateVendorList from '../components/PaginateVendorList';
import Meta from '../components/Meta';
import { listVendors, deleteVendor } from '../actions/vendorActions';

const VendorListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber;

  const dispatch = useDispatch();

  const vendorList = useSelector((state) => state.vendorList);
  const { loading, error, vendors, pages, page } = vendorList;

  const vendorLogin = useSelector((state) => state.vendorLogin);
  const { vendorInfo } = vendorLogin;

  const vendorDelete = useSelector((state) => state.vendorDelete);
  const { success: successDelete } = vendorDelete;

  useEffect(() => {
    if (vendorInfo && vendorInfo.isAdmin) {
      dispatch(listVendors(pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, vendorInfo, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteVendor(id));
    }
  };

  return (
    <>
      <Meta title="Q-Scraps | Vendors Directory" />
      <Link className="btn btn-light btn-sm my-5 text-uppercase" to="/">
        Go Back
      </Link>
      <h1 className="text-light">Vendors Directory</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm bg-light"
          >
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CONTACT #1</th>
                <th>CONTACT #2</th>
                <th>CR NO.</th>
                <th>ADDRESS</th>
                <th>ADMIN</th>
                <th>MODIFY</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
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
          <div className="pagenums">
            <PaginateVendorList pages={pages} page={page} />
          </div>
        </>
      )}
    </>
  );
};

export default VendorListScreen;
