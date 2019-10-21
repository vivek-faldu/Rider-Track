/*
    Component to render the created events list item
    Author: Janani Thiagarajan
    Date: 10/21/2019
    US: 101, Task : 104
 */

import React from 'react';
import {
    Box, Typography, Link, Button,
} from '@material-ui/core';
import { EVENT_DETAIL_PATH } from '../../RouteConstants';

const CreatedEventsListItem = (props) => (
    <Box className="row">
        <div className="col-md-2 rt-events-list-item-text">
            <p>
                {props.eventDate}
            </p>
        </div>
        <div className="col-md-3 rt-events-list-item-text">
            <Typography>
                <Link href={EVENT_DETAIL_PATH.replace(':id', props.eventId)}>
                    {props.eventName}
                </Link>
            </Typography>
        </div>
        <div className="col-md-3 rt-events-list-item-text">
            <p>
                {props.eventDescription}
            </p>
        </div>
        <div className="col-md-2 rt-events-list-item-text">
            <p>
                {props.eventStatus}
            </p>
        </div>
        <div>
            <Button type="button" variant="contained">Start</Button>
        </div>
        <div>
            <Button type="button" variant="contained">Stop</Button>
        </div>
    </Box>
);

export default CreatedEventsListItem;
