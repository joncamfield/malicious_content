import { login } from 'masto';

const masto = await login({
  url: "https://infosec.exchange",
  accessToken: process.env.TOKEN,
});


import cards from '../../assets/dictionary.js';
// var cards = require('../../assets/dictionary.js');

var maxredcard = cards.arrayredcard.length - 1;
var maxbluecard = cards.arraybluecard.length - 1;

const randblue = Array(maxbluecard).fill().map((_, index) => index + 1);
randblue.sort(() => Math.random() - 0.5);

const randred = Array(maxredcard).fill().map((_, index) => index + 1);
randred.sort(() => Math.random() - 0.5);

var bluecard = cards.arraybluecard[randblue.slice(0,1)]

var bluered = bluecard.replace("__", "<u id=\"redcard1\">" + cards.arrayredcard[randred.slice(0,1)] + "</u>");
var bluered = bluered.replace("__", "<u id=\"redcard1\">" + cards.arrayredcard[randred.slice(1,2)] + "</u>");
var bluered = bluered.replace("__", "<u id=\"redcard1\">" + cards.arrayredcard[randred.slice(2,3)] + "</u>");

var statement = bluered.replace(/<[^>]+>/g, '_');


const status = await masto.v1.statuses.create({
  status: statement,
  visibility: 'public',
});


console.time('timestamp');
console.log('There are ' + maxbluecard + ' blue cards, and ' + maxredcard + ' red cards');
console.log('Just generated a great ' + statement.length  + ' character-long idea.: ' + statement );
console.log(status.url);
