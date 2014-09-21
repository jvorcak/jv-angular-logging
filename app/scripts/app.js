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
  .config(function($logProvider, jvLoggingConfigProvider) {
    $logProvider.debugEnabled(true);

    jvLoggingConfigProvider.setDecorateLog(true);
    jvLoggingConfigProvider.setDecoratorLogger('AnotherLogger');

  })
  .run(function(jvLogging, ConsoleHandler, jvFormatter) {
    var logger = jvLogging.getLogger('AnotherLogger');
    var hdlr = new ConsoleHandler();
    logger.addHandler(hdlr);
    var f = jvFormatter.create(jvFormatter.DATE('HH:mm:ss,sss'),
                               jvFormatter.HASH,
                               jvFormatter.NAME,
                               jvFormatter.MESSAGES);
    hdlr.setFormatter(f);
  });
