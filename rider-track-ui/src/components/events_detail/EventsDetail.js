/**
 * Author: Shaunak Shah
 * Task: Add redirect to register page
 * Task no: 137
 * Date: 10/31/2019
 */

import React, { Component, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './EventsDetail.css';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import {
  Button, Divider, Snackbar, IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EVENT_REGISTRATION_PATH } from '../../RouteConstants';
import EventListItem from '../events/EventListItem';
import { any, default as PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import withWidth from '@material-ui/core/withWidth';
import EventDetailMap from './EventDetailMap';

import Login from '../authentication/Login';


class EventsDetail extends Component {
  start = async (eventId) => {
    const url = `http://localhost:4241/api/events/start/${eventId}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const response = await res.json();
    if (response.status === 200) {
      this.handleStart();
    }
  }

  stop = async (eventId) => {
    const url = `http://localhost:4241/api/events/stop/${eventId}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    });

    const response = await res.json();
    if (response.status === 200) {
      this.handleStop();
    }
  }

  handleStart = () => {
    this.setState({
      open: true,
      messageSet: 'Event started successfully',
      statusFlag: 'Live',
    });
  }

  handleStop = () => {
    this.setState(
      {
        open: true,
        messageSet: 'Event stopped successfully',
        statusFlag: 'Completed',
      },
    );
  }

  handleClose = () => {
    this.setState(
      {
        open: false,
      },
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.authentication.isAuthenticated,
      errors: false,
      details: {},
      parts: [],
      time: new Date(),
      open: false,
      messageSet: null,
      statusFlag: this.props.eventStatus,
      triedToRegister: false,
    };
  }

  componentDidMount() {
    let url = 'http://localhost:4241/api/events/';
    url = url.concat(this.props.match.params.id);
    const res = fetch(url)
      .then((response) => response.json())
      .then((result) => this.setState({
        details: result,
        parts: result.participants,
        time: new Date(result.date_time),
      }))
      .catch((err) => this.setState = {
        errors: err,
      });
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.authentication) {
      this.setState({
        isLoggedIn: newProps.authentication.isAuthenticated,
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
    let isLive = null;
    let isUpcoming = null;
    let registrationOpen = null;

    if (this.state.isLoggedIn && this.props.authentication.user.is_admin && (this.state.details.creator_id === this.props.authentication.user.id)) {
      if (this.state.details.status === 'Upcoming') {
        isLive = null;
        isUpcoming = (
          <span className="col-md-2 rt-events-list-item-text">
            <p>{this.state.statusFlag}</p>
            <Button type="button" variant="contained" onClick={() => { this.start(this.state.details._id); }}>Start</Button>
          </span>
        );
      }

      if (this.state.details.status === 'Live') {
        isUpcoming = null;
        isLive = (
          <span className="col-md-2 rt-events-list-item-text">
            <p>{this.state.statusFlag}</p>
            <Button type="button" variant="contained" onClick={() => { this.stop(this.state.details._id); }}>Stop</Button>
          </span>
        );
      }
    }

    if (this.state.details.status === 'Upcoming') {
      registrationOpen = (
        <Button color="green">
          <Link to={EVENT_REGISTRATION_PATH.replace(':id', this.props.match.params.id)} onClick={this.handleRegisterClick}>
            Register Today
              </Link>
        </Button>
      )
    }

    return (
      <Grid container className="event_layout" direction="row">
        <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
          <Card>
            <Grid item><h4>{this.state.details.event_name}</h4></Grid>
            <Grid item direction="row" justify="flex-start" container>
              <Grid item>
                <p>
                  Organized by:
                  {this.state.details.organized_by}
                </p>
              </Grid>
            </Grid>
            <br />
            <Grid
              item
              container
              className="event_info_bar"
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Grid item>
                <AvTimerIcon />
                <p>
                  {this.state.details.duration}
                </p>
              </Grid>
              <Grid item>
                <EventIcon />
                <p>{`${this.state.time.getMonth()}-${this.state.time.getDay()}-${this.state.time.getFullYear()}`}</p>
              </Grid>
              <Grid item>
                <PeopleIcon />
                <p>{this.state.details.max_participant}</p>
              </Grid>
            </Grid>
            <br />

            <div item>
              <h6 align="left">Description</h6>
              <p>{this.state.details.event_description}</p>
            </div>
            <br />

            <div item>
              <h6 align="left">Participants</h6>
              <List className="participants_list">
                {this.state.parts.map((el) => (
                  <div>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={el.name} />
                    </ListItem>
                    <Divider variant="middle" />
                  </div>
                ))}
              </List>
            </div>

            {registrationOpen}
            {!this.state.isLoggedIn && this.state.triedToRegister
              ? (
                <Login
                  openDialog
                />
              ) : null}
            <br />

            {isUpcoming}
            {isLive}

            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.messageSet}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="close"
                  color="inherit"
                  style={{ padding: 0.5 }}
                />,
              ]}
            />

          </Card>
        </Grid>
        <Grid item md={12} lg={8}>
          <EventDetailMap coordinate={this.state.details.checkpoints} />
        </Grid>
      </Grid>
    );
  }
}

EventsDetail.propTypes = {
  cancelLoginAttempt: PropTypes.object.isRequired,
  authentication: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
  loginUser: state.login,
});

async function fetchData(url) {
  const res = await fetch(url);
  res.json()
    .then((result) => {
      this.setState = {
        details: result,
        parts: result.participants,
        time: new Date(result.date_time),
      };
    })
    .catch((err) => this.setState = {
      errors: err,
    });
}

export default connect(mapState)(withWidth()(EventsDetail));
