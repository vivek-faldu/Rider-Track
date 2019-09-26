import React from 'react';
import { Box, Typography, Link, Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
/**
 * Component to render the event list item to the browser.
 * Author: Sai Saran Kandimalla.
 * Date: 09/24/2019.
 * User Story: 30.
 */
export const EventListItem = () => {
    
    return (
        <Box className = "row">
            <div className = "col-md-2 rt-event-list-item-text">
                <p>
                    {formatDate(new Date())}
                </p>
            </div>
            <div className = "col-md-3 rt-event-list-item-text">
                <Typography>
                    <Link href = {"/event/1"}>
                        Terra Australis Bike Epic
                    </Link>
                </Typography>
            </div>
            <div className = "col-md-5 rt-event-list-item-text">
                <p>
                    A 6,300k epic solo self supported ride from Cape York at the top of Australia to Wilsons Promontory the southern tip of mainland Australia.
                </p>
            </div>
            <div className = "col-md-2">
                <Link href ={"/register"}>
                <Button 
                    variant = "contained" 
                    color = "primary" 
                    className = "rt-event-register-button"
                >
                    Register
                </Button>
                </Link>
            </div>
        </Box>
    )
}

/**
 * utility function to format the date to render it on UI. 
 * Author: Sai Saran Kandimalla.
 * Date: 09/24/2019
 * User Story: 30
 * Referred from: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
 */
const formatDate = (date) => {
    var monthNames = [
        "Jan", "Feb", "March",
        "April", "May", "June", "July",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
      ];
    
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
    
      return day + '-' + monthNames[monthIndex] + '-' + year;
}
