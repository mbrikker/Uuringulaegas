'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserPassportCtrl', function ($scope, $http, $routeParams, UserService, $gravatar, InquiryActivityLogService) {

    $scope.user = UserService.get({id: $routeParams.id});
    console.log($scope.user);

    $scope.inqLog = InquiryActivityLogService.searchByLearnerID({learnerID: 8}, function(data){
      console.log(data);
      return data;
    }).$promise;

    console.log($scope.inqLog);

    $scope.gravatarUrl = function(user) {
      return $gravatar.generate(user.user_email);
    };

    $scope.badgeRows = new Array(3);


  });


