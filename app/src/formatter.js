'use strict';

/**
 * @ngdoc service
 * @name jvLogging.jvFormatter
 * @description
 * # Formatter
 * Formatter object defines the structure and contents of the log message.
 */
angular.module('jv.angular-logging')
  .service('jvFormatter', function($window, $filter, jvLogLevel) {
    var self = {
        DATE : function(format, timezone) {
          return $filter('date')(new Date().getTime(), format, timezone);
        },
        LEVEL: function(record) {
          return jvLogLevel.getLevelName(record.level);
        },
        LEVEL_NUM: function(record) {
          return record.level;
        },
        HASH : function () {
          return $window.location.hash;
        },
        MESSAGES : function(record) {
          return record.items;
        },
        NAME : function(record) {
          return record.name;
        },
        create: function() {
          var data = [].slice.call(arguments, 0);
          return {
            format: function(record) {
                if(data === undefined) {
                    data = [];
                }
                var items = [];
                for(var i = 0; i < data.length; i++) {
                    if(data[i] === self.MESSAGES) {
                        items = items.concat(data[i](record));
                    } else if (typeof(data[i]) === 'function') {
                        items.push(data[i](record));
                    } else {
                        items.push(data[i]);
                    }
                }
                return items;
            }
          };
        }
    };
    return self;
  });
