/* eslint-disable react/prefer-stateless-function */
/*
    Component to render the created events list item
    Author: Janani Thiagarajan
    Date: 10/21/2019
    US: 101, Task : 104

    Update to toggle start/stop button and event status
    Author: Janani Thiagarajan
    Date: 10/31/2019
    US : 123 , Task : 129
 */

import React, { Component } from 'react';
import {
    Box, Typography, Link, Button, Snackbar, IconButton,
} from '@material-ui/core';
import { EVENT_DETAIL_PATH } from '../../RouteConstants';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';


class CreatedEventsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            messageSet: null,
            statusFlag: this.props.eventStatus,
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
            messageSet: "Event started successfully",
            statusFlag: "Live",
        });
    }

    handleStop = () => {
        this.setState(
            {
                open: true,
                messageSet: "Event stopped successfully",
                statusFlag: "Completed",
            });
    }

    handleClose = () => {
        this.setState(
            {
                open: false,
            });
    }

    deleteEvent = async (eventId) => {
        const url = `http://localhost:4241/api/events/delete/${eventId}`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(()=> {
            window.location.reload();
        });
    }

    render() {
        let isLive = null;
        let isUpcoming = null;
        let isCompleted = null;
        let deleteButton = null;

        if (this.state.statusFlag === 'Upcoming') {
            isUpcoming = (
                <span className="col-md-1 rt-events-list-item-text">
                    <Button type="button" variant="contained" onClick={() => { this.start(this.props.eventId); }}>Start</Button>
                </span>
            );
        }

        if (this.state.statusFlag === 'Live') {
            isLive = (
                <span className="col-md-1 rt-events-list-item-text">
                    <Button type="button" variant="contained" onClick={() => { this.stop(this.props.eventId); }}>Stop</Button>
                </span>
            )};
        
        if( this.state.statusFlag != 'Live') {
            deleteButton = (
                <span className="col-md-1 rt-evemts-list-item-text">
                    <Button 
                        type="button" 
                        variant="contained"
                        color="secondary" 
                        onClick={() => {this.deleteEvent(this.props.eventId); }}
                    >
                        Delete
                    </Button>
                </span>
            );
        }
        
        return (
            < Box className="row" >
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
                <div className="col-md-1 rt-events-list-item-text">
                    <p>
                        {this.state.statusFlag}
                    </p>
                </div>
                <div className="col-md-3 rt-events-list-item-text">
                    <span>
                        {isLive}
                        {isUpcoming}
                        {isCompleted}
                        {deleteButton}
                    </span>
                </div>
                
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
            </Box >
            );
    }
}
CreatedEventsListItem.PropTypes = {
    authentication: PropTypes.func.isRequired
};

const mapState = (state) => ({
    authentication: state.authentication,
});

export default connect (
    mapState
)(CreatedEventsListItem);