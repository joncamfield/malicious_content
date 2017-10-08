var restclient = require('node-restclient');
var Twit = require('twit');
var striptags = require('striptags');
require("console-stamp")(console, "HH:MM:ss.l");
var tweet = "";
var statement =   "";
var config = require('./config.js');
var cards = require('../assets/dictionary.js');

var T = new Twit(config);


function safeRand() {
  Math.random();
  return Math.random();
}

function makeMetaphor() {

  var maxredcard = cards.arrayredcard.length - 1;
  var maxwhitecard = cards.arraywhitecard.length - 1;

  indexredcard = Math.floor(safeRand() * maxredcard);
  indexwhitecard = Math.floor(safeRand() * maxwhitecard);
  indexwhitecard2 = Math.floor(safeRand() * maxwhitecard);
  indexwhitecard3 = Math.floor(safeRand() * maxwhitecard);

  redcard = cards.arrayredcard[indexredcard];

  redwhite = redcard.replace("__", "<u id=\"whitecard1\">_" + cards.arraywhitecard[indexwhitecard] + "_</u>");
  redwhite = redwhite.replace("__", "<u id=\"whitecard2\">_" + cards.arraywhitecard[indexwhitecard2] + "_</u>");
  redwhite = redwhite.replace("__", "<u id=\"whitecard3\">_" + cards.arraywhitecard[indexwhitecard3] + "_</u>");

  statement = redwhite.replace(/<[^>]+>/g, '');

//	statement = "It's " + arraypivot[indexpivot] + ", but with Blockchain technology!";
	console.time('timestamp');
	console.log('There are ' + maxredcard + ' red cards, and ' + maxwhitecard + ' blue cards');
	console.log('Just generated a great ' + statement.length  + ' character-long idea.: ' + statement );
	return (statement);
}

function posttweet () {
	tweet = striptags(makeMetaphor());
  if (tweet.length > 140) {
    console.log('Tweet too big :( ');
  } else {
        T.post('statuses/update', { status: tweet}, function(err, reply) {
          console.log("tweeted: " + tweet);
//          console.log("error: " + err);
//          console.log("reply: " + reply]);
        });
  }
}

function favRTs () {
  T.get('statuses/retweets_of_me', {}, function (e,r) {
    for(var i=0;i<r.length;i++) {
      T.post('favorites/create/'+r[i].id_str,{},function(){});
    }
    console.log('harvested some RTs');
  });
}

//var idea = striptags(makeMetaphor());
//console.log(idea);


// every hour, make and tweet a metaphor
// wrapped in a try/catch in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.

setImmediate(function() {
  try {
//  Run posttweet to post, makemetaphor to just console out the great idea

  posttweet();

  //makeMetaphor();

  }
 catch (e) {
    console.log(e);
  }
});

// every 5 hours, check for people who have RTed a metaphor, and favorite that metaphor
setImmediate(function() {
  try {
    favRTs();
  }
 catch (e) {
    console.log(e);
  }
});
