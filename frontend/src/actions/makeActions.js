import axios from 'axios';
import {
  MAKE_LIST_FAIL,
  MAKE_LIST_REQUEST,
  MAKE_LIST_SUCCESS,
} from '../constants/makeConstants';
import {
  MODEL_LIST_FAIL,
  MODEL_LIST_REQUEST,
  MODEL_LIST_SUCCESS,
} from '../constants/modelConstants';

export const listMakes = () => async (dispatch) => {
  try {
    dispatch({ type: MAKE_LIST_REQUEST });

    const { data } = await axios.get(`/api/makes`);

    dispatch({
      type: MAKE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAKE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMakeModels = (make) => async (dispatch) => {
  try {
    dispatch({ type: MODEL_LIST_REQUEST });

    const { data } = await axios.get(`/api/makes/models/${make}`);

    dispatch({
      type: MODEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MODEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
