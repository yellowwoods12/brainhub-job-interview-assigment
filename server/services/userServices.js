const User = require('../models/User');
const { validationResult } = require('express-validator/check');

function insertUser(req, res) {
    console.log(req.body);
    req.check('firstName', 'First name value is required!').notEmpty();
    req.check('lastName', 'Last name value is required!').notEmpty();
    req.check('email', 'Email value is required!').notEmpty();
    req.check('email', 'Invalid Email!').isEmail();
    req.check('eventDate', 'Event Date is required!').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        return res.status(422).json({ errors: errors });
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
}

module.exports = {
    insertUser
};
