/**
 * Author: Shaunak Shah
 * Task: Fixed lat and long to match with the backend data that we are getting.
 * Task no: 82
 * Date: 10/10/2019
 */

import React, { useEffect, useRef } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import './EventsDetail.css';
import PolylineOverlay from './PolyLineOverlay';

function EventDetailMap(props) {
  // set inital state of the page.
  const [state, setState] = React.useState({
    viewport: {
      latitude: 0,
      longitude: 0,
      zoom: 2,
      bearing: 0,
      pitch: 0,
    },
  });
  let reactMap = useRef(null);

  // method to update the viewport as dragged on screen.
  const updateViewport = (viewport) => {
    setState({ viewport });
  };

  // method to move center of the page to coordinates passed in.
  // Very important to load once the coordinates are initialized.
  // We use starting point of the track as initial center.
  function goToPoint(center, route) {
    setState({
      coord: route,
      viewport: {
        latitude: center[0],
        longitude: center[1],
        zoom: 11.5,
        bearing: 0,
        pitch: 0,
      },
    });
  }
  async function fetchData(a, b, c) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
    url = url.concat(`${a}?geometries=geojson&access_token=${TOKEN}`);
    const res = await fetch(url);
    res.json()
      .then((result) => {
        goToPoint(b, result.routes);

        const map = c.getMap();
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: result.routes[0].geometry.coordinates,
              },
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

  useEffect(() => {
    const pts = [];
    let c = 0;
    if (props.coordinate != null) {
      let str = '';
      props.coordinate.forEach((point) => {
        str += `${point.longitude},${point.latitude}`;
        if (props.coordinate.length - 1 !== c) {
          str += ';';
          pts[0] = point.latitude;
          pts[1] = point.longitude;
        }
        c += 1;
      });
      fetchData(str, pts, reactMap);
    }
  }, [props.coordinate]);

  const TOKEN = 'pk.eyJ1Ijoidml2ZWtmYWxkdSIsImEiOiJjazBzaGI1aGMwMm1hM2hwZDY5Zmc0OHd5In0.I2EViz8YDQwXvwW_38Oujg';
  return (
    <MapGL
      ref={(map) => reactMap = map}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...state.viewport}
      width="100%"
      height="500px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={updateViewport}
      mapboxApiAccessToken={TOKEN}
      style={{ padding: 10 }}
    >

      <div className="detail_map_frame">
        <NavigationControl onViewportChange={updateViewport} />
      </div>

    </MapGL>
  );
}

export default EventDetailMap;
