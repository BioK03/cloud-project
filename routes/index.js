var express = require('express');
var router = express.Router();
var shortid = require('shortid');

var content_text;
var content_id;

/* GET home page. */
router.get('/:id?', function (req, res, next) {
    if (req.params.id) {
        content_id = req.params.id;
        get(content_id, handleResult);
        res.render('copy', {submitted_text: content_text, link_href: content_id});
    } else {
        res.render('index');
    }
});

router.post('/copy', function (req, res, next) {
    content_id = shortid.generate();
    content_text = req.body.text;
    console.log(content_id);

    insert(content_id, content_text, handleResult);

    get(content_id, handleResult);
    res.render('copy', {submitted_text: content_text, link_href: content_id});
});

module.exports = router;


//////////////////////////////////////////////////////////
//// FUNCTIONS
//////////////////////////////////////////////////////////


var redis = require('redis');

DB_PORT = 6379;
DB_HOST = 'bd';//'192.168.99.100';// 'bd' en prod
temps_exp = 3000;// temps d'expiration, en sec

function insert(key, corps, callback) {
    var client = redis.createClient(DB_PORT, DB_HOST);
    client.exists(key, function (err, reply) {
        if (reply === 1) {
            callback(reply)
        } else {
            client.set(key, corps, function (err, replyed) {
                client.expire(key, temps_exp);
                console.log(replyed);
                client.quit();
                callback(replyed);
            });
        }
    });
}

function get(key, callback) {
    var client = redis.createClient(DB_PORT, DB_HOST);
    client.get(key, callback);
}

var handleResult = function (error, buffer) {
    console.log("Error : " + error);
    console.log("Buffer : " + buffer);

    if (buffer) content_text = buffer;
};
