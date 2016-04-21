var moment = require('moment');
var now = moment();

//console.log(now.format());
//console.log(now.format('HH:MM:SS A DD/MM/YY '));
//now.subtract(1, 'year');
//console.log(now.format());

var timestamp = 1444247486704;
var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('DD/MM/YY h:mm a'));