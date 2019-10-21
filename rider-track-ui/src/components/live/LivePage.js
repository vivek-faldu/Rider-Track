import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import LiveEventMap from './LiveEventMap';

export default class LivePage extends Component {
    render() {
        return (
          <Container>
            <LiveEventMap />
          </Container>
        );
    }
}
