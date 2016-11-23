var express = require('express');
var router = express.Router();
var shortid = require('shortid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/copy', function (req, res, next){
  var id = shortid.generate();
  var submitted_text = req.body.text;
  console.log(id);

  res.render('copy', {submitted_text: submitted_text});
});

module.exports = router;
