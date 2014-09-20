'use strict';

angular.module('jv.angular-logging')
  .factory('jvLogging', function($log) {

    var self = {
      CRITICAL: 50,
      ERROR: 40,
      WARNING: 30,
      INFO: 20,
      DEBUG: 10,
      NOTSET: 0
    };

    var levelNames = {
      50: 'CRITICAL',
      40: 'ERROR',
      30: 'WARNING',
      20: 'INFO',
      10: 'DEBUG',
       0: 'NOTSET'
    };

    self.getLevelName = function(levelNumber) {
        return levelNames[levelNumber];
    };

    // maintain loggers dictionary
    var loggers = {};

    var createLogger = function(name) {
      /*
       * Logger instance
       */
      return {
        level: self.NOTSET,
        handlers : [],
        info: function() {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(self.INFO, args));
        },
        warn: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(self.WARNING, args));
        },
        error: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(self.ERROR, args));
        },
        debug: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(self.DEBUG, args));
        },
        log: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(self.NOTSET, args));
        },
        makeRecord: function(level, items) {
            return {name: name, level: level, items: items};
        },
        handle: function(record) {
          if(record.level >= this.level) {
            if(this.handlers.length > 0) {
              var i;
              for(i = 0; i < this.handlers.length; i++) {
                  this.handlers[i].handle(record);
              }
            } else {
               if(!this._warnedAboutNoHandlers) {
                 // warn just once about no handlers issue
                 console.warn('No handlers could be found for logger ' + name);
                 this._warnedAboutNoHandlers = true;
               }
            }
          }
        },
        addHandler: function(handler) {
            this.handlers.push(handler);
        },
        setLevel: function(level) {
            this.level = level;
        }
      };
    };

    self.getLogger = function(name) {
      if(name === undefined) {
        name = '_defaultLogger';
      }
      if(!(name in loggers)) {
        loggers[name] = createLogger(name);
      }
      return loggers[name];
    };

    return self;
  });
