/**
 * Author: Shaunak Shah
 * Task: Fix and set code style for tasks to follow eslint.
 * Task no: 44, 53
 * Date: 09/26/2019
 */

import React from 'react';
import './Header.css';

import { Button, Dialog } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import AddBox from '@material-ui/icons/AddBox';
import Room from '@material-ui/icons/Room';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import Login from '../authentication/Login';

function Header() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container alignItems="center" className="country_bar">
        <Grid item lg={10} />
        <Hidden mdDown><Grid intem lg={2}><p>United States</p></Grid></Hidden>
      </Grid>
      <Grid container alignItems="center" justify="center" className="nav_bar">
        <Grid md={12} lg={2} item>
          <Button className="home_button">Rider Track</Button>
        </Grid>
        <Grid item md={12} lg={8} r>
          <Button className="menu_button" color="inherit">Home</Button>
          <Button className="menu_button" color="inherit">Organizers</Button>
          <Button className="menu_button" color="inherit">My Events</Button>
          <Button className="menu_button" color="inherit">About</Button>
          <Button className="menu_button" color="inherit" onClick = {handleClickOpen}>Login</Button>
          <Dialog
            open={open} 
            onClose={handleClose} 
            aria-labelledby="rt-form-dialog-title"
          >
            <Login />
          </Dialog>
          <Button className="menu_button" color="inherit">Sign Up</Button>
        </Grid>
        <Hidden smDown>
          <Grid container alignment="center" justify="center" md={12} lg={2} spacing={3}>
            <Grid item>{<Person />}</Grid>
            <Grid item>{<AddBox />}</Grid>
            <Grid item>{<Room />}</Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Grid container alignItems="center" className="info_bar">
        <Grid item xs={12}>
          <Hidden smDown>
            <p>
              ORGANIZE, PARTICIPATE, TRACK AND SHARE EVENTS! VISUALIZE THE EVENTS AS THEY TAKE PLACE
            </p>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}


export default withWidth()(Header);
