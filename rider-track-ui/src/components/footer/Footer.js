/**
 * Author: Shaunak Shah
 * Task: Fix and set code style for tasks to follow eslint.
 * Task no: 44, 53
 * Date: 09/26/2019
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import './Footer.css';
import { Button } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Login from '../authentication/Login';
import Logout from '../authentication/Logout';

class Footer extends Component {
  
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    }
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if(newProps.authentication) {
      this.setState({
        isLoggedIn: newProps.authentication.isAuthenticated,
      });
    }
  }

  render() {
    return (
      <Grid container alignItems="center" className="bottom">
        <Hidden mdDown>
          <Grid container item md={4} direction="column" justify="center" alignItems="center">
            <Grid item md={3}><Button className="footer_button" color="inherit">Home</Button></Grid>
            <Grid item md={3}><Button className="footer_button" color="inherit">Organisers</Button></Grid>
            <Grid item md={3}><Button className="footer_button" color="inherit">About</Button></Grid>
            { this.state.isLoggedIn?
            (
              <Grid item md={3}>
                <Button className="footer_button" color="inherit">
                  <Logout />
                </Button>
              </Grid>
            ):(
              <Grid item md={3}>
                <Button className="footer_button" color="inherit">
                  <Login />
                </Button>
              </Grid>
            )}
          </Grid>
        </Hidden>
        <Grid item md={4} container direction="row" justify="space-between" alignItems="center">
          <Grid md={3} className="quick_actions"><FolderIcon /></Grid>
          <Grid md={3} className="quick_actions"><RestoreIcon /></Grid>
          <Grid md={3} className="quick_actions"><FavoriteIcon /></Grid>
          <Grid md={3} className="quick_actions"><LocationOnIcon /></Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item md={4} container direction="column" justify="center" alignItems="center">
            <Grid item><Button className="footer_button" color="inherit">Facebook</Button></Grid>
            <Grid item><Button className="footer_button" color="inherit">Twitter</Button></Grid>
            <Grid item><Button className="footer_button" color="inherit">Instgram</Button></Grid>
            <Grid item><Button className="footer_button" color="inherit">Youtube</Button></Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

Footer.PropTypes = {
  authentication: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
  errors: state.errors,
});

export default connect(
  mapState,
)(withRouter(Footer));
