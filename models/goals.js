
 
var alasql = require('alasql'),
  utils = require('../utils/utils');

exports.get = function (query, cb) {
  var out_json = {},
    data = [],
    meta = {},
    opts,
    accepted_locales = ['en','es','fr','ru'],
    base_fields = 'indicator_id,indicator,target_id,[target],goal,goal_meta_link,goal_meta_link_page,has_metadata';

  try {

    // check for locale, default to en
    if (query.locale && (accepted_locales.indexOf(query.locale) !== -1) ) {
      opts = { data : GOALS[query.locale] };
    } else {
      opts = { data : GOALS['en'] };
    }

    if (query.ids) {
      opts.query_ids = utils.string_to_int(query.ids);
      data = alasql('SELECT * FROM $data WHERE goal IN @($query_ids)', opts);
    } else {
      data = alasql('SELECT * FROM $data', opts); 
    }

    if (query.targets === 'true' || query.indicators === 'true') {
      opts.data = TARGETS;
      data = data.map(function (goal) {
        opts.goal_id = goal.goal;
        goal.targets = alasql('SELECT * FROM $data WHERE goal=$goal_id', opts);
        return goal;
      },this);
    }

    if (query.indicators === 'true') {
      if (query.includeMetadata === 'true') {
        base_fields = '*';
      }

      data = data.map(function (goal) {
        goal.targets.map(function (target) {
          target.indicators = alasql('SELECT '+ base_fields +' FROM ? WHERE target_id=?', [ INDICATORS, target.id]);
          return target;
        },this);
        return goal;
      },this);      
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