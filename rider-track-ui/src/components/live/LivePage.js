import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Pusher from 'pusher-js';
import TabView from './TabView';
import PaticipantList from './ParticipantList';
// eslint-disable-next-line react/prefer-stateless-function

const pusher = new Pusher('d3d42763648c6c9ca5d4', {
  cluster: 'us3',
  forceTLS: true,
});


export default class LivePage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userList: [],
        checkboxValue: [],
        coordinates: [{
          latitude: 33.42, longitude: -111.94, name: 'Vivek', url: 'data:image/jpeg;base64,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',
         }, {
          latitude: 33.42, longitude: -111.93, name: 'Shilpa', url: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg',
          }],
      };
    }

    async componentDidMount() {
      this.initPusher();

      let url = '/api/events/';
      url = url.concat(this.props.match.params.id);

      const res = await fetch(url);
      res.json()
        .then((result) => {
        const initList = [];
        for (let i = 0; i < result.participants.length; i++) {
            initList.push([result.participants[i].id, true]);
          }
    this.setState({ userList: result.participants, checkboxValue: initList });
})
        .catch((err) => console.log('error in live page ', err));
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    unsubscribe = () => {
      pusher.unsubscribe(`event_${this.props.match.params.id}_channel`);
    }

    initPusher = () => {
      const channel = pusher.subscribe(`event_${this.props.match.params.id}_channel`);
      channel.bind('my-event', (data) => {
        this.updateMarker(data.coordinates);
      });
    }

    updateMarker = (coordinates) => {
      const { checkboxValue } = this.state;

      const ids = checkboxValue.reduce((ids, value) => {
        if (value[1]) {
          ids.push(value[0]);
        }
        return ids;
      }, []);

      const activeCoordinates = [];

      coordinates.forEach((element) => {
        if (ids.indexOf(element.id) >= 0) {
          activeCoordinates.push(element);
        }
      });

      this.setState({
        coordinates: activeCoordinates,
      });
    }

    handleChangecheckedvalues = (checkboxValue) => {
      const { coordinates } = this.state;
      const ids = checkboxValue.reduce((ids, value) => {
        if (value[1]) {
          ids.push(value[0]);
        }
        return ids;
      }, []);

      const activeCoordinates = [];

      coordinates.forEach((element) => {
        if (ids.indexOf(element.id) >= 0) {
          activeCoordinates.push(element);
        }
      });

      this.setState({
        coordinates: activeCoordinates,
        checkboxValue,
      });
    }

    render() {
      const { userList, checkboxValue } = this.state;
        return (
          <div>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Paper style={{ height: 50 }}>
                  <Typography color="textSecondary">
                      Arizona Riders Association
                  </Typography>
                </Paper>
                <PaticipantList userList={userList} checkboxValue={checkboxValue} handleChangecheckedvalues={this.handleChangecheckedvalues} />
              </Grid>
              <Grid item xs={10}>
                <TabView eventid={this.props.match.params.id} coordinates={this.state.coordinates} />
              </Grid>
            </Grid>
          </div>
        );
    }
}
