/**
 * Author: Shaunak Shah
 * Task: Create basic layout of details front end for the event details page.
 * Task no: 53
 * Date: 09/26/2019
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import './EventsDetail.css';
import map from '../../assets/map.png';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventIcon from '@material-ui/icons/Event';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class EventsDetail extends React.Component {
    render(){
        return (
            <Grid container className="event_layout" direction="row">
                <Grid item md={12} lg={4} direction="column" className="event_info_column" container>
                    <Grid item><h4>Arizona Runs</h4></Grid>
                    <Grid item direction="row" justify="flex-start" container>
                        <Grid item><p>Organized by: SunDevil Group</p></Grid>
                    </Grid>
                    <Grid item container className="event_info_bar" direction="row" justify="space-around" alignItems="center">
                        <Grid item><AvTimerIcon/><p> 5 Days</p></Grid>
                        <Grid item><EventIcon /><p>1 January, 2020</p></Grid>
                        <Grid item><PeopleIcon /><p>120</p></Grid>
                    </Grid>

                    <div item className="participants_list">
                        <h6 align="left">Participants</h6>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Pava"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Saran"/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Shilpa"/>
                            </ListItem>
                        </List>
                    </div>
                </Grid>
                <div className="event_detail_map">
                    <Grid item md={12} lg={8}><img className="map_image" img src={map} alt="map" height="700"/></Grid>
                </div>

            </Grid>
        );
    }
}

export default EventsDetail;
