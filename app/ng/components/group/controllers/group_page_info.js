'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserPassportCtrl
 * @description
 * # UserPassportCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('GroupPageInfoCtrl', function ($scope, $http, $stateParams, UserService, $gravatar, GroupService, appConfig, $modal, $location, InquiryActivityLogService, $q, $rootScope) {

    var timeFormat = 'YYYY-MM-DD HH:mm:ss';

    $scope.inqLog = [];
    $scope.loadingInqLog = true;
    var inqLogServicePromises = [];

    var activityListString = '';

    $scope.showActivityDetailPage = function(activity){
      $location.path('inq_act/' + activity.id)
    };

    $scope.loadingLearners = true;
    $scope.group = GroupService.get({id: $stateParams.id}, function(success){
      // Success
      createActivityListString();
      $scope.group.author.gravatarUrl = getGravatarUrl($scope.group.author.user_email);
      for(var i = 0; i < $scope.group.learners.length; i++){
        $scope.group.learners[i].gravatarUrl = getGravatarUrl($scope.group.learners[i].user_email);
        getUserLog($scope.group.learners[i]);
        if($scope.group.learners[i].ID == $rootScope.currentUserData.userID){
          $scope.alreadyJoined = true;
        }
      }
      for(var t = 0; t < $scope.group.teachers.length; t++) {
        $scope.group.teachers[t].gravatarUrl = getGravatarUrl($scope.group.teachers[t].user_email);
      }
      for(var j = 0; j < $scope.group.wait_list.length; j++){
        if($scope.group.wait_list[j].ID == $rootScope.currentUserData.userID){
          $scope.pending = true;
        }
        $scope.group.wait_list[j].gravatarUrl = getGravatarUrl($scope.group.wait_list[j].user_email);
      }

      $scope.loadingLearners = false;

      // Wait for all logs to be fetched (promises to resolve)
      $q.all(inqLogServicePromises).then(function(response){
        // Flatten the individual user log arrays to one big array
        // that can be handled by ngRepeat
        response = _.flatten(response);
        for(var i = 0; i < response.length; i++){
          // Convert Date strings to Date objects
          response[i].created = new Date(moment(response[i].created, timeFormat));
          // Convert inq_activity object to array (remove id key)
          response[i].inq_activity = _.values(response[i].inq_activity);
        }

        $scope.loadingInqLog = false;
        $scope.inqLog = response;
      });
      //
    });

    $scope.joinGroup = function(){
      $scope.updating = true;
      GroupService.handleWaitList({
        groupID: $stateParams.id,
        action: 'add_to_group_wait_list'
      }, function(success){
        $scope.updating = false;
        $scope.pending = true;
      }, function(error){
        $scope.updating = false;
      });
    };

    $scope.acceptWaitList = function(learnerID, listIndex){
      $scope.updating = true;
      GroupService.handleWaitList({
        learnerID: learnerID,
        groupID: $stateParams.id,
        action: 'accept_from_group_wait_list'
      }, function(success){
        $scope.updating = false;
        $scope.group.learners.push($scope.group.wait_list[listIndex]);
        $scope.group.wait_list.splice(listIndex, 1);
      }, function(error){
        $scope.updating = false;
      });
    };

    $scope.declineWaitList = function(learnerID, listIndex){
      $scope.updating = true;
      GroupService.handleWaitList({
        learnerID: learnerID,
        groupID: $stateParams.id,
        action: 'decline_from_group_wait_list'
      }, function(success){
        $scope.updating = false;
        $scope.group.wait_list.splice(listIndex, 1);
      }, function(error){
        $scope.updating = false;
      });
    };

    function createActivityListString() {
      var activityListKeys = _.keys($scope.group.inq_activities);
      for(var i = 0; i < activityListKeys.length; i++){
        activityListString += activityListKeys[i];
        if(i + 1 < activityListKeys.length){
          activityListString += ','
        }
      }
    }

    function getUserLog(user){
      //var log = InquiryActivityLogService.searchByLearnerID({learnerID: user.ID});
      var log = InquiryActivityLogService.searchByLearnerWithActivities({learnerID: user.ID, activityList: activityListString});
      inqLogServicePromises.push(log.$promise);
      return log;
    }

    // Get gravatarUrl
    $scope.gravatarUrl = function(user) {
      return $gravatar.generate(user.user_email);
    };

    // Expose Underscore.js to scope
    $scope._ = _;

    $scope.showUserProfile = function(id){
      $location.path('user/' + id);
    };

    // Get gravatarUrl by email
    function getGravatarUrl(email) {
      return $gravatar.generate(email);
    }

    $scope.openPeerReviewModal = function (log) {

      var modalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/peer_review_modal.html',
        controller: 'PeerReviewModalCtrl',
        resolve: {
          log: function () {
            return log;
          }
        }
      });

      modalInstance.result.then(function (status) {
        //$scope.activityStatus.status = status;

      });
    };

    $scope.openTeacherReviewModal = function (log) {

      var modalInstance = $modal.open({
        templateUrl: appConfig.appBase + 'ng/components/inq_act/views/partials/teacher_review_modal.html',
        controller: 'TeacherReviewModalCtrl',
        size: 'lg',
        resolve: {
          log: function () {
            return log;
          }
        }
      });

      modalInstance.result.then(function (status) {
        //$scope.activityStatus.status = status;
      });
    };

  });


