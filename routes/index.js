var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/copy', function (req, res, next){
  res.render('copy', {submitted_text: req.body.text})
});

module.exports = router;
