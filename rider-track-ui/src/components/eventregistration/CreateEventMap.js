import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';
import  { Fab } from '@material-ui/core';
import  AddIcon from '@material-ui/icons/Add';
import './CreateEventMap.css';
import Pin from './pin';

const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaHVkOXcwMnR2M2NwZHhvcTFoZjFkIn0.YC0VCzY43P5cz-nATJgb5w'; // Set your mapbox token here

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
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
        pitch: 0
      },
      marker: [{
        
        latitude: 33.4224,
        longitude: -111.9495
      },
      {
        
        latitude: 33.4223,
        longitude: -111.9496
      }],
      
      events: {}
    };
  }

  getmarker = (marker)=>{
    let self = this
    return marker.map((object,i) => {
      return  <Marker
        longitude={object.longitude}
        latitude={object.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragEnd={(event)=> self._onMarkerDragEnd(event,i)}
      >
        <Pin size={20}key = {object.key} />
      </Marker>
    })
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat
      }
    });
  }

  _onMarkerDragStart = event => {
    this._logDragEvent('onDragStart', event);
  };

  _onMarkerDrag = event => {
    this._logDragEvent('onDrag', event);
  };

  _onMarkerDragEnd = ((event,i) => {
    
    this._logDragEvent('onDragEnd', event)
    let {marker} = this.state;
    let newmarker = { 
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    }
    marker[i] = newmarker
    this.setState({
      marker
    });
  })


  onadd = () =>{ 
    let {marker} = this.state;

    let newMarkerPoint = {
      latitude: marker[0].latitude + 0.0099,
      longitude: marker[0].longitude + 0.0099
    }

    marker.push(newMarkerPoint)
    this.setState({marker})
}

  render() {
    const {viewport, marker} = this.state;

    return (
       
      <MapGL
        {...viewport}
        width="100%"
        height="400px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
        style={{padding:20}}
      >
        
        {this.getmarker(marker)}
        
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

      
      
      <div className ="control-panel">
        
        <Fab color="primary" aria-label="add" onClick = {()=>{this.onadd()}}>
        <AddIcon />
      </Fab>
      </div>
      </MapGL>

    );
  }
}
