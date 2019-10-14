/**
 * Author: Shaunak Shah
 * Task: Changed from using array of arrays to array of objects.
 *        And some refactoring of the code to follow ESlint standards.
 * Task no: 65
 * Date: 10/06/2019
 */

import React, { PureComponent } from 'react';
import { CanvasOverlay } from 'react-map-gl';

export default class PolylineOverlay extends PureComponent {
  redraw({
    width, height, ctx, isDragging, project}) {
      const {
       points, color = 'red', lineWidth = 2, renderWhileDragging = true,
      } = this.props;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      if ((renderWhileDragging || !isDragging) && points) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.beginPath();
        points.forEach((point) => {
          const pixel = project([point.long, point.lat]);
          ctx.lineTo(pixel[0], pixel[1]);
        });
        ctx.stroke();
      }
    }

    render() {
      return (<CanvasOverlay redraw={this.redraw.bind(this)} />);
    }
  }
