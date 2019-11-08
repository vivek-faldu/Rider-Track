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


import { Button, Link, ClickAwayListener } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import AddBox from '@material-ui/icons/AddBox';
import Room from '@material-ui/icons/Room';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import {
  PARTICIPANT_HISTORY, HOME_ROUTE, EVENT_CREATION_PATH, CREATED_EVENTS, ABOUT_US, PROFILE,
} from '../../RouteConstants';
import store from '../../store';
import Logout from '../authentication/Logout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.authentication.isAuthenticated,
      anchorEl: null,
      menuAnchorEl: null,
      menuOpen: false,
    };
  }


  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleMenuClick = (event) => {
    this.setState({
      menuAnchorEl: event.currentTarget,
      menuOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleMenuClose = (event) => {
    this.setState({
      menuAnchorEl: null,
      menuOpen: false,
    });
  }

  handleListKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      this.setState({
        menuOpen: false,
        menuAnchorEl: null,
      });
    }
  }

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
            {this.state.isLoggedIn
              ? (
<span>
                <Link href={PROFILE}>
                <Button className="menu_button" color="inherit">Profile</Button>
              </Link>
              </span>
)
            : null}
            <span>
              <Link href={ABOUT_US}>
                <Button className="menu_button" color="inherit">About</Button>
              </Link>
            </span>
          </Grid>
          <Hidden smDown>
            <Button
              ref={this.state.menuAnchorEl}
              className="menu_button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleMenuClick}
            >
              <Grid container alignment="center" justify="center" md={12}>
                { this.state.isLoggedIn
                ? (
                  <Grid item className="rt_username">
                    Hello
                    {' '}
                    {this.props.authentication.user.username}
                  </Grid>
                ) : (
                  <Grid item className="rt_username">
                      Login/Signup
                  </Grid>
                 )}
                <Grid item><Person /></Grid>
              </Grid>
            </Button>

            <Menu
              id="simple-menu"
              anchorEl={this.state.menuAnchorEl}
              keepMounted
              open={this.state.menuOpen}
              onClose={this.handleMenuClose}
            >
              {this.state.isLoggedIn ? (
                <div>
                  <MenuItem
                    onClick={this.handleMenuClose}
                  >
                    <Logout />
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleMenuClose}
                  >
                    <Link href={PARTICIPANT_HISTORY}>
                      <Button className="menu_button" color="inherit">My Events</Button>
                    </Link>
                  </MenuItem>
                  { this.props.authentication.user.is_admin ? (
                    <div>
                      <MenuItem
                        onClick={this.handleMenuClose}
                      >
                        <Link href={EVENT_CREATION_PATH}>
                          <Button color="inherit">Create New Event</Button>
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={this.handleMenuClose}
                      >
                        <Link href={CREATED_EVENTS}>
                          <Button color="inherit">My Created Events</Button>
                        </Link>
                      </MenuItem>
                    </div>
                  ) : null }
                </div>
                ) : (
                  <div>
                    <MenuItem
                      onClick={this.handleMenuClose}
                    >
                      <Login />
                    </MenuItem>
                    <MenuItem
                      onClick={this.handleMenuClose}
                    >
                      <Register />
                    </MenuItem>
                  </div>
              )}
            </Menu>
          </Hidden>
        </Grid>
        <Grid container alignItems="center" className="info_bar">
          <Grid item xs={12}>
            <Hidden smDown>
              <p>
                Organize, Participate, Track And Share Events! Visualize The Events As They Take Place.
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
