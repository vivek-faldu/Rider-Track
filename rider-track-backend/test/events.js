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

/*
 * Test the /GET route to fetch all events
 */
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

/*
 * Test the /GET/:id route 
 */
describe('GET Event based on _id', () => {
    it('it should GET specific event', (done) => {
        chai.request(server)
            .get('/api/events/5da01169f05a835eba013829')
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

/*
 * Test the /GET/:id route for event that does not exist
 */
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

            "creator_id": "5db26981f77c0a1728f5e2c9",
            "event_name": "Test Event - Phoenix Marathon",
            "event_description": "Test event for development",
            "date_time": "30 Jan, 2021",
            "duration": "10 days",
            "max_participant": "150"

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
            .put('/api/events/5dade8bfa5bd276ae4938ba0')
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
            .put('/api/events/start/5dade8bfa5bd276ae4938ba0')
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
            .put('/api/events/stop/5dade8bfa5bd276ae4938ba0')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});

/**
 * Test the event deletion feature using non existant event ID
 * Author: sai saran kandimalla.
 */
describe('Delete a non existant event', () => {
    it("it should respond back with a 400 error because the event ID doesn't exist", (done) => {
        chai.request(server)
            .delete('/api/events/delete/5da0111bf05a835eba01')
            .end((error, response) => {
                response.should.have.status(400);
                //                response.body.message.should.equal("Event deletion request was unsuccessful");
                response.body.should.have.property('message');
                done();
            });
    });
});
