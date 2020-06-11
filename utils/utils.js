  
 
exports.string_to_int = function (in_ids) {
  return in_ids.split(',')
    .map(function (i) { return parseInt(i); });
}

exports.sql_stringify = function (in_ids) {
  return in_ids.split(',')
      .map(function (i) { return '\'' + i + '\''; })
      .join(',');
}