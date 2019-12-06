import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './RegisteredEventDetail.css';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Card from '@material-ui/core/Card';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import WatchIcon from '@material-ui/icons/Watch';
import EventNoteIcon from '@material-ui/icons/EventNote';
import RegisteredEventDetailMap from './RegisteredEventDetailMap';
import EventDetailMap from '../events_detail/EventDetailMap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from '@material-ui/core';
 */
class RegisteredEventDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
    };
  }

  async componentDidMount() {
    let uid = this.props.authentication.user.id;
    let url = '/api/user/eventdetail?userid=' + uid + '&eventid=';
    url = url.concat(this.props.match.params.id);
    const res = await fetch(url);
    res.json()
      .then((res) => this.setState({ details: res }))
      .catch((err) => console.log('Error in fetching registered event details', err));
  }

  render() {
    return (
      <Grid container className="event_layout" direction="row">
        <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
          <Card>
            <br />
            <Grid item><h4>{this.state.details.event_name}</h4></Grid>
            <Grid item direction="row" justify="flex-start" container>
              <br />
              <Grid item><p>{this.state.details.event_description}</p></Grid>
            </Grid>
            <br />
            <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
              <Grid item>
                <AvTimerIcon />
                <p>{this.state.details.duration}</p>
              </Grid>
              <Grid item>
                <EventIcon />
                <p>{this.state.details.date_time}</p>
              </Grid>
              <Grid item>
                <PeopleIcon />
                <p>{this.state.details.max_participant}</p>
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
                <p>{this.state.details.status}</p>
              </Grid>
            </Grid>
            <br />
          </Card>
        </Grid>
        <Grid item md={12} lg={8}>
          {this.state.details.status === 'Completed'
            ? <RegisteredEventDetailMap checkpoints={this.state.details.checkpoints} />
            : <EventDetailMap coordinate={this.state.details.event_checkpoints} />}
        </Grid>
      </Grid>
    );
  }
}
RegisteredEventDetail.PropTypes = {
  authentication: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  authentication: state.authentication,
});

export default connect(mapState)(RegisteredEventDetail);
