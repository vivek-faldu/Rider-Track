/**
 * Author: Vivek Faldu
 * Task: #48 Create a map to show moving points on map which represent the live location of participant, Create pusher service for front end.
 * Task no: 48, 71
 * Date: 09/26/2019
 */

import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import Pusher from 'pusher-js';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';
const pusher = new Pusher('d3d42763648c6c9ca5d4', {
  cluster: 'us3',
  forceTLS: true,
});

export default class LiveEventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [{ lat: 33.42, long: -111.94 }, { lat: 33.42, long: -111.93 }],
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
    this.initPusher();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe = () => {
    pusher.unsubscribe('my-rider-tracker');
  }

  initPusher = () => {
    const channel = pusher.subscribe('my-rider-tracker');
    channel.bind('my-event', (data) => {
      this.updateMarker(data.coordinates);
    });
  }

  updateMarker = (coordinates) => {
    this.setState({
      coordinates,
    });
  }

  _onViewportChange = (viewport) => this.setState({ viewport });

  getmarker = (coordinates) => coordinates.map((object) => (
    <Marker
      latitude={object.lat}
      longitude={object.long}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <img src="http://29diner.com/wp-content/uploads/2015/02/google-map-marker.png" alt="" width="20" height="20" />
    </Marker>
))

  render() {
    const { viewport } = this.state;
    const {
      coordinates,
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
        {this.getmarker(coordinates)}
      </MapGL>
    );
  }
}
