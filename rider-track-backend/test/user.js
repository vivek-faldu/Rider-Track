/**
 * Author: Janani Thiagarjan
 * Task: Unit tests for api call to fetch participant's history
 * Task no: 64
 * Date: 10/04/2019
 * 
 * Task: Unit tests for api call to fetch participant's history for specific event
 * Task no: 83
 * Date: 10/07/2019
 * 
 */
let mongoose = require("mongoose");
let Event = require('../models/events');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('GET List of Events for a participant', () => {
    it('it should GET all the events  for a participant', (done) => {
        chai.request(server)
            .get('/api/user/events?userid=5d93b7d31c9d440000909462')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('participated_events');
                res.body['participated_events'][0].should.have.property('event_name');
                res.body['participated_events'][0].should.have.property('date_time');
                res.body['participated_events'][0].should.have.property('duration');
                done();
            });
    });
});

describe('GET List of Checkpoints for an event a participant took part in', () => {
    it('it should GET all the checkpoints and event details for an event', (done) => {
        chai.request(server)
            .get('/api/user/eventdetail?eventid=5da0111bf05a835eba01381d&userid=5d96e4e1e78f0b615d85cf34')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('event_name');
                //res.body.should.have.property('event_description');
                res.body.should.have.property('date_time');
                res.body.should.have.property('duration');
                res.body.should.have.property('checkpoints');
                res.body['checkpoints'][0].should.have.property('lat');
                res.body['checkpoints'][0].should.have.property('long');
                res.body['checkpoints'][0].should.have.property('timestamp');
                done();
            });
    });
});