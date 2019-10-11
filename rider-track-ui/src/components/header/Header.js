/**
 * Author: Shaunak Shah
 * Task: Fix and set code style for tasks to follow eslint.
 * Task no: 44, 53
 * Date: 09/26/2019
 */

import React, { Component } from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { Button, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import AddBox from '@material-ui/icons/AddBox';
import Room from '@material-ui/icons/Room';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import { PARTICIPANT_HISTORY, HOME_ROUTE, EVENT_CREATION_PATH } from '../../RouteConstants';
import store from '../../store';
import Logout from '../authentication/Logout';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    this.setState({
      isLoggedIn: newProps.authentication.isAuthenticated,
    });
  }

  render() {
    return (
      <div>
        <Grid container alignItems="center" className="country_bar">
          <Grid item lg={10} />
          <Hidden mdDown><Grid intem lg={2}><p>United States</p></Grid></Hidden>
        </Grid>
        <Grid container alignItems="center" justify="center" className="nav_bar">
          <Grid md={12} lg={2} item>
            <Button className="home_button">Rider Track</Button>
          </Grid>
          <Grid item md={12} lg={8} r>
            <Link href={HOME_ROUTE}>
              <Button className="menu_button" color="inherit">Home</Button>
            </Link>
            <Link href={EVENT_CREATION_PATH}>
              <Button className="menu_button" color="inherit">Organizers</Button>
            </Link>
            <Button className="menu_button" color="inherit">About</Button>
            <Link href={PARTICIPANT_HISTORY}>
              <Button className="menu_button" color="inherit">My Events</Button>
            </Link>
            {this.state.isLoggedIn ? <Logout />
            : (
              <span>
                <Login />
                <Register />
              </span>
              )}

          </Grid>
          <Hidden smDown>
            <Grid container alignment="center" justify="center" md={12} lg={2} spacing={3}>
              <Grid item>{<Person />}</Grid>
              <Grid item>{<AddBox />}</Grid>
              <Grid item>{<Room />}</Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container alignItems="center" className="info_bar">
          <Grid item xs={12}>
            <Hidden smDown>
              <p>
                ORGANIZE, PARTICIPATE, TRACK AND SHARE EVENTS! VISUALIZE THE EVENTS AS THEY TAKE PLACE
              </p>
            </Hidden>
          </Grid>
        </Grid>
      </div>
    );
  }
  
}

Header.PropTypes = {
  authentication: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState)(withWidth()(Header));
