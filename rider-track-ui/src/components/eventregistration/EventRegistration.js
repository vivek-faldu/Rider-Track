/**
 * Author: Shilpa Bhat
 * Task: Register event
 * Task no: 84
 * Date: 09/25/2019
 */

import React, { Component } from 'react';
import { axios } from 'axios';

export default class EventRegistration extends Component {

    registerHandler = () => {
        console.log("in event handler");
        const eventRegisterBody = {
            userId: "5d9c0e1320132148b87762fd",
            name: "new participant testss"
        }
        fetch('http://localhost:4241/api/events/5d81d95a0b52a97535d59b58', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: "5d9c0e1320132148b87762fd",
                name: "new participant testss"
            }),
        });
    };
}
