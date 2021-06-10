import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  listingDetailsReducer,
  listingListReducer,
  listingDeleteReducer,
  listingCreateReducer,
  listingUpdateReducer,
} from './reducers/listingReducers';
import {
  vendorLoginReducer,
  vendorRegisterReducer,
  vendorDetailsReducer,
  vendorUpdateProfileReducer,
  vendorListReducer,
  vendorDeleteReducer,
  vendorUpdateReducer,
} from './reducers/vendorReducers';
import { makeListReducer } from './reducers/makeReducers';
import { modelListReducer } from './reducers/modelReducers';
import { yearListReducer } from './reducers/yearReducers';
import { categoryListReducer } from './reducers/categoryReducers';

const reducer = combineReducers({
  listingList: listingListReducer,
  listingDetails: listingDetailsReducer,
  listingDelete: listingDeleteReducer,
  listingCreate: listingCreateReducer,
  listingUpdate: listingUpdateReducer,
  makeList: makeListReducer,
  modelList: modelListReducer,
  yearList: yearListReducer,
  categoryList: categoryListReducer,
  vendorLogin: vendorLoginReducer,
  vendorRegister: vendorRegisterReducer,
  vendorDetails: vendorDetailsReducer,
  vendorUpdateProfile: vendorUpdateProfileReducer,
  vendorList: vendorListReducer,
  vendorDelete: vendorDeleteReducer,
  vendorUpdate: vendorUpdateReducer,
});

const vendorInfoFromStorage = localStorage.getItem('vendorInfo')
  ? JSON.parse(localStorage.getItem('vendorInfo'))
  : null;

const initialState = {
  vendorLogin: { vendorInfo: vendorInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
