/**
 * Author: Shaunak Shah
 * Task: Create common header for all the pages.
 * Task no: 44
 * Date: 09/20/2019
 */

import React from 'react';

import {AppBar,Button,IconButton,Toolbar} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <AppBar position="static">
                    <Toolbar>
                        <Grid direction="row" container spacing={2}>
                            <Grid item justify="center">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    Rider Track
                                </IconButton>
                            </Grid>
                            <Grid item justify="flex-end" xs={12} sm container>
                                <Button color="inherit">Home</Button>
                                <Button color="inherit">Organizers</Button>
                                <Button color="inherit">About</Button>
                                <Button color="inherit">Login</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default Header;