import axios from 'axios';
import {
  YEAR_LIST_FAIL,
  YEAR_LIST_REQUEST,
  YEAR_LIST_SUCCESS,
} from '../constants/yearConstants';

export const listYears = () => async (dispatch) => {
  try {
    dispatch({ type: YEAR_LIST_REQUEST });

    const { data } = await axios.get(`/api/years`);

    dispatch({
      type: YEAR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: YEAR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
