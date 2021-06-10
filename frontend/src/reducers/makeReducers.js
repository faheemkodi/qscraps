import {
  MAKE_LIST_REQUEST,
  MAKE_LIST_SUCCESS,
  MAKE_LIST_FAIL,
} from '../constants/makeConstants';

export const makeListReducer = (state = { makes: [] }, action) => {
  switch (action.type) {
    case MAKE_LIST_REQUEST:
      return { loading: true, makes: [] };
    case MAKE_LIST_SUCCESS:
      return { loading: false, makes: action.payload };
    case MAKE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
