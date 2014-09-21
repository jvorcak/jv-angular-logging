'use strict';

/**
 * @ngdoc function
 * @name jvLoggging.decorator:Log
 * @description
 * # Log
 * Decorator of the jvLoggingApp
 */
angular.module('jv.angular-logging')
  .config(function ($provide) {
    $provide.decorator('$log', function ($delegate, jvLogging, jvLoggingConfig) {
      if(jvLoggingConfig.getDecorateLog()) {
        $delegate = jvLogging.getLogger(jvLoggingConfig.getDecoratorLogger());
      }
      return $delegate;
    });

    $provide.decorator('jvLog', function ($delegate, ConsoleHandler) {
      $delegate.addHandler(new ConsoleHandler());
      return $delegate;
    });
  })
  .provider('jvLoggingConfig', function() {

    var decorateLog = false;
    var decoratorLogger;

    this.setDecorateLog = function(value) {
      decorateLog = value;
    };
    this.getDecorateLog = function() {
      return decorateLog;
    };
    this.setDecoratorLogger = function(name) {
        decoratorLogger = name;
    };
    this.getDecoratorLogger = function() {
        return decoratorLogger;
    };

    this.$get = function jvLoggingConfigFactory() {
        return this;
    };

  });
