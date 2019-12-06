/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/*
    Component that renders the list of registered events
    Author: Janani Thiagarajan
    Date: 10/06/2019
    US: 3, Task : 63

    Update to fetch user id from session
    Author: Janani Thiagarajan
    Date: 10/30/2019
    US : 123 , Task : 130
*/

import React, { Component } from 'react';
import {
  Card,
  Divider,
} from '@material-ui/core';
import './ParticipantHistory.css';
import ParticipantHistoryItem from './ParticipantHistoryItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ParticipantHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }


  async componentDidMount() {
    let uid = this.props.authentication.user.id;
    let url = '/api/user/events?userid=' + uid;
    const res = await fetch(url);
    res.json()
      .then((res) => this.setState({ events: res.participated_events }))
      .catch((err) => console.log('Error in fetching registered events list', err));
  }

  render() {
    return (
      <Card className="rt-history-card">
        <div className="row">
          <div className="col-md-4">
            <h1 className="rt-history-header">Registered Events</h1>
          </div>
        </div>
        <Divider className="row" />
        <div>
          <ul>
            {this.state.events.length > 0 ? this.state.events.map((el) => (
              <div>
                <li>
                  <ParticipantHistoryItem
                    eventName={el.event_name}
                    eventDescription={el.event_description}
                    eventDate={el.date_time}
                    eventId={el._id}
                    eventStatus={el.status}
                  />
                </li>
                <Divider variant="middle" />
              </div>
            )) : "You have not registered for any event yet!!!"}
          </ul>
        </div>
      </Card>
    );
  }
}

ParticipantHistory.PropTypes = {
  authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState)(ParticipantHistory);
