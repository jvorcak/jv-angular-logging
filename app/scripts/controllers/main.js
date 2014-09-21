'use strict';

/**
 * @ngdoc function
 * @name jvLoggingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jvLoggingApp
 */
angular.module('jvLoggingApp')
  .controller('MainCtrl', function ($log) {

    var person = {
        firstName: 'Jan',
        lastName: 'Vorcak',
        location: {
            country: 'Slovakia',
        }
    };

    $log.info('Person = ', person);
    $log.warn('Hello world');
    $log.error('Error', person);
  });
