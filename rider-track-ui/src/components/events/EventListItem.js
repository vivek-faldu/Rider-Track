import React, { Component } from 'react';
import {
  Box, Typography, Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EVENT_DETAIL_PATH, EVENT_REGISTRATION_PATH } from '../../RouteConstants';
import { UPCOMING_EVENTS } from './EventsConstants';
import Login from '../authentication/Login';
import { cancelLoginAttempt } from '../../actions/authenticationAction';


/**
 * Component to render the event list item to the browser.
 * Author: Sai Saran Kandimalla.
 * Date: 09/24/2019.
 * User Story: 30.
 */
class EventListItem extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      triedToRegister: false,
    };
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.authentication) {
      this.setState(({
        isLoggedIn: newProps.authentication.isAuthenticated,
      }));
    }
    if (newProps.authentication.loginAttemptCancelled) {
      this.setState({
        triedToRegister: false,
      });
    }
  }

  handleRegisterClick = (event) => {
    if (!this.state.isLoggedIn) {
      event.preventDefault();
      this.setState({
        triedToRegister: true,
      });
    }
  }

  render() {
    return (
      <Box className="row">
        <div className="col-md-2 rt-event-list-item-text">
          <p>
            {this.props.eventDate}
          </p>
        </div>
        <div className="col-md-3 rt-event-list-item-text">
          <Typography>
        <Link to={EVENT_DETAIL_PATH.replace(':id', this.props.eventid)}>
          {this.props.eventName}
        </Link>
      </Typography>
        </div>
        <div className={this.props.eventType === UPCOMING_EVENTS ? 'col-md-5 rt-event-list-item-text' : 'col-md-7 rt-event-list-item-text'}>
          <p>
        {this.props.eventDescription}
      </p>
        </div>
        {this.props.eventType === UPCOMING_EVENTS
      ? (
        <div className="col-md-2">
          <Link to={EVENT_REGISTRATION_PATH.replace(':id', this.props.eventid)} onClick={this.handleRegisterClick}>
            <Button
              variant="contained"
              color="primary"
              className="rt-event-register-button"
            >
              Register
            </Button>
            {!this.state.isLoggedIn && this.state.triedToRegister 
              ? (
                <Login
                  openDialog
                />
                ) : null }
          </Link>
        </div>
      ) : null}
      </Box>
    );
  }
}

EventListItem.PropTypes = {
  cancelLoginAttempt: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState, { cancelLoginAttempt })(EventListItem);
