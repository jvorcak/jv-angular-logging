'use strict';

angular.module('jv.angular-logging')
  .service('jvLog', function(jvLogging, ConsoleHandler) {
     var logger = jvLogging.getLogger();
     logger.addHandler(new ConsoleHandler());
     return logger;
  });
