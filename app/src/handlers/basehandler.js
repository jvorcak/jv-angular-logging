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
angular.module('jv.angular-logging')
  .service('jvBaseHandler', function(jvFormat, JvFormatter, jvLogLevel) {
     return {
        level : jvLogLevel.NOTSET,
        formatter : new JvFormatter(jvFormat.DATE('HH:mm:ss,sss'),
                                     jvFormat.NAME,
                                     jvFormat.MESSAGES),
        handle: function(record) {
            if(record.level >= this.level) {
                this.emit(record);
            }
        },
        /**
         * @ngdoc interface
         * @name setLevel
         * @param {Level} level Level to be set.
         * @methodOf jvLogging.BaseHandler
         */
        setLevel: function(level) {
            this.level = level;
        },
        /**
         * @ngdoc interface
         * @name getLevel
         * @returns {Level} Current value of level property.
         * @methodOf jvLogging.BaseHandler
         */
        getLevel: function() {
            return this.level;
        },
        /**
         * @ngdoc interface
         * @name setFormatter
         * @param {jvFormatter} formatter jvFormatter to be used.
         * @methodOf jvLogging.jvBaseHandler
         */
        setFormatter: function(formatter) {
            this.formatter = formatter;
        },
        /**
         * @ngdoc interface
         * @name getFormatter
         * @returns {jvFormatter} jvFormatter which is used to format log
         * records.
         * @methodOf jvLogging.jvBaseHandler
         */
        getFormatter: function() {
            return this.formatter;
        }
        /**
         * @ngdoc interface
         * @name emit
         * @param {LogRecord} record LogRecord to be emitted.
         * @methodOf jvLogging.BaseHandler
         * @description This method is abstract. Each handler is responsible
         * for it's own implementation.
         */
     };
  });
