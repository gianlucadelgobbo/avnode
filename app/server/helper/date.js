var moment = require('moment');

exports.writeDate = function (date) {
  var d = new Date(date);
  //return moment(d).format("dddd, MMMM Do YYYY, h:mm");
  return moment(d).format("dddd, MMMM Do YYYY");
}

exports.writeTime = function (date) {
  //return moment(d).format("dddd, MMMM Do YYYY, h:mm");
  return moment(date).format("HH:mm");
}

exports.millisToTime = function(ms){
  x = ms / 1000;
  seconds = Math.floor(x % 60).toString();
  seconds = seconds.length==1 ? "0"+seconds : seconds;
  x /= 60;
  minutes = Math.floor(x % 60).toString();
  minutes = minutes.length==1 ? "0"+minutes : minutes;
  x /= 60;
  hours = Math.floor(x % 24).toString();
  hours = hours.length==1 ? "0"+hours : hours;
  x /= 24;
  days = Math.floor(x).toString();

  return hours+":" + minutes + ":" + seconds;
}