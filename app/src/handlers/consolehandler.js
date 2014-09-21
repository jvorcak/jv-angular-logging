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
angular.module('jv.angular-logging')
  .service('ConsoleHandler', function (jvBaseHandler, jvLogLevel) {
    // Public API here
    return function() {
      return angular.extend({
        emit: function (record) {
          var formatted = this.getFormatter().format(record);
          switch(record.level) {
            case jvLogLevel.INFO:
                console.info.apply(console, formatted);
                break;
            case jvLogLevel.WARNING:
                console.warn.apply(console, formatted);
                break;
            case jvLogLevel.ERROR:
                console.error.apply(console, formatted);
                break;
            case jvLogLevel.DEBUG:
                console.debug.apply(console, formatted);
                break;
            default:
                console.log.apply(console, formatted);
          }
        }
      }, jvBaseHandler);
    };
  });
