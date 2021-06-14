import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import ListingScreen from './screens/ListingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import VendorListScreen from './screens/VendorListScreen';
import VendorEditScreen from './screens/VendorEditScreen';
import ListingListScreen from './screens/ListingListScreen';
import ListingEditScreen from './screens/ListingEditScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-5">
        <Container>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/dashboard" component={DashboardScreen} />
            <Route
              exact
              path="/dashboard/:pageNumber"
              component={DashboardScreen}
            />
            <Route exact path="/listing/:id" component={ListingScreen} />
            <Route
              exact
              path="/admin/vendorlist"
              component={VendorListScreen}
            />
            <Route
              exact
              path="/admin/vendorlist/:pageNumber"
              component={VendorListScreen}
            />
            <Route
              exact
              path="/admin/vendor/:id/edit"
              component={VendorEditScreen}
            />
            <Route
              exact
              path="/admin/listinglist"
              component={ListingListScreen}
            />
            <Route
              exact
              path="/admin/listinglist/:pageNumber"
              component={ListingListScreen}
            />
            <Route
              path="/admin/listing/:id/edit"
              component={ListingEditScreen}
            />
            <Route
              exact
              path="/search/filters/:make/:model/:year/:category"
              component={HomeScreen}
            />
            <Route
              exact
              path="/search/filters/:make/:model/:year/:category/page/:pageNumber"
              component={HomeScreen}
            />
            <Route exact path="/search/:keyword" component={HomeScreen} />
            <Route exact path="/page/:pageNumber" component={HomeScreen} />
            <Route
              exact
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
            <Route exact path="/" component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
