/**
 * Author: Vivek Faldu
 * Task: Create event map
 * Task no: 43
 * Date: 09/25/2019
 */

import React, { Component } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Pin from './pin';
import './CreateEventMap.css';

const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px',
};

export default class CreateEventMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 33.4224,
        longitude: -111.9495,
        zoom: 15,
        bearing: 0,
        pitch: 0,
      },
      marker: [{

        latitude: 33.4224,
        longitude: -111.9495,
      },
      {

        latitude: 33.4223,
        longitude: -111.9496,
      }],
    };
  }

  getmarker = (marker) => {
    const self = this;
    return marker.map((object, i) => (
      <Marker
        longitude={object.longitude}
        latitude={object.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        // eslint-disable-next-line no-underscore-dangle
        onDragEnd={(event) => self._onMarkerDragEnd(event, i)}
      >
        <Pin size={20} />
      </Marker>
    ));
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  _onMarkerDragEnd = ((event, i) => {
    const { marker } = this.state;
    const newmarker = {
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    };
    marker[i] = newmarker;
    this.setState({
      marker,
    });
  })


  onadd = () => {
    const { marker } = this.state;
    const newMarkerPoint = {
      latitude: marker[0].latitude + 0.0099,
      longitude: marker[0].longitude + 0.0099,
    };
    marker.push(newMarkerPoint);
    this.setState({ marker });
  }

  render() {
    const { viewport, marker } = this.state;
    return (
      <MapGL
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        // eslint-disable-next-line no-underscore-dangle
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
        style={{ padding: 20 }}
      >

        {this.getmarker(marker)}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>


        <div className="add-btn">

          <Fab color="primary" aria-label="add" onClick={() => { this.onadd(); }}>
            <AddIcon />
          </Fab>
        </div>
      </MapGL>

    );
  }
}
