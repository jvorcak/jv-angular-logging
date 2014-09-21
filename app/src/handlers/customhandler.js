'use strict';

/**
 * @ngdoc service
 * @name jvLogging.CustomHandler
 * @description
 * This is a minimalistic Handler that can be extended to implement various
 * functionality e.g. sending log records through websockets, send them to
 * various services, etc.
 */
angular.module('jv.angular-logging')
  .service('CustomHandler', function (jvBaseHandler) {
    return function() {
      return angular.extend({
        emit: function (record) {
          // Implement your own handler here
          // if needed you can call formatter to get a list of objects to be
          // outputed e.g
          // var formatted = this.getFormatter().formatt(record);
          console.log(record);
        }
      }, jvBaseHandler);
    };
  });
