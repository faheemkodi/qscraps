import {
  YEAR_LIST_REQUEST,
  YEAR_LIST_SUCCESS,
  YEAR_LIST_FAIL,
} from '../constants/yearConstants';

export const yearListReducer = (state = { years: [] }, action) => {
  switch (action.type) {
    case YEAR_LIST_REQUEST:
      return { loading: true, years: [] };
    case YEAR_LIST_SUCCESS:
      return { loading: false, years: action.payload };
    case YEAR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
