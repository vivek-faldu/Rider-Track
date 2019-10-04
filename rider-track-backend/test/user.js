/**
 * Author: Janani Thiagarjan
 * Task: Unit tests for api call to fetch participant's history
 * Task no: 64
 * Date: 10/04/2019
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
                //                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('event_name');
                res.body[0].should.have.property('date_time');
                res.body[0].should.have.property('duration');
                done();
            });
    });
});