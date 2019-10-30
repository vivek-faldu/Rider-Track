/* eslint-disable react/prefer-stateless-function */
/*
    Component to render the created events list item
    Author: Janani Thiagarajan
    Date: 10/21/2019
    US: 101, Task : 104
 */

import React, { Component } from 'react';
import {
    Box, Typography, Link, Button,
} from '@material-ui/core';
import { EVENT_DETAIL_PATH } from '../../RouteConstants';

export default class CreatedEventsListItem extends Component {
    start = async (eventId) => {
        const url = `http://localhost:4241/api/events/start/${eventId}`;

        const res = await fetch(url, {
            method: 'PUT', // Update to PUT
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(content),
        });

        await res.json();
    }

    stop = async (eventId) => {
        const url = `http://localhost:4241/api/events/stop/${eventId}`;

        const res = await fetch(url, {
            method: 'PUT', // Update to PUT
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify(content),
        });
        await res.json();
    }

    deleteEvent = (eventID) => {
        // once the backend is done, an ajax call will be made to the backend to delete
        // event from here
        console.log(eventID);
    }

    render() {
        let isLive = null;
        let isUpcoming = null;
        let deleteButton = null;

        if (this.props.eventStatus === 'Upcoming') {
            isUpcoming = (
                <span>
                    <Button type="button" variant="contained" onClick={() => { this.start(this.props.eventId); }}>Start</Button>
                </span>
            );
        }

        if (this.props.eventStatus === 'Live') {
            isLive = (
                <span>
                    <Button type="button" variant="contained" onClick={() => { this.stop(this.props.eventId); }}>Stop</Button>
                </span>
            );
        }

        if(this.props.eventStatus !== 'Live') {

            deleteButton = (
                <span>
                    <Button 
                        type="button" 
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            this.deleteEvent(this.props.eventId);
                        }}
                    >
                        Delete
                    </Button>
                </span>
            );
        }

        return (
            <Box className="row">
                <div className="col-md-2 rt-events-list-item-text">
                    <p>
                        {this.props.eventDate}
                    </p>
                </div>
                <div className="col-md-3 rt-events-list-item-text">
                    <Typography>
                        <Link href={EVENT_DETAIL_PATH.replace(':id', this.props.eventId)}>
                            {this.props.eventName}
                        </Link>
                    </Typography>
                </div>
                <div className="col-md-3 rt-events-list-item-text">
                    <p>
                        {this.props.eventDescription}
                    </p>
                </div>
                <div className="col-md-2 rt-events-list-item-text">
                    <p>
                        {this.props.eventStatus}
                    </p>
                </div>
                <div className="col-md-2">
                        {isLive}
                        {isUpcoming}
                        {deleteButton}
                </div>
                
            </Box>
        );
    }
}
