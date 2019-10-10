import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './RegisteredEventDetail.css';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Card from '@material-ui/core/Card';
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
      const res = await fetch('http://localhost:4241/api/user/eventdetail?eventid=5d81d95a0b52a97535d59b56&userid=5d93b7d31c9d440000909462')
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
          <Grid item><h4>{details.event_name}</h4></Grid>
          <Grid item direction="row" justify="flex-start" container>
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
              <p>Max Participants  120</p>
            </Grid>
          </Grid>
          <br />

          {/* <div item className="participants_list">
            <h6 align="left">Participants</h6>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Pavan" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Saran" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Shilpa" />
              </ListItem>
            </List>
          </div> */}
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
