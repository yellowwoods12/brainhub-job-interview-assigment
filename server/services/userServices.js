const User = require('../models/User');

function insertUser(req, res) {

    req.check('firstName', 'firstName value is required!').notEmpty();
    req.check('lastName', 'lastName value is required!').notEmpty();
    req.check('email', 'email value is required!').notEmpty();
    req.check('email', 'Invalid Email!').isEmail();
    req.check('eventDate', 'eventDate value is required!').notEmpty();
    
    let errors = req.validationErrors();

    if (errors) {
        return res.status(422).json({ errors: errors });
    } else {
        User.findOne({ email: req.body.email }, (err, user) => {
            if(user !== null) {
                res.json({
                    message: 'User email already exists!'
                })
            } else {
                let user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    eventDate: req.body.eventDate
                });
                user.save((err) => {
                    if(err) {
                        res.send(err);
                    }
                    res.json({
                        message: 'User successfully added!',
                        body: user
                    });
                });
            }
        });    
    }
}

function getUsers(req, res) {
    User.find((err, users) => {
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
}

module.exports = {
    insertUser,
    getUsers
};
