'use strict';

/**
 * @ngdoc function
 * @name jvLoggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jvLoggingApp
 */
angular.module('jvLoggingApp')
  .controller('MainCtrl', function (jvLogging, jvLog) {

    var person = {
        firstName: 'Jan',
        lastName: 'Vorcak',
        location: {
            country: 'Slovakia',
        }
    };

    var log = jvLogging.getLogger();

    log.info('Person = ', person);
    jvLog.warn('Hello world');

  });
