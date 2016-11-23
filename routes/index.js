var express = require('express');
var router = express.Router();
var shortid = require('shortid');

/* GET home page. */
router.get('/', function (req, res, next) {
    get("SygFiVmfl", function (param) {
        console.log(param)
    });
    res.render('index', {title: 'Express'});
});

router.post('/copy', function (req, res, next) {
    var id = shortid.generate();
    var submitted_text = req.body.text;
    console.log(id);

    var result = function (param) {
        console.log(param)
    };
    insert(id, submitted_text, result);
    console.log(result);

    get(id, result);
    res.render('copy', {submitted_text: submitted_text});
});

module.exports = router;


//////////////////////////////////////////////////////////
//// FUNCTIONS
////////////////////////////////////:


var redis = require('redis');

port = 6379;
host = '192.168.99.100';
temps_exp = 3000;

// fixe un temps d'expiration, en sec
//client.expire(key, temps_exp);


function insert(key, corps, callback) {
    var client = redis.createClient(port, host);
    client.exists(key, function (err, reply) {
        if (reply === 1) {
            callback(reply)
        } else {
            client.set(key, corps, function (err, replyed) {
                console.log(replyed);
                client.quit();
                callback(replyed);
            });
        }
    });

}

function get(key, callback) {
    var client = redis.createClient(port, host);
    client.get(key, function (err, reply) {
        console.log(reply);
        client.quit();
        callback(reply);
    });
}