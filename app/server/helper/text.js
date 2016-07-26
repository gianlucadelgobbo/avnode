var config = require('getconfig');

exports.getTextFormat = function (text, lang, defaultlang) {
  var str = (text[lang] ? text[lang] : (defaultlang ? (text[config.defaultLocale] ? text[config.defaultLocale] : text[0]) : ''));
  if (str) {
    str = str.replace(new RegExp('###b###','gm'), '<b>');
    str = str.replace(new RegExp('###/b###','gm'), '</b>');
    str = str.replace(new RegExp('\n','gm'), '<br />');
  }
  return str;
};
