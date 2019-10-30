/* eslint-disable react/prefer-stateless-function */
/*
    Component to render the created events list item
    Author: Janani Thiagarajan
    Date: 10/21/2019
    US: 101, Task : 104
 */

import React, { Component } from 'react';
import {
    Box, Typography, Link, Button, Snackbar, IconButton,
} from '@material-ui/core';
import { EVENT_DETAIL_PATH } from '../../RouteConstants';

export default class CreatedEventsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            messageSet: null,
        }
    }

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
            messageSet: "Event started successfully"
        });
    }

    handleStop = () => {
        this.setState(
            {
                open: true,
                messageSet: "Event stopped successfully"
            });
    }

    handleClose = () => {
        this.setState(
            {
                open: false,
            });
    }

    render() {

        let isLive = null;
        let isUpcoming = null;

        if (this.props.eventStatus === 'Upcoming') {
            isUpcoming = (
                <div>
                    <Button type="button" variant="contained" onClick={() => { this.start(this.props.eventId); }}>Start</Button>
                </div>
            );
        }

        if (this.props.eventStatus === 'Live') {
            isLive = (
                <div>
                    <Button type="button" variant="contained" onClick={() => { this.stop(this.props.eventId); }}>Stop</Button>
                </div>
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
                {isLive}
                {isUpcoming}

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
            </Box>
        );
    }
}
