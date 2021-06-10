//try splitting the listListings dispatch with a conditional based on the existence of keywords or MMYC
import axios from 'axios';
import {
  LISTING_LIST_REQUEST,
  LISTING_LIST_SUCCESS,
  LISTING_LIST_FAIL,
  LISTING_DETAILS_REQUEST,
  LISTING_DETAILS_SUCCESS,
  LISTING_DETAILS_FAIL,
  LISTING_DELETE_REQUEST,
  LISTING_DELETE_SUCCESS,
  LISTING_DELETE_FAIL,
  LISTING_CREATE_REQUEST,
  LISTING_CREATE_SUCCESS,
  LISTING_CREATE_FAIL,
  LISTING_UPDATE_REQUEST,
  LISTING_UPDATE_SUCCESS,
  LISTING_UPDATE_FAIL,
} from '../constants/listingConstants';

export const listListings =
  (keyword = '', make = '', model = '', year = '', category = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: LISTING_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/listings?keyword=${keyword}&make=${make}&model=${model}&year=${year}&category=${category}`
      );

      dispatch({
        type: LISTING_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LISTING_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listListingDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/listings/${id}`);

    dispatch({
      type: LISTING_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteListing = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LISTING_DELETE_REQUEST });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    await axios.delete(`/api/listings/${id}`, config);

    dispatch({
      type: LISTING_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LISTING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createListing = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LISTING_CREATE_REQUEST });

    const {
      vendorLogin: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/listings/', {}, config);

    dispatch({
      type: LISTING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateListing = (listing) => async (dispatch, getState) => {
  try {
    dispatch({ type: LISTING_UPDATE_REQUEST });

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
      `/api/listings/${listing._id}`,
      listing,
      config
    );

    dispatch({
      type: LISTING_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LISTING_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
