/**
 * Author: Shaunak Shah
 * Task: Fix participants list of registered users and added event description and date.
 * Task no: 116
 * Date: 10/24/2019
 */

import React, { useEffect, useState } from 'react';
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
import { Button, Divider } from '@material-ui/core';
import EventDetailMap from './EventDetailMap';
import { Link } from 'react-router-dom';
import { EVENT_REGISTRATION_PATH } from '../../RouteConstants';
import EventListItem from '../events/EventListItem';
import { any } from 'prop-types';

function EventsDetail({ match }) {
  const [hasError, setErrors] = useState(false);
  const [details, setDetail] = useState({});
  const [parts, setParts] = useState([]);
  const [time, setTime] = useState(new Date());

  let url = 'http://localhost:4241/api/events/';
  url = url.concat(match.params.id);

  async function fetchData() {
    const res = await fetch(url);
    res.json()
      .then((result) => {
        setDetail(result);
        setParts(result.participants);
        setTime(new Date(result.date_time));
      })
      .catch((err) => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container className="event_layout" direction="row">
      <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
        <Card>
          <Grid item><h4>{details.event_name}</h4></Grid>
          <Grid item direction="row" justify="flex-start" container>
            <Grid item>
              <p>
                Organized by:
                Foo Bar
              </p>
            </Grid>
          </Grid>
          <br />
          <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
            <Grid item>
              <AvTimerIcon />
              <p>
                {details.duration}
              </p>
            </Grid>
            <Grid item>
              <EventIcon />
              <p>{`${time.getMonth()}-${time.getDay()}-${time.getFullYear()}`}</p>
            </Grid>
            <Grid item>
              <PeopleIcon />
              <p>{details.max_participant}</p>
            </Grid>
          </Grid>
          <br />

          <div item>
            <h6 align="left">Description</h6>
            <p>{details.event_description}</p>
          </div>
          <br />

          <div item className="participants_list">
            <h6 align="left">Participants</h6>
            <List>
              {parts.map((el) => (
                <div>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={el.name} />
                  </ListItem>
                  <Divider variant="middle" />
                </div>
              ))}
            </List>
          </div>

          <Link to={EVENT_REGISTRATION_PATH.replace(':id', match.params.id)}>
            <Button color="green">Register Today</Button>
          </Link>
          <br />

        </Card>
      </Grid>
      <Grid item md={12} lg={8}>
        <EventDetailMap coordinate={details.checkpoints} />
      </Grid>
    </Grid>
  );
}

export default EventsDetail;
