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
  .config(function(jvLoggingConfigProvider) {

    jvLoggingConfigProvider.setDecorateLog(true);
  })
  .run(function(jvLogging, JvConsoleHandler, JvFormatter, jvFormat) {
    var logger = jvLogging.getLogger('AnotherLogger');
    var hdlr = new JvConsoleHandler();
    logger.addHandler(hdlr);
    var f = new JvFormatter(jvFormat.DATE('HH:mm:ss,sss'),
                            jvFormat.HASH,
                            jvFormat.NAME,
                            jvFormat.MESSAGES);
    hdlr.setFormatter(f);
  });
