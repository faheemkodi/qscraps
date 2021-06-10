import axios from 'axios';
import {
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_RESET,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_REQUEST,
  VENDOR_LIST_SUCCESS,
  VENDOR_LIST_RESET,
  VENDOR_LOGIN_FAIL,
  VENDOR_LOGIN_REQUEST,
  VENDOR_LOGIN_SUCCESS,
  VENDOR_LOGOUT,
  VENDOR_REGISTER_FAIL,
  VENDOR_REGISTER_REQUEST,
  VENDOR_REGISTER_SUCCESS,
  VENDOR_UPDATE_PROFILE_FAIL,
  VENDOR_UPDATE_PROFILE_REQUEST,
  VENDOR_UPDATE_PROFILE_SUCCESS,
  VENDOR_DELETE_REQUEST,
  VENDOR_DELETE_SUCCESS,
  VENDOR_DELETE_FAIL,
  VENDOR_UPDATE_REQUEST,
  VENDOR_UPDATE_SUCCESS,
  VENDOR_UPDATE_FAIL,
} from '../constants/vendorConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: VENDOR_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/vendors/login',
      { email, password },
      config
    );

    dispatch({
      type: VENDOR_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('vendorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: VENDOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('vendorInfo');
  dispatch({ type: VENDOR_LOGOUT });
  dispatch({ type: VENDOR_DETAILS_RESET });
  dispatch({ type: VENDOR_LIST_RESET });
};

export const register =
  (
    vendorName,
    email,
    password,
    primaryContactNo,
    alternateContactNo,
    companyRegistration,
    address
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: VENDOR_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/vendors/',
        {
          vendorName,
          email,
          password,
          primaryContactNo,
          alternateContactNo,
          companyRegistration,
          address,
        },
        config
      );

      dispatch({
        type: VENDOR_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: VENDOR_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('vendorInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: VENDOR_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getVendorDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DETAILS_REQUEST,
    });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/vendors/${id}`, config);

    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateVendorProfile = (vendor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_UPDATE_PROFILE_REQUEST,
    });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/vendors/profile', vendor, config);

    dispatch({
      type: VENDOR_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: VENDOR_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('vendorInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: VENDOR_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listVendors = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_LIST_REQUEST,
    });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/vendors', config);

    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteVendor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_DELETE_REQUEST,
    });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    await axios.delete(`/api/vendors/${id}`, config);

    dispatch({ type: VENDOR_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: VENDOR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateVendor = (vendor) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VENDOR_UPDATE_REQUEST,
    });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/vendors/${vendor._id}`,
      vendor,
      config
    );

    dispatch({ type: VENDOR_UPDATE_SUCCESS });

    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VENDOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
