import React from 'react';
import { Box, Typography, Link, Button } from '@material-ui/core';
import { EVENT_DETAIL_PATH, EVENT_REGISTRATION_PATH } from '../../RouteConstants';
import { UPCOMING_EVENTS } from './EventsConstants';

/**
 * Component to render the event list item to the browser.
 * Author: Sai Saran Kandimalla.
 * Date: 09/24/2019.
 * User Story: 30.
 */
const EventListItem = (props) => {
    
    return (
        <Box className="row">
            <div className="col-md-2 rt-event-list-item-text">
                <p>
                    {props.eventDate}
                </p>
            </div>
            <div className="col-md-3 rt-event-list-item-text">
                <Typography>
                    <Link href={EVENT_DETAIL_PATH}>
                        {props.eventName}
                    </Link>
                </Typography>
            </div>
            <div className={props.eventType === UPCOMING_EVENTS? "col-md-5 rt-event-list-item-text": "col-md-7 rt-event-list-item-text"}>
                <p>
                    {props.eventDescription}
                </p>
            </div>
            {props.eventType === UPCOMING_EVENTS?
                (<div className="col-md-2">
                    <Link href={EVENT_REGISTRATION_PATH}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="rt-event-register-button"
                    >
                        Register
                    </Button>
                    </Link>
                </div>):null}
        </Box>
    )
}

export default EventListItem;
