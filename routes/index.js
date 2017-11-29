var twit = require('twit');
var config = require('../config');
var Twitter = new twit(config);
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params
var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs, #Reactjs, #reactjs, #angularjs, #Angularjs, #Expressjs, ',  // REQUIRED
    result_type: 'recent',
    lang: 'en'
  }
  Twitter.get('search/tweets', params, function(err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      var retweetId = data.statuses[0].id_str;
      // Tell TWITTER to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
      // if there was an error while tweeting
       if (err) {
          console.log('Something went wrong while RETWEETING... Duplication maybe...');
        }
      });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
    }
  });
};

// grab & retweet as soon as program is running...
retweet();

// retweet in every 5 minutes
setInterval(retweet, 300000);

module.exports = router;
