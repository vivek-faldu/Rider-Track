import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './RegisteredEventDetail.css';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Card from '@material-ui/core/Card';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import WatchIcon from '@material-ui/icons/Watch';
import EventNoteIcon from '@material-ui/icons/EventNote';
import map from '../../assets/map.png';

/* import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from '@material-ui/core';
 */

function RegisteredEventDetail() {
  const [hasError, setErrors] = useState(false)
  const [details, setDetails] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:4241/api/user/eventdetail?eventid=5da0111bf05a835eba01381d&userid=5d93b7d31c9d440000909462')
      res.json()
        .then(res => setDetails(res))
        .catch(err => setErrors(err));
    }

    fetchData();
  });

  return (
    <Grid container className="event_layout" direction="row">
      <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
        <Card>
          <br />
          <Grid item><h4>{details.event_name}</h4></Grid>
          <Grid item direction="row" justify="flex-start" container>
            <br />
            <Grid item><p>{details.event_description}</p></Grid>
          </Grid>
          <br />
          <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <AvTimerIcon />
              <p>{details.duration}</p>
            </Grid>
            <Grid item>
              <EventIcon />
              <p>{details.date_time}</p>
            </Grid>
            <Grid item>
              <PeopleIcon />
              <p>120</p>
            </Grid>
          </Grid>
          <br />
          <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <DirectionsRunIcon />
              <p>5mph</p>
            </Grid>
            <Grid item>
              <WatchIcon />
              <p>20minutes</p>
            </Grid>
            <Grid item>
              <EventNoteIcon />
              <p>Completed</p>
            </Grid>
          </Grid>
          <br />
        </Card>
      </Grid>
      <Grid item md={12} lg={8}>
        <img className="map_image" img src={map} alt="map" />
      </Grid>
    </Grid>
  );
}

export default RegisteredEventDetail;
