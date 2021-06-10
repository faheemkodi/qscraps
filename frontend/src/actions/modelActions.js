import axios from 'axios';
import {
  MODEL_LIST_FAIL,
  MODEL_LIST_REQUEST,
  MODEL_LIST_SUCCESS,
} from '../constants/modelConstants';

export const listModels = () => async (dispatch) => {
  try {
    dispatch({ type: MODEL_LIST_REQUEST });

    const { data } = await axios.get(`/api/models`);

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
