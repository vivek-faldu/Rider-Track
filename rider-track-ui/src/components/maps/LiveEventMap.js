/**
 * Author: Vivek Faldu
 * Task: Create a map to show moving points on map which represent the live location of participant
 * Task no: 48
 * Date: 09/26/2019
 */


import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';

export default class LiveEventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 33.42,
      long: -111.94,
      lat1: 33.42,
      long1: -111.94,
      viewport: {
        latitude: 33.42,
        longitude: -111.94,
        zoom: 15,
        bearing: 0,
        pitch: 20,
      },
    };
  }


  componentDidMount() {
    setInterval(() => {
      this.updateMarker();
    }, 100);
  }


  // eslint-disable-next-line react/sort-comp
  updateMarker = () => {
    let {
      lat, long, lat1, long1,
    } = this.state;
    console.log(lat1, long1);
    lat += _.random(0.0, 0.00001, true);
    long -= _.random(0.0, 0.00001, true);
    lat1 -= _.random(0.0, 0.00001, true);
    long1 += _.random(0.0, 0.00001, true);
    if (lat > 85 && long < -160) {
      lat = 33;
      long = -111;
    }
    if (lat1 < -80 && long1 > 10) {
      lat1 = 33;
      long1 = -111;
    }
    this.setState({
      lat, long, lat1, long1,
    });
  }

  _onViewportChange = (viewport) => this.setState({ viewport });


  getmarker = (lat, long, lat1, long1) => [<Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
    <img src="http://29diner.com/wp-content/uploads/2015/02/google-map-marker.png" alt="" width="20" height="20" />
  </Marker>,

    <Marker latitude={lat1} longitude={long1} offsetLeft={-20} offsetTop={-10}>
      <img src="http://29diner.com/wp-content/uploads/2015/02/google-map-marker.png" alt="" width="20" height="20" />
    </Marker>]

  render() {
    const { viewport } = this.state;
    const {
      lat, long, lat1, long1,
    } = this.state;
    return (

      <MapGL
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        // eslint-disable-next-line no-underscore-dangle
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {this.getmarker(lat, long, lat1, long1)}
      </MapGL>
    );
  }
}
