'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivitiesCtrl
 * @description
 * # InquiryActivitiesCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('UserRegisterCtrl', function ($scope, $http, UserService) {

    $scope.formOptions = {
      languages: [
        'Estonian',
        'English',
        'Finnish',
        'Russian'
      ],
      roles: [
          'Learner',
          'Teacher'
      ]
    };

    $scope.added = false;

    $scope.formData = {
      title: '',
      description: '',
      extra: {
        domains: [''],
        topic: '',
        languages: [''],
        proficiency_level: [''],
        covered_phases: [''],
        departing_phases: [''],
        age_range_from: 7,
        age_range_to: 18,
        learning_time: '',
        materials_needed: '',
        success_evidence: [''],
        evidence_description: '',
        rights_restriction: 0,
        rights_description: ''
      }
    };


      $scope.activity = new InquiryActivityService();


      $scope.saveActivity = function(activity){
        activity.post_title = $scope.formData.title;
        activity.post_content = $scope.formData.description;
        activity.post_status = 'publish';
        activity.post_type = 'inq_activity';

        _.extend(activity, $scope.formData.extra);

        $scope.errors = null;
        $scope.updating = true;

        activity.$save(activity)
            .then(function(activity){
              console.log('LISATUD, uus id: ' + activity.data.success)
            }).catch(function(activity) {
              $scope.errors = [activity.data.error];
            }).finally(function() {
              $scope.updating = false;
              $scope.added = true;
              $scope.formData = {
                title: '',
                description: '',
                extra: {
                  domains: [''],
                  topic: '',
                  languages: [''],
                  proficiency_level: [''],
                  covered_phases: [''],
                  departing_phases: [''],
                  age_range_from: 7,
                  age_range_to: 18,
                  learning_time: '',
                  materials_needed: '',
                  success_evidence: [''],
                  evidence_description: '',
                  rights_restriction: 0,
                  rights_description: ''
                }
              };
            });
      };






   /* $http.get('/api/wp-json/posts?type[]=inquiry_activities')
      .success(function(data, status, headers, config){
        $scope.data = data;
        //window.alert("Success! " + status);
      })
      .error(function(data, status, headers, config){
        console.log('BIG Error getting JSON data from WP ' + status);
      });*/

  });


