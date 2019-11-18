/**
 * Author: Vivek Faldu
 * Task: #48 Create a map to show moving points on map which represent the live location of participant, Create pusher service for front end.
 * Task no: 48, 71
 * Date: 09/26/2019
 */

 /**
 * Author: Shaunak Shah
 * Task: #172 Create a map to show moving points on map which represent the live location of participant, Create pusher service for front end.
 * Date: 10/16/2019
 */

import React, { Component } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';

import { Fab, Typography } from '@material-ui/core';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';


export default class LiveEventMap extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      viewport: {
        latitude: -38.05072,
        longitude: 175.63658,
        zoom: 7,
        bearing: 0,
        pitch: 20,
      },
      popupInfo: null,
      details: {},
    };
  }

  componentDidMount() {
    this.getPoints();
  }

  getStats = async (object) => {
    const lat = object.latitude;
    const long = object.longitude;
    const query = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${long},${lat}.json?layers=contour&limit=50&access_token=${MAPBOX_TOKEN}`;
    const res = await fetch(query);
      res.json()
        .then((data) => {
        const allFeatures = data.features;
        const elevations = [];
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < allFeatures.length; i++) {
            // eslint-disable-next-line no-undef
            elevations.push(allFeatures[i].properties.ele);
        }
        const highestElevation = Math.max(...elevations);
        const newObject = { ...object, elevation: highestElevation };
        this.setState({ popupInfo: newObject });
})
        .catch((err) => console.log('error in altitude api call ', err));
  }

  // function fetches the checkpoints data for the track of the particular event.
  getPoints = async () => {
    let url = 'http://localhost:4241/api/events/';
    url = url.concat(this.props.eventid);
    const res = await fetch(url);
    res.json()
      .then((result) => this.setState({
          details: result,
        }))
      .then((res) => this.setupPoints(this.state.details))
      .catch((err) => this.setState = {
        errors: err,
    });
  }

  // method to move center of the page to coordinates passed in.
  // Very important to load once the coordinates are initialized.
  // We use starting point of the track as initial center.
  goToPoint = (center) => {
    this.setState({
      viewport: {
        latitude: center[0],
        longitude: center[1],
        zoom: 11.5,
        bearing: 0,
        pitch: 0,
      },
    });
  }

  // fetch the data from mapbox api to get the detailed coordinates of the
  // track of the event. And draw the track on main map.
  fetchData = async (a, b) => {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    url = url.concat(`${a}?geometries=geojson&access_token=${MAPBOX_TOKEN}`);
    const res = await fetch(url);
    res.json()
      .then((result) => {
        this.goToPoint(b);
        const map = this.myRef.getMap();
        console.log(result.routes[0].geometry.coordinates);
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: result.routes[0].geometry.coordinates,
                  },
                },
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1DB954',
            'line-width': 3,
          },
        });
      });
  }

  // arrange the detailed coordinates in a string to be queried for mapbox api.
  setupPoints= (details) => {
    let c = 0;
    const pts = [];
    if (details.checkpoints != null) {
      let str = '';
      details.checkpoints.forEach((point) => {
        str += `${point.longitude},${point.latitude}`;
        if (details.checkpoints.length - 1 !== c) {
          str += ';';
          pts[0] = point.latitude;
          pts[1] = point.longitude;
        }
        c += 1;
      });
      this.fetchData(str, pts);
    }
  }

  _onViewportChange = (viewport) => this.setState({ viewport });

  getmarker = (coordinates) => coordinates.map((object) => (
    <Marker
      latitude={object.latitude}
      longitude={object.longitude}
      offsetLeft={-20}
      offsetTop={-10}
    >
      <Fab
        aria-label="add"
        variant="round"
        size="small"

        style={{
          backgroundColor: 'white',
          width: 42,
          height: 42,
          margin: 20,
 }}
        onClick={() => {
          this.getStats(object);
 }}
      >
        <img
          alt={object.name}
          src={object.url}
          style={{
              width: 38,
              height: 38,
              borderRadius: '90%',
         }}
        />
      </Fab>

    </Marker>
))

getpopup = () => {
  const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          {/* <CityInfo info={popupInfo} /> */}
          <div style={{ padding: 5 }}>
            <div style={{ marginBottom: 5 }}>
              <Typography
                align="left"

                color="textSecondary"
                style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}
              >
                {popupInfo.name.toUpperCase()}

              </Typography>
              <Typography
                align="left"
                style={{ fontSize: 10 }}
                color="textSecondary"
              >
                <span style={{ }}>{`${new Date().toLocaleString()}`}</span>
                <br />
                GPS:
                <span style={{ fontWeight: 'bold' }}>{` ${popupInfo.latitude}, ${popupInfo.longitude}`}</span>
                <br />
                Speed:
                <span style={{ fontWeight: 'bold' }}> 5 m/s</span>
                <br />
                Altitude:
                <span style={{ fontWeight: 'bold' }}>
                  {`${popupInfo.elevation} meter `}
                </span>
                <br />
                Distance:
                <span style={{ fontWeight: 'bold' }}> 5 km</span>

              </Typography>

            </div>

            <img width={100} height={100} alt="" src={popupInfo.url} />
          </div>

        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const { coordinates } = this.props;

    return (
      <MapGL
        ref={(map) => this.myRef = map}
        {...viewport}
        width="100%"
        height={400}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {this.getmarker(coordinates)}
        {this.getpopup()}
      </MapGL>
    );
  }
}
