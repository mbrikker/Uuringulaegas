'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:GroupListCtrl
 * @description
 * # GroupListCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupListCtrl', function ($scope, $http, appConfig, GroupService, $modal, $location) {

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.groupList = GroupService.query();

    $scope.showGroupPage = function(group){
      $location.path('groups/' + group.id)
    };



  });


