'use strict';

angular.module('jv.angular-logging')
  .service('jvLog', function(jvLogging, ConsoleHandler) {
    return jvLogging.getLogger();
  });
