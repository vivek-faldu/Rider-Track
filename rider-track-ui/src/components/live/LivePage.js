import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TabView from './TabView';
import PaticipantList from './ParticipantList';

// eslint-disable-next-line react/prefer-stateless-function
export default class LivePage extends Component {
    render() {
        return (
          <div>

            <Grid container spacing={1}>

              <Grid item xs={3}>
                <Paper style={{ height: 50 }}>
                  <Typography variant="h6" color="textSecondary">Arizona Riders Association</Typography>
                </Paper>
                <PaticipantList />
              </Grid>
              <Grid item xs={9}>
                <TabView />
              </Grid>
            </Grid>
          </div>
        );
    }
}
