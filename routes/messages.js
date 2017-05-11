var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

// again, invisible #/messsage
// fetch the messages from database
router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName') // add user message to the front end
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success!',
                obj: messages
            });
        });
});

// authentication
// why "use", it means on each request, this is reached
router.use('/', function (req, res, next) {
    // token is a query parameter, like: /...?token=slfkjlewf
    // is it a valid token?
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        // it could continue to reach to the url that it matches
        next();
    })
});

// have invisible #/message before
// insert a message into the database
router.post('/', function (req, res, next) {
    // retrieve user from token, token could be decrypted
    // while password can't
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        var message = new Message({
            // if it is text/plain, then it has no property content, and will thus cause an error
            content: req.body.content,
            user: user
        });
        message.save(function(err, result){
            // if there is error, return
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            // no need to return here
            res.status(201).json({
                message: 'Successfully saved the message',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'Message not found'}
            });
        }
        // check if message is created by this user
        // message.user here is only id, not the entire user object
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.save(function (err, result) {
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            // no need to return here
            res.status(200).json({
                message: 'Successfully updated the message',
                obj: result
            });
        })
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'Message not found'}
            });
        }
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        message.content = req.body.content;
        message.remove(function (err, result) {
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            // no need to return here
            res.status(200).json({
                message: 'Successfully deleted the message',
                obj: result
            });
        })
    });
})

module.exports = router;