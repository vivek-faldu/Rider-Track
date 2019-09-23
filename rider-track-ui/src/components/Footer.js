/**
 * Author: Shaunak Shah
 * Task: Add style to the footer and compatibility for small screens.
 * Task no: 44
 * Date: 09/22/2019
 */

import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import './Footer.css'
import {Button} from "@material-ui/core";
import Hidden from '@material-ui/core/Hidden';

class Footer extends React.Component {
    render(){

        return (
            <Grid container alignItems="center" className="bottom">
                <Hidden mdDown>
                    <Grid container item md={4} direction="column" justify="center" alignItems="center">
                        <Grid item md={3}><Button className="footer_button" color="inherit">Home</Button></Grid>
                        <Grid item md={3}><Button className="footer_button" color="inherit">ORGANIZERS</Button></Grid>
                        <Grid item md={3}><Button className="footer_button" color="inherit">ABOUT</Button></Grid>
                        <Grid item md={3}><Button className="footer_button" color="inherit">LOGIN</Button></Grid>
                    </Grid>
                </Hidden>
                <Grid item md={4} container direction="row" justify="space-between" alignItems="center">
                    <Grid  md={3} className="quick_actions"><FolderIcon /></Grid>
                    <Grid  md={3} className="quick_actions"><RestoreIcon /></Grid>
                    <Grid  md={3} className="quick_actions"><FavoriteIcon /></Grid>
                    <Grid  md={3} className="quick_actions"><LocationOnIcon /></Grid>
                </Grid>
                <Hidden mdDown>
                    <Grid item md={4} container direction="column" justify="center" alignItems="center">
                        <Grid item><Button className="footer_button" color="inherit">Facebook</Button></Grid>
                        <Grid item><Button className="footer_button" color="inherit">Twitter</Button></Grid>
                        <Grid item><Button className="footer_button" color="inherit">Instgram</Button></Grid>
                        <Grid item><Button className="footer_button" color="inherit">Youtube</Button></Grid>
                    </Grid>
                </Hidden>
            </Grid>
        );
    }
}

export default Footer;
