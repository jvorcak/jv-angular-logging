'use strict';

angular.module('jv.angular-logging')
  .service('jvLog', function(jvLogging) {
    return jvLogging.getLogger();
  });
