'use strict';

/**
 * @ngdoc overview
 * @name arkofinquiryApp
 * @description
 * # arkofinquiryApp
 *
 * Main module of the application.
 */
angular
  .module('arkofinquiryApp', [
    'arkofinquiryApp.config',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-rangeSlider',
    'ui.bootstrap',
    'ngTagsInput',
    'Gravatar',
    'duScroll',
    'angular-jqcloud'
  ])
  // Default values for angular-scroll module
  .value('duScrollDuration', 1000)
  .value('duScrollOffset', 30)
;
