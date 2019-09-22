/**
 * Author: Shaunak Shah
 * Task: Create styles for the header for better interface.
 * Task no: 44
 * Date: 09/22/2019
 */

import React from 'react';
import './Header.css';

import {AppBar,Button,IconButton,Toolbar} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import AddBox from '@material-ui/icons/AddBox';
import Room from '@material-ui/icons/Room';

class Header extends React.Component {
    render() {
        return (
            <div>

                <Grid container alignItems="center" className="country_bar">
                    <Grid item lg={10}></Grid>
                    <Grid intem lg={2}><p>United States</p></Grid>
                </Grid>

                <Grid container alignItems="center" className="nav_bar">
                        <Grid xs={2} item>
                            <Button color="inherit" className="home_button">Rider Track</Button>
                        </Grid>
                        <Grid item xs={8}r>
                            <Button className="menu_button" color="inherit">Home</Button>
                            <Button className="menu_button" color="inherit">Organizers</Button>
                            <Button className="menu_button" color="inherit">About</Button>
                            <Button className="menu_button" color="inherit">Login</Button>
                        </Grid>
                        <Grid container alignment="center" justify="center" xs={2} spacing={3}>
                            <Grid item>{<Person />}</Grid>
                            <Grid item>{<AddBox />}</Grid>
                            <Grid item>{<Room />}</Grid>
                        </Grid>
                </Grid>
                <Grid container alignItems="center" className="info_bar">
                    <Grid item xs={12}>
                        <p>ORGANIZE, PARTICIPATE, TRACK AND SHARE EVENTS! VISUALIZE THE EVENTS AS THEY TAKE PLACE</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default Header;