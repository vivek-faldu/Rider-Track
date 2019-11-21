import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';

/**
 * Basic carousel to display on the home page. 
 * Author: Sai Saran Kandimalla
 * Date: 11/201/2019
 * Task: #185
 * Referred from: https://react-bootstrap.github.io/components/carousel/
 */
class AppCarousel extends Component {

    render() {
        return (
            <Carousel className="carousel-rt">
                <Carousel.Item className="rt-carousel-img-1">
                    <div className="d-block w-100">
                        <p>Slide 1</p>
                        <Carousel.Caption>
                            <h3>Participate in events</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="rt-carousel-img-2">
                    <div className="d-block w-100">

                        <Carousel.Caption>
                            <h3>Track Live events</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item className="rt-carousel-img-1">
                    <div className="d-block w-100">
                        <Carousel.Caption>
                            <h3>Create Events</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default AppCarousel;