/**
 * Author: Shaunak Shah
 * Task: Refactored the way states are initialized.
 * Task no: 66
 * Date: 10/03/2019
 */

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import './EventsDetail.css';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import map from '../../assets/map.png';

function EventsDetail({ match }) {
  const [state, setState] = React.useState({
    details: {},
  });

  let url = 'http://localhost:4241/api/events/';
  url = url.concat(match.params.id);
    fetch(url)
      .then((results) => results.json())
      .then((data) => {
        setState({
          details: data,
        });
      });

  return (
    <Grid container className="event_layout" direction="row">
      <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
        <Card>
          <Grid item><h4>{state.details.event_name}</h4></Grid>
          <Grid item direction="row" justify="flex-start" container>
            <Grid item>
              <p>
                Organized by:
                {state.details.cteator_id}
              </p>
            </Grid>
          </Grid>
          <br />
          <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <AvTimerIcon />
              <p>
                {state.details.duration}
              </p>
            </Grid>
            <Grid item>
              <EventIcon />
              <p>{state.details.data_time}</p>
            </Grid>
            <Grid item>
              <PeopleIcon />
              <p>{state.details.max_participant}</p>
            </Grid>
          </Grid>
          <br />

          <div item className="participants_list">
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
          </div>
          <Button color="green">Register Today</Button>
          <br />
        </Card>
      </Grid>
      <Grid item md={12} lg={8}>
        <img className="map_image" img src={map} alt="map" />
      </Grid>
    </Grid>
  );
}

export default EventsDetail;
