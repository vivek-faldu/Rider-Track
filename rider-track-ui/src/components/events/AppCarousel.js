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
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://americanpronunciationcoach.com/wp-content/uploads/1200-x-300-website-sliders-china-man.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Participante in events</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn5.identityforce.com/wp-content/uploads/2017/06/header-support-1280x570-1-1200x300.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Live Track events</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://sd41.org/wp-content/uploads/2015/09/006-3-1200x300.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Create Events</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default AppCarousel;