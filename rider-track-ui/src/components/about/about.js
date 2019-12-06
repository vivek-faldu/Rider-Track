import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import './about.css';
import Janani from '../../assets/Janani.jpg';
import Sai from '../../assets/saran.jpg';
import Shilpa from '../../assets/Shilpa.PNG';
import Shaunak from '../../assets/Shaunak.jpg';
import Vivek from '../../assets/vivek.JPG';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/Card';
import group from '../../assets/group.jpg';
import bulletin from '../../assets/bulletin.png';
const useStyles = makeStyles({
    card: {
        margin: 40,
        width: 220,
        // height: 220,
    },
    media: {
        height: 100,
        paddingTop: '56.25%', // 16:9
    },
    // expand: {
    //     transform: 'rotate(0deg)',
    //     marginLeft: 'auto',
    //     transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //     }),
    // },
    // expandOpen: {
    //     transform: 'rotate(180deg)',
    // },
    bigAvatar: {
        margin: 40,
        width: 220,
        height: 220,
    },
    bigAvatar1: {
        // margin: 40,
        width: 220,
        height: 190,
    },

});

export default function About() {

    const classes = useStyles();

    return (
        <Card className="aboutCard">
            <div className="row justify-content-left">
                <h1 className="headerTitle">About us</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <p className="aboutUsText">
                        We are a team of software engineering graduate students from Arizona State University. We chose rider track as a capstone project
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type */}
                    </p>
                    <br></br>
                    <p className="aboutUsText">Our enthusiasm about outdoor activities and passion in creating modern web applications has led us to create RiderTrack. We aim to create useful web application</p>
                </div>
                <div className="col-6">
                    <Card className="groupPic">
                        <Avatar aria-label="recipe" src={bulletin} className="avatarPin">
                        </Avatar>
                        <img className="card-img-top" img src={group}></img>
                    </Card>
                </div>
            </div>
            <br>
            </br>
            <div className="row justify-content-center subSection">
                <div className="col-2 ruleDiv">
                    <hr className="rule"></hr>
                </div>
                <div className="col-3 meetTeam">
                    <h2>Meet the team</h2>
                </div>
                <div className="col-2 ruleDiv">
                    <hr className="rule"></hr>
                </div>
            </div>
            {/* <Grid container justify="center" alignItems="center">
                <Avatar alt="Janani Thiagarajan" src={Janani} className={classes.bigAvatar} />
                <Avatar alt="Sai Saran Kandimalla" src={Sai} className={classes.bigAvatar} />
                <Avatar alt="Shilpa Bhat" src={Shilpa} className={classes.bigAvatar} />
                <Avatar alt="Shaunak Shah" src={Shaunak} className={classes.bigAvatar} />
                <Avatar alt="Vivek Faldu" src={Vivek} className={classes.bigAvatar} />
            </Grid> */}
            <div className="row" container justify="center" alignItems="center">
                {/* <div class="col-12"> */}
                <div class="col-3">
                    <div className="row">
                        {/* 
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
          </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title="Shrimp and Chorizo Paella"
                                subheader="September 14, 2016"
                            />
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/paella.jpg"
                                title="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
                            </CardContent>
                        </Card> */}



                        <Card className={classes.card}>
                            <CardHeader title="Janani Thiagarajan" />
                            <CardMedia className="media">
                                <Avatar style={{ borderRadius: 0 }} alt="Janani Thiagarajan" src={Janani} className={classes.bigAvatar1} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Janani is a Software Engineering graduate student at Arizona State University. She has a bachelor’s degree in Computer Science from SASTRA university
                                 </Typography>
                            </CardContent>

                        </Card>

                    </div>
                </div>
                <hr className="rule1 col-1 align-self-center"></hr>
                {/* <div class="col-3">
                    <Avatar alt="Sai Saran Kandimalla" src={Sai} className={classes.bigAvatar} />
                </div> */}
                <Card className={classes.card}>
                    <CardHeader title="Sai Saran Kandimalla" />
                    <CardMedia className="media">
                        <Avatar style={{ borderRadius: 0 }} alt="Sai Saran Kandimalla" src={Sai} className={classes.bigAvatar1} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Sai Saran is a Software Engineering graduate student at Arizona State University. He has a bachelor’s degree in Electrical Engineerig from GITAM University

                                 </Typography>
                    </CardContent>

                </Card>
                <hr className="rule1 col-1 align-self-center"></hr>
                {/* <div class="col-3">
                    <Avatar alt="Shilpa Bhat" src={Shilpa} className={classes.bigAvatar} />
                </div> */}
                <Card className={classes.card}>
                    <CardHeader title="Shilpa Gajanan Bhat" />
                    <CardMedia className="media">
                        <Avatar style={{ borderRadius: 0 }} alt="Shilpa Bhat" src={Shilpa} className={classes.bigAvatar1} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Shilpa is a Software Engineering graduate student at Arizona State University. She has a bachelor’s degree in Computer Science from Visvesvaraya Technological University
                                 </Typography>
                    </CardContent>

                </Card>
            </div>
            <div class="row justify-content-center">
                {/* <div className="col-10"> */}
                <div class="col-2">
                    {/* <Avatar alt="Janani Thiagarajan" src={Janani} className={classes.bigAvatar} /> */}
                </div>
                {/* <div class="col-3 justify-self-center">
                    <Avatar alt="Shaunak Shah" src={Shaunak} className={classes.bigAvatar} />
                </div> */}
                <Card className={classes.card}>
                    <CardHeader title="Shaunak Shah" />
                    <CardMedia className="media">
                        <Avatar style={{ borderRadius: 0 }} alt="Shaunak Shah" src={Shaunak} className={classes.bigAvatar1} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Shaunak is a Software Engineering graduate student at Arizona State University. He has a bachelor’s degree in Computer Science from BITS.

                                 </Typography>
                    </CardContent>

                </Card>
                <hr className="rule1 col-1 align-self-center"></hr>
                {/* <div class="col-3">
                    <Avatar alt="Vivek Faldu" src={Vivek} className={classes.bigAvatar} />
                </div> */}
                <Card className={classes.card}>
                    <CardHeader title="Vivek Faldu"> <br></br>
                    </CardHeader>
                    <CardMedia className="media">
                        <Avatar style={{ borderRadius: 0 }} alt="Vivek Faldu" src={Vivek} className={classes.bigAvatar1} />
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Vivek is a Software Engineering graduate student at Arizona State University. He has a bachelor’s degree in Computer Science from MS university.

                                 </Typography>
                    </CardContent>

                </Card>
                <div class="col-2">
                    {/* <Avatar alt="Janani Thiagarajan" src={Janani} className={classes.bigAvatar} /> */}
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
        </Card >

    );

}