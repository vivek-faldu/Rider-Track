/**
 * Author: Shaunak Shah
 * Task: Changed from static view to dynamically using the coordinates
 *        provided by parent component.
 * Task no: 66
 * Date: 10/05/2019
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
        zoom: 13,
        bearing: 0,
        pitch: 0,
      },
    });
  }
  async function fetchData(a, b, c) {
    let url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/';
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
            'line-color': 'black',
            'line-width': 8,
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
        pts[0] = point.lat;
        pts[1] = point.long;
        str += `${point.long},${point.lat}`;
        if (props.coordinate.length - 1 !== c) {
          str += ';';
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
