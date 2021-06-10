import {
  MODEL_LIST_REQUEST,
  MODEL_LIST_SUCCESS,
  MODEL_LIST_FAIL,
} from '../constants/modelConstants';

export const modelListReducer = (state = { models: [] }, action) => {
  switch (action.type) {
    case MODEL_LIST_REQUEST:
      return { loading: true, models: [] };
    case MODEL_LIST_SUCCESS:
      return { loading: false, models: action.payload };
    case MODEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
