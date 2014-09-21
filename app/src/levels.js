'use strict';

angular
  .module('jv.angular-logging')
  .service('jvLogLevel', function() {

    var self = {
      CRITICAL: 50,
      ERROR: 40,
      WARNING: 30,
      INFO: 20,
      DEBUG: 10,
      NOTSET: 0
    };

    var levelNames = {};
    levelNames[self.CRITICAL] = 'CRITICAL';
    levelNames[self.ERROR]    = 'ERROR';
    levelNames[self.WARNING]  = 'WARNING';
    levelNames[self.INFO]     = 'INFO';
    levelNames[self.DEBUG]    = 'DEBUG';
    levelNames[self.NOTSET]   = 'NOTSET';

    self.getLevelName = function(levelNumber) {
        return levelNames[levelNumber];
    };

    return self;
  });
