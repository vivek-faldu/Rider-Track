/*
    Component to render the participant's history of registered events list item
    Author: Janani Thiagarajan
    Date: 10/06/2019
    US: 3, Task : 63
 */

import React from 'react';
import {
    Box, Typography, Link,
} from '@material-ui/core';
import { REGISTERED_EVENT_DETAIL_PATH } from '../../RouteConstants';

const ParticipantHistoryItem = (props) => (
    <Box className="row">
        <div className="col-md-2 rt-history-list-item-text">
            <p>
                {props.eventDate}
            </p>
        </div>
        <div className="col-md-3 rt-history-list-item-text">
            <Typography>
                <Link href={REGISTERED_EVENT_DETAIL_PATH.replace(':id', props.eventId)}>
                    {props.eventName}
                </Link>
            </Typography>
        </div>
        <div className="col-md-7 rt-history-list-item-text">
            <p>
                {props.eventDescription}
            </p>
        </div>
    </Box>
);

export default ParticipantHistoryItem;
