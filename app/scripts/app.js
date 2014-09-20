'use strict';

/**
 * @ngdoc overview
 * @name jvLoggingApp
 * @description
 * # jvLoggingApp
 *
 * Main module of the application.
 */
angular
  .module('jvLoggingApp', ['jv.angular-logging'])
  .run(function(jvLogging, ConsoleHandler, jvFormatter) {
    var logger = jvLogging.getLogger();
    var hdlr = new ConsoleHandler();
    logger.addHandler(hdlr);
    var f = jvFormatter.create(jvFormatter.DATE('HH:mm:ss,sss'),
                               jvFormatter.HASH,
                               jvFormatter.MESSAGES);
    hdlr.setFormatter(f);
  });
