'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserRegisterCtrl', function ($scope, $http, UserService) {

    // Set up form options
    $scope.formOptions = {
      languages: [
        'Estonian',
        'English',
        'Finnish',
        'Russian',
        'German'
      ],
      roles: [
          'Learner',
          'Teacher'
      ],
      sex: {
        1: 'Male',
        2: 'Female'
      }
    };

    // Set up DatePicker options and declare methods for it
    $scope.datePickerOptions = {
      startingDay: 1,
      showWeeks: false
    };

    $scope.todayDate = new Date();
    $scope.datePickerMode = 'year';

    $scope.openDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.datePickerOpened = true;
    };

    // Set up empty userData object
    resetForm();

    // Create new User Service
    $scope.user = new UserService();

    /*
     postingState variable:
     0 - Not yet posted
     1 - Success
     2 - Error
     */
    $scope.postingState = 0;

    // Save new User
    $scope.registerUser = function(user){
      $scope.errors = null;
      $scope.updating = true;

      // Set user data that has different keys from form extra data
      user.user_email = $scope.userData.email;
      user.user_login = $scope.userData.email;
      user.display_name = $scope.userData.extra.full_name;
      user.user_nicename = $scope.userData.extra.full_name;

      // append from data 'extra' object to userData object (same keys)
      _.extend(user, $scope.userData.extra);

      // POST to DB
      user.$save(user, function() {
        // success
        $scope.postingState = 1; // OK
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
      }, function(user){
        // error
        $scope.postingState = 2; // Error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
      });
    };


    function resetForm() {
      $scope.userData = {
        email: '',
        extra: {
          full_name: '',
          date_of_birth: '',
          sex: '',
          city_of_residence: '',
          user_type: '0',
          preferred_language: '',
          additional_languages: ['']
        }
      };
    }

  });


