'use strict';
/**
 * @ngdoc overview
 * @name jv.angular-logging
 * @description
 *
 * Main module defines services which implement flexible and powerful logging
 * system for your angular applications.
 */
angular.module('jv.angular-logging', []);
'use strict';
/**
 * @ngdoc function
 * @name jvLoggging.decorator:Log
 * @description
 * # Log
 * Decorator of the jvLoggingApp
 */
angular.module('jv.angular-logging').config([
  '$provide',
  function ($provide) {
    $provide.decorator('$log', function ($delegate, jvLogging, jvLoggingConfig) {
      if (jvLoggingConfig.getDecorateLog()) {
        $delegate = jvLogging.getLogger(jvLoggingConfig.getDecoratorLogger());
      }
      return $delegate;
    });
    $provide.decorator('jvLog', function ($delegate, ConsoleHandler) {
      $delegate.addHandler(new ConsoleHandler());
      return $delegate;
    });
  }
]).provider('jvLoggingConfig', function () {
  var decorateLog = false;
  var decoratorLogger;
  this.setDecorateLog = function (value) {
    decorateLog = value;
  };
  this.getDecorateLog = function () {
    return decorateLog;
  };
  this.setDecoratorLogger = function (name) {
    decoratorLogger = name;
  };
  this.getDecoratorLogger = function () {
    return decoratorLogger;
  };
  this.$get = function jvLoggingConfigFactory() {
    return this;
  };
});
'use strict';
/**
 * @ngdoc service
 * @name jvLogging.jvFormatter
 * @description
 * # Formatter
 * Formatter object defines the structure and contents of the log message.
 */
angular.module('jv.angular-logging').service('jvFormatter', [
  '$window',
  '$filter',
  'jvLogging',
  function ($window, $filter, jvLogging) {
    var self = {
        DATE: function (format, timezone) {
          return $filter('date')(new Date().getTime(), format, timezone);
        },
        LEVEL: function (record) {
          return jvLogging.getLevelName(record.level);
        },
        LEVEL_NUM: function (record) {
          return record.level;
        },
        HASH: function () {
          return $window.location.hash;
        },
        MESSAGES: function (record) {
          return record.items;
        },
        NAME: function (record) {
          return record.name;
        },
        create: function () {
          var data = [].slice.call(arguments, 0);
          return {
            format: function (record) {
              if (data === undefined) {
                data = [];
              }
              var items = [];
              for (var i = 0; i < data.length; i++) {
                if (data[i] === self.MESSAGES) {
                  items = items.concat(data[i](record));
                } else if (typeof data[i] === 'function') {
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
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name jvLogging.jvBaseHandler
 * @description
 * # jvBaseHandler
 * implements the core behavior for each handler object.
 *
 * @property {string} level Logging messages which are less severe than level
 * will be ignored.
 * When a handler is created, the level is set to NOTSET (which causes all
 * messages to be processed).
 *
 * @property {jvFormatter} formatter jvFormatter used to format log records.
 *
 */
angular.module('jv.angular-logging').service('jvBaseHandler', [
  'jvFormatter',
  'jvLogging',
  function (jvFormatter, jvLogging) {
    return {
      level: jvLogging.NOTSET,
      formatter: jvFormatter.create(jvFormatter.DATE('HH:mm:ss,sss'), jvFormatter.NAME, jvFormatter.MESSAGES),
      handle: function (record) {
        if (record.level >= this.level) {
          this.emit(record);
        }
      },
      setLevel: function (level) {
        this.level = level;
      },
      getLevel: function () {
        return this.level;
      },
      setFormatter: function (formatter) {
        this.formatter = formatter;
      },
      getFormatter: function () {
        return this.formatter;
      }  /**
         * @ngdoc interface
         * @name emit
         * @param {LogRecord} record LogRecord to be emitted.
         * @methodOf jvLogging.BaseHandler
         * @description This method is abstract. Each handler is responsible
         * for it's own implementation.
         */
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name jvLogging.ConsoleHandler
 * @description
 * # ConsoleHandler
 * is the implementation of a handler which logs formatted messages to the
 * browser's console.
 * <br/><br/>
 * This class extends {@link jvLogging.jvBaseHandler jvBaseHandler} service by
 * implementing it's emit method.
 */
angular.module('jv.angular-logging').service('ConsoleHandler', [
  'jvBaseHandler',
  'jvLogging',
  function (jvBaseHandler, jvLogging) {
    // Public API here
    return function () {
      return angular.extend({
        emit: function (record) {
          var formatted = this.getFormatter().format(record);
          switch (record.level) {
          case jvLogging.INFO:
            console.info.apply(console, formatted);
            break;
          case jvLogging.WARNING:
            console.warn.apply(console, formatted);
            break;
          case jvLogging.ERROR:
            console.error.apply(console, formatted);
            break;
          case jvLogging.DEBUG:
            console.debug.apply(console, formatted);
            break;
          default:
            console.log.apply(console, formatted);
          }
        }
      }, jvBaseHandler);
    };
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name jvLogging.CustomHandler
 * @description
 * This is a minimalistic Handler that can be extended to implement various
 * functionality e.g. sending log records through websockets, send them to
 * various services, etc.
 */
angular.module('jv.angular-logging').service('CustomHandler', [
  'jvBaseHandler',
  function (jvBaseHandler) {
    return function () {
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
  }
]);
'use strict';
angular.module('jv.angular-logging').service('jvLog', [
  'jvLogging',
  'ConsoleHandler',
  function (jvLogging, ConsoleHandler) {
    return jvLogging.getLogger();
  }
]);
'use strict';
angular.module('jv.angular-logging').factory('jvLogging', function () {
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
  self.getLevelName = function (levelNumber) {
    return levelNames[levelNumber];
  };
  // maintain loggers dictionary
  var loggers = {};
  var createLogger = function (name) {
    /*
       * Logger instance
       */
    return {
      level: self.NOTSET,
      handlers: [],
      info: function () {
        var args = [].slice.call(arguments, 0);
        this.handle(this.makeRecord(self.INFO, args));
      },
      warn: function (msg) {
        var args = [].slice.call(arguments, 0);
        this.handle(this.makeRecord(self.WARNING, args));
      },
      error: function (msg) {
        var args = [].slice.call(arguments, 0);
        this.handle(this.makeRecord(self.ERROR, args));
      },
      debug: function (msg) {
        var args = [].slice.call(arguments, 0);
        this.handle(this.makeRecord(self.DEBUG, args));
      },
      log: function (msg) {
        var args = [].slice.call(arguments, 0);
        this.handle(this.makeRecord(self.NOTSET, args));
      },
      makeRecord: function (level, items) {
        return {
          name: name,
          level: level,
          items: items
        };
      },
      handle: function (record) {
        if (record.level >= this.level) {
          if (this.handlers.length > 0) {
            var i;
            for (i = 0; i < this.handlers.length; i++) {
              this.handlers[i].handle(record);
            }
          } else {
            if (!this._warnedAboutNoHandlers) {
              // warn just once about no handlers issue
              console.warn('No handlers could be found for logger ' + name);
              this._warnedAboutNoHandlers = true;
            }
          }
        }
      },
      addHandler: function (handler) {
        this.handlers.push(handler);
      },
      setLevel: function (level) {
        this.level = level;
      }
    };
  };
  self.getLogger = function (name) {
    if (name === undefined) {
      name = 'defaultLogger';
    }
    if (!(name in loggers)) {
      loggers[name] = createLogger(name);
    }
    return loggers[name];
  };
  return self;
});