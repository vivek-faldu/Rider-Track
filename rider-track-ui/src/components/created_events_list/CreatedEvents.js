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
    CircularProgress,
} from '@material-ui/core';
import './CreatedEvents.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreatedEventsListItem from './CreatedEventsListItem';

class CreatedEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            createdevents: [],
            ready: false,
        };
    }


    async componentDidMount() {
        const uid = this.props.authentication.user.id;
        const url = `http://localhost:4241/api/user/events?userid=${  uid}`;
        const res = await fetch(url);
        res.json()
            .then((result) => this.setState({
                createdevents: result.created_events,
                ready: true,
            }))
            .catch((err) => console.log('Error in fetching created events list', err));
    }


    render() {
        return (
          <Card className="rt-events-card" >
                <div className="row">
                    <div className="col-md-4">
                        <h1 className="rt-events-header">Created Events</h1>
                    </div>
                </div>
                <Divider className="row" />
                {this.state.ready? (
                  <div>
                    <ul>
                        {this.state.createdevents.length > 0 ? this.state.createdevents.map((el) => (
                            <div>
                                <li>
                                    <CreatedEventsListItem
                                        eventName={el.event_name}
                                        eventDescription={el.event_description}
                                        eventDate={el.date_time}
                                        eventId={el._id}
                                        eventStatus={el.status}
                                    />
                                </li>
                                <Divider variant="middle" />
                            </div>
                        )) : "You have not organized any events yet"}
                    </ul>
                </div>) : (
                    <div className="rt-spinner-div">
                        <CircularProgress />
                    </div>
                )}
            </Card>
);
    }
}


CreatedEvents.PropTypes = {
    authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
    authentication: state.authentication,
});

export default connect(mapState)(CreatedEvents);
