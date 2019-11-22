import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ABOUT_US, EVENT_CREATION_PATH } from '../../RouteConstants';

/**
 * Basic carousel to display on the home page. 
 * Author: Sai Saran Kandimalla
 * Date: 11/201/2019
 * Task: #185
 * Referred from: https://react-bootstrap.github.io/components/carousel/
 */
class AppCarousel extends Component {

    constructor(props) {
        super(props);
    }

    jumpToEventsList = () => {
        window.scrollTo(1500, 1500);
        window.focus();
    }

    redirectToCreateEvent = () => {
        this.props.history.push(EVENT_CREATION_PATH);
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        if (newProps.authentication) {
            this.setState({
                isLoggedIn: newProps.authentication.isAuthenticated,
            });
        }
    }

    render() {
        return (
            <Carousel className="carousel-rt">
                <Carousel.Item className="rt-carousel-img-1">
                    <div className="d-block w-100">
                    <div className="row">
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-5">
                                <div class="jumbotron carousel-banner">
                                    <h2>PARTICIPATE IN EVENTS!</h2>
                                    <p className="lead">
                                        checkout various events happening round the world. 
                                        follow athletic events that you find interesting.
                                    </p>
                                    <p className="lead">
                                        <button 
                                            className="btn btn-primary" 
                                            role="button"
                                            onClick={this.jumpToEventsList}
                                        >
                                            Browse Events
                                        </button>
                                    </p>
                                </div>
                                <div className="col-md-1" />
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="rt-carousel-img-2">
                    <div className="d-block w-100">
                    <div className="row">
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-5">
                                <div class="jumbotron carousel-banner">
                                    <h2>ADMINISTRATE EVENTS!</h2>
                                    <p className="lead">
                                        Become one of our rider track events organizer to create
                                        and organise athletic events. 
                                    </p>
                                    {this.props.authentication.isAuthenticated && this.props.authentication.user.is_admin?
                                    (<p className="lead">
                                        <button 
                                            className="btn btn-primary" 
                                            role="button"
                                            onClick={this.redirectToCreateEvent}
                                        >
                                            Create Event
                                        </button>
                                    </p>
                                    ):(
                                        null
                                    )}
                                </div>
                                <div className="col-md-1" />
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="rt-carousel-img-1">
                    <div className="d-block w-100">
                    <div className="row">
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-5">
                                <div class="jumbotron carousel-banner">
                                    <h2>FOLLOW EVENT PROGRESS!</h2>
                                    <p className="lead">
                                        track each athletic events and the leaderboard to know about the performance
                                        of each event participant with real time location data.
                                    </p>
                                </div>
                                <div className="col-md-1" />
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        );
    }
}

AppCarousel.PropTypes = {
    authentication: PropTypes.object.isRequired,
};

const mapState = (state) => ({
    authentication: state.authentication,
    errors: state.errors,
});

export default connect(mapState)(withRouter(AppCarousel));