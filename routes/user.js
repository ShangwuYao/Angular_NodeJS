var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');
// creating a user
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // you should always encrypt then password
        // use bcryptjs
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Successfully created user',
            obj: result
        });
    });
});

module.exports = router;