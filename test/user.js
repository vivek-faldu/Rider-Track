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
 * 
 * Task: Unit tests for api call to update user profile
 * Task no: 149
 * Date: 11/05/2019
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
            .get('/api/user/events?userid=5d96e4e1e78f0b615d85cf34')
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
            .get('/api/user/eventdetail?eventid=5db26498b3cbfb4946b135db&userid=5db266c7f77c0a1728f5e2c4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('event_name');
                //res.body.should.have.property('event_description');
                res.body.should.have.property('date_time');
                res.body.should.have.property('duration');
                res.body.should.have.property('checkpoints');
                res.body['checkpoints'][0].should.have.property('latitude');
                res.body['checkpoints'][0].should.have.property('longitude');
                res.body['checkpoints'][0].should.have.property('timestamp');
                done();
            });
    });
});

describe('PUT User Profile', () => {
    it('it should save details related to a user profile', (done) => {
        let user = {
            "email": "TestUser1@test.com",
            "username": "Test User 1"
        }
        chai.request(server)
            .put('/api/user/profile/5dc0fd9ac31f236658ab1b51')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});