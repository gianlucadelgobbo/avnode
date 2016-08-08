var moment = require('moment');

exports.writeDate = function (date) {
  var d = new Date(date);
  //return moment(d).format("dddd, MMMM Do YYYY, h:mm");
  return moment(d).format('dddd, MMMM Do YYYY');
};

exports.writeTime = function (date) {
  //return moment(d).format("dddd, MMMM Do YYYY, h:mm");
  return moment(date).format('HH:mm');
};

exports.millisToTime = function(ms){
  var x = ms / 1000;
  var seconds = Math.floor(x % 60).toString();
  seconds = seconds.length==1 ? '0'+seconds : seconds;
  x /= 60;
  var minutes = Math.floor(x % 60).toString();
  minutes = minutes.length==1 ? '0'+minutes : minutes;
  x /= 60;
  var hours = Math.floor(x % 24).toString();
  hours = hours.length==1 ? '0'+hours : hours;
  x /= 24;
  return hours+':' + minutes + ':' + seconds;
};
