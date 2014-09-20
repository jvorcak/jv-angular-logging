'use strict';

/**
 * @ngdoc function
 * @name jvLoggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jvLoggingApp
 */
angular.module('jvLoggingApp')
  .controller('MainCtrl', function (jvLogging) {
    var logger = jvLogging.getLogger();

    var person = {
        firstName: 'Jan',
        lastName: 'Vorcak',
        location: {
            country: 'Slovakia',
        }
    };

    logger.info('Person = ', person);
    logger.warn('Hello world');
    logger.error('Error', person);
  });
