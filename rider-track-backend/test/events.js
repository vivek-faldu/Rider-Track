/**
 * Author: Janani Thiagarjan
 * Author: Shilpa Bhat
 * Task: Unit tests for api calls
 * Task no: 45,46,47,
 * Date: 09/26/2019
 */
let mongoose = require("mongoose");
let Event = require('../models/events');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('GET List of Events', () => {
    it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/api/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('event_name');
                //res.body[0].should.have.property('event_description');
                res.body[0].should.have.property('creator_id');
                res.body[0].should.have.property('date_time');
                res.body[0].should.have.property('duration');
                res.body[0].should.have.property('max_participant');
                res.body[0].should.have.property('checkpoints');
                res.body[0].should.have.property('participants');
                done();
            });
    });
});

describe('GET Event based on _id', () => {
    it('it should GET specific event', (done) => {
        chai.request(server)
            .get('/api/events/5da0111bf05a835eba01381d')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('event_name');
                //res.body[0].should.have.property('event_description');
                res.body.should.have.property('creator_id');
                res.body.should.have.property('date_time');
                res.body.should.have.property('duration');
                res.body.should.have.property('max_participant');
                res.body.should.have.property('checkpoints');
                res.body.should.have.property('participants');
                done();
            });
    });
});

describe('GET Event based on _id', () => {
    it('it should give error since the id doesnt exist', (done) => {
        chai.request(server)
            .get('/api/events/random')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

/*
 * Test the /POST route
 */
describe('Create a new event', () => {
    it('it should POST an event', (done) => {
        let event = {

            "creator_id": "100",
            "event_name": "Phoenix Marathon",
            "event_description": "Test event for development",
            "date_time": "1 Jan, 2021",
            "duration": "1 day",
            "max_participant": "200"

        }
        chai.request(server)
            .post('/api/events/')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});

/*
 * Test the /PUT route
 */
describe('Register user for an event', () => {
    it('it should register a user', (done) => {
        let event = {
            "userId": "5d9c0e1320132148b87762fd",
            "name": "test participant"
        }
        chai.request(server)
            .put('/api/events/5da0111bf05a835eba01381d')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});

/*
 * Test the start event route
 */
describe('Start an event', () => {
    it('it should change the status of the event to live and change live_event field for all registered users', (done) => {
        let event = {
            "userId": "5d9c0e1320132148b87762fd",
            "name": "test participant"
        }
        chai.request(server)
            .put('/api/events//start/5da0111bf05a835eba01381d')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});

/*
 * Test the stop event route
 */
describe('Stop an event', () => {
    it('it should change status of the event and change live_event for all users', (done) => {
        let event = {
            "userId": "5d9c0e1320132148b87762fd",
            "name": "test participant"
        }
        chai.request(server)
            .put('/api/events/stop/5da0111bf05a835eba01381d')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});