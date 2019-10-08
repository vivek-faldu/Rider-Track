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
            .get('/api/user/5d93b7d31c9d440000909462/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('event_name');
                res.body[0].should.have.property('date_time');
                res.body[0].should.have.property('duration');
                done();
            });
    });
});

describe('GET List of Checkpoints for an event a participant took part in', () => {
    it('it should GET all the checkpoints and event details for an event', (done) => {
        chai.request(server)
            .get('/api/user/5d93b7d31c9d440000909462/eventdetail?eventId=5d81d95a0b52a97535d59b56')
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