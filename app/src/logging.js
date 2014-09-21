'use strict';

angular.module('jv.angular-logging')
  .factory('jvLogging', function(jvLogLevel) {

    var self = {};

    // maintain loggers dictionary
    var loggers = {};

    var createLogger = function(name) {
      /*
       * Logger instance
       */
      return {
        level: jvLogLevel.NOTSET,
        handlers : [],
        info: function() {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(jvLogLevel.INFO, args));
        },
        warn: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(jvLogLevel.WARNING, args));
        },
        error: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(jvLogLevel.ERROR, args));
        },
        debug: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(jvLogLevel.DEBUG, args));
        },
        log: function(msg) {
            var args = [].slice.call(arguments, 0);
            this.handle(this.makeRecord(jvLogLevel.NOTSET, args));
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
        name = 'defaultLogger';
      }
      if(!(name in loggers)) {
        loggers[name] = createLogger(name);
      }
      return loggers[name];
    };

    return self;
  });
