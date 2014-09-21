'use strict';

/**
 * @ngdoc function
 * @name jvLoggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jvLoggingApp
 */
angular.module('jvLoggingApp')
  .controller('MainCtrl', function (jvLog, jvLogging) {
    var anotherLogger = jvLogging.getLogger('AnotherLogger');

    var person = {
        firstName: 'Jan',
        lastName: 'Vorcak',
        location: {
            country: 'Slovakia',
        }
    };

    jvLog.info('Person = ', person);
    jvLog.warn('Hello world');
    jvLog.error('Error', person);

    anotherLogger.log('Test');

  });
