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