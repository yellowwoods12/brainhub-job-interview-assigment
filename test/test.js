const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../server/models/User');
const request = require('request');
const should = chai.should();
const baseUrl = 'http://localhost:8000';
const server = require('../server/server');

chai.use(chaiHttp);

describe('Test API endpoints', function() {
    this.timeout(10000);
    beforeEach(function(done) {
        User.remove({}, function(err) {
            done();
        });
    });

    describe('Endpoint POST /user', function() {
        it('Should successfuly insert User to DB', function(done) {
            let user = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@gmail.com',
                eventDate: '12-09-2018 20:33:12'
            };
            chai.request(baseUrl)
                .post('/user')
                .send(user)
                .end(function(err, res) {
                    if(err) {
                        res.send(err);
                    }
                    res.should.have.status(200);
                    
                    res.body.message.should.equal('User successfully added!').be.a('string');
                    let data = res.body.body;
                    data.should.have.property('firstName').equal(user.firstName).be.a('string');
                    data.should.have.property('lastName').equal(user.lastName).be.a('string');
                    data.should.have.property('email').equal(user.email).be.a('string');
                    data.should.have.property('eventDate').equal(user.eventDate).be.a('string');
                    done();
                });
        });
        it('Should recieve error if User\'s email already exists in DataBase', function(done) {
            let userData = {
                firstName: 'Elvis',
                lastName: 'Presley',
                email: 'elvis.presley@gmail.com',
                eventDate: '12-09-2018 21:37:13'
            };
            let user = new User({
                firstName: 'Elvis',
                lastName: 'Presley',
                email: 'elvis.presley@gmail.com',
                eventDate: '12-09-2018 21:37:13'
            });
            user.save();
            chai.request(baseUrl)
                .post('/user')
                .send(userData)
                .end(function(err, res) {
                    if(err) {
                        res.send(err);
                    }
                    res.body.should.have.property('message').equal('User email already exists!').be.a('string');
                    done();
                });
        });
        it('Should recieve errors if User\'s parameters are null', function(done) {
            let user = {
                firstName: '',
                lastName: '',
                email: '',
                eventDate: ''
            };
            chai.request(baseUrl)
                .post('/user')
                .send(user)
                .end(function(err, res) {
                    if(err) {
                        res.send(err);
                    }
                    res.should.have.status(422);
                    let errors = res.body.errors;
                    errors.splice(3, 1); // I remove error caused by invalid email syntax in order to quickly map and check only errors caused by null values
                    errors.map((error) => {
                        error.should.have.property('msg').equal(`${error.param} value is required!`).be.a('string');
                    });
                    done();
                });
        });
        it('Should recieve error if User\'s email has invalid syntax', function(done) {
            let user = {
                firstName: 'Robert',
                lastName: 'Lewandowski',
                email: 'robert.lewandowski.pl',
                eventDate: '11-09-2018 10:10:45'
            };
            chai.request(baseUrl)
                .post('/user')
                .send(user)
                .end(function(err, res) {
                    if(err) {
                        res.send(err);
                    }
                    res.should.have.status(422);
                    let error = res.body.errors.shift();
                    error.should.have.property('msg').equal('Invalid Email!').be.a('string');
                    done();
                });
        });
    });
    describe('Endpoint GET /users', function() {
        it('Should recieve empty list of users', function(done) {
            User.remove({}, function(err) {
                if(err) {
                    res.send(err);
                }
            });
            chai.request(baseUrl)
                .get('/users')
                .end(function(err, res) {
                    if(err) {
                        res.send(err);
                    }
                    res.body.length.should.be.equal(0);
                    done();
                });          
        });
        it('Should recieve 3-elements long list of users', function(done) {
            let users = [
                {
                    firstName: 'John',
                    lastName: 'First',
                    email: 'john.first@gmail.com',
                    eventDate: '11-09-2018 10:10:45'
                },
                {
                    firstName: 'John',
                    lastName: 'Second',
                    email: 'john.second@gmail.com',
                    eventDate: '11-09-2018 10:10:45'
                },
                {
                    firstName: 'John',
                    lastName: 'Third',
                    email: 'john.third@gmail.com',
                    eventDate: '11-09-2018 10:10:45'
                }
            ];
            User.insertMany(users)
                .then(function() {
                    chai.request(baseUrl)
                    .get('/users')
                    .end(function(err, res) {
                        if(err) {
                            res.send(err);
                        }
                        res.body.length.should.be.equal(users.length);
                        done();
                    });              
                });
        });
    });
});
