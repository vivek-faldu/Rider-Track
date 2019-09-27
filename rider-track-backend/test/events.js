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
            .get('/api/events/5d81d95a0b52a97535d59b55')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('event_name');
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
                // res.body.should.have.property('event_name');
                // res.body.should.have.property('creator_id');
                // res.body.should.have.property('date_time');
                // res.body.should.have.property('duration');
                // res.body.should.have.property('max_participant');
                // res.body.should.have.property('checkpoints');
                // res.body.should.have.property('participants');
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
            "event_name": "test runs",
            "date_time": "1 Jan, 2022",
            "duration": "1 day",
            "max_participant": "200"

        }
        chai.request(server)
            .post('/api/events/add')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    })
});