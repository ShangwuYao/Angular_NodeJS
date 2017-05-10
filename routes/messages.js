var express = require('express');
var router = express.Router();

var Message = require('../models/message');

// again, invisible #/messsage
// fetch the messages from database
router.get('/', function (req, res, next) {
    Message.find()
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

// have invisible #/message before
// insert a message into the database
router.post('/', function (req, res, next) {
    var message = new Message({
        // if it is text/plain, then it has no property content, and will thus cause an error
        content: req.body.content
    });
    message.save(function(err, result){
        // if there is error, return
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        // no need to return here
        res.status(201).json({
            message: 'Successfully saved the message',
            obj: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
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

module.exports = router;