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
import {
  PARTICIPANT_HISTORY, HOME_ROUTE, EVENT_CREATION_PATH, CREATED_EVENTS, ABOUT_US
} from '../../RouteConstants';
import store from '../../store';
import Logout from '../authentication/Logout';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.authentication.isAuthenticated,
      anchorEl: null
    };
  }


  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  };

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.authentication) {
      this.setState({
        isLoggedIn: newProps.authentication.isAuthenticated,
      });
    }
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
            <Button className="home_button" onClick={this.handleLogoClick}>Rider Track</Button>
          </Grid>
          <Grid item md={12} lg={8} r>
            <Link href={HOME_ROUTE}>
              <Button className="menu_button" color="inherit">Home</Button>
            </Link>

            {this.state.isLoggedIn ?
              (
                <Link href={PARTICIPANT_HISTORY}>
                  <Button className="menu_button" color="inherit">My Events</Button>
                </Link>
              ) : null}

            {this.state.isLoggedIn && this.props.authentication.user.is_admin ? (
              <span>
                <Button className="menu_button" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} >
                  Admin
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem>
                    <Link href={EVENT_CREATION_PATH}>
                      <Button color="inherit">Create New Event</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href={CREATED_EVENTS}>
                      <Button color="inherit">My Created Events</Button>
                    </Link>
                  </MenuItem>
                </Menu>
              </span>
            ) : null}


            {this.state.isLoggedIn ? <Logout />
              : (
                <span>
                  <Login />
                  <Register />
                </span>
              )}
            <span>
              <Link href={ABOUT_US}>
                <Button className="menu_button" color="inherit">About</Button>
              </Link>
            </span>

          </Grid>
          <Hidden smDown>
            <Grid container alignment="center" justify="center" md={12} lg={2} spacing={3}>
              {this.state.isLoggedIn ?
                (
                  <Grid item className="rt_username">
                    Hello {this.props.authentication.user.username}
                  </Grid>
                ) : null}
              <Grid item>{<Person />}</Grid>
            </Grid>
          </Hidden>
        </Grid>
        <Grid container alignItems="center" className="info_bar">
          <Grid item xs={12}>
            <Hidden smDown>
              <p>
                Organise, Participate, Tract And Share Events! Visualize The Events as They Take Place.
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
