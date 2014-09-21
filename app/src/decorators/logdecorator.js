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
    $provide.decorator('$log', function ($delegate, jvLog, jvLoggingConfig) {
      if(jvLoggingConfig.getDecorateLog()) {
        $delegate = jvLog;
      }
      return $delegate;
    });
  })
  .provider('jvLoggingConfig', function() {

    var decorateLog = false;
    this.setDecorateLog = function(value) {
      decorateLog = value;
    };
    this.getDecorateLog = function() {
      return decorateLog;
    };

    this.$get = function jvLoggingConfigFactory() {
        return this;
    };

  });
