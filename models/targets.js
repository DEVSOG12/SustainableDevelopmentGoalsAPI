  
 
var alasql = require('alasql'),
  utils = require('../utils/utils');

exports.get = function (query, cb) {
  var out_json = {},
    data = [],
    meta = {},
    base_sql = 'SELECT * FROM ?';
    
  try {
    if (query.goals && !query.ids) {
      base_sql += ' WHERE goal IN('+ utils.string_to_int(query.goals) +')';
      data = alasql(base_sql, [ TARGETS ]);
    }

    if (query.ids) {
      base_sql += ' WHERE id IN ('+ utils.sql_stringify(query.ids) +')';
      data = alasql(base_sql, [ TARGETS ]);
    } else if (!query.goals) {
      data = alasql(base_sql, [ TARGETS ]); 
    }
    
    out_json['data'] = data;
    out_json['meta'] = {};
  }
  catch (e) {
    console.log(e);
    out_json.errors = [];
    out_json.errors.push({
      status: '',
      detail: e,
      source: ''
    });
  }

  cb(null, out_json);
}