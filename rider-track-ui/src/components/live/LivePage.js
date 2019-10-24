import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TabView from './TabView';
import PaticipantList from './ParticipantList';

// eslint-disable-next-line react/prefer-stateless-function
export default class LivePage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        userList: [],
      };
    }

    async componentDidMount() {
      let url = 'http://localhost:4241/api/events/';
      url = url.concat(this.props.match.params.id);

      const res = await fetch(url);
      res.json()
        .then((result) => this.setState({ userList: result.participants }))
        .catch((err) => console.log('error in live page ', err));
    }

    render() {
      const { userList } = this.state;
        return (
          <div>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Paper style={{ height: 50 }}>
                  <Typography color="textSecondary">
                      Arizona Riders Association
                  </Typography>
                </Paper>
                <PaticipantList userList={userList} />
              </Grid>
              <Grid item xs={10}>
                <TabView eventid={this.props.match.params.id} />
              </Grid>
            </Grid>
          </div>
        );
    }
}
