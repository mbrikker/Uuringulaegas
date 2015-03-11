'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:InquiryActivitiesCtrl
 * @description
 * # InquiryActivitiesCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('InquiryActivitiesCtrl', function ($scope, $http, InquiryActivityService) {

    // Set up form options
    $scope.formOptions = {
      domains: [
        'Chemistry',
        'Engineering',
        'Biology',
        'Physics',
        'Mathematics',
        'Electricity'
      ],
      languages: [
        'Estonian',
        'English',
        'Finnish',
        'Russian'
      ],
      levels: [
        'Basic',
        'Advanced',
        'Expert'
      ],
      coveredPhases: [
        'Orientation',
        'Conceptualisation',
        'Investigation',
        'Conclusion',
        'Discussion'
      ],
      departingPhases: [
        '',
        'Orientation',
        'Conceptualisation',
        'Investigation',
        'Conclusion',
        'Discussion'
      ],
      successEvidence: [
        'Direct empirical evidence',
        'Indirect empirical evidence',
        'Theoretical evidence',
        'Ecological evidence'
      ],
      rightsRestrictions: {
        0: 'No',
        1: 'Yes'
      }
    };


    // Set up empty formData object
    resetForm();

    // Create new Activity Service
    $scope.activity = new InquiryActivityService();


    /*
      postingState variable:
      0 - Not yet posted
      1 - Success
      2 - Error
     */
    $scope.postingState = 0; // Not posted

    // Save new Inquiry Activity
    $scope.saveActivity = function(activity){
      $scope.errors = null;
      $scope.updating = true;

      // Set post data that has different keys from form extra data
      activity.post_title = $scope.formData.title;
      activity.post_content = $scope.formData.description;
      activity.post_status = 'publish';
      activity.post_type = 'inq_activity';

      // append form data object to activity object (same keys)
      _.extend(activity, $scope.formData.extra);

      // POST to DP
      activity.$save(activity, function() {
        // success
        $scope.postingState = 1; // OK
        $scope.updating = false;
        console.log("OK"); // -------------------------------------- REMOVE after debugging

        resetForm();
      }, function(activity){
        // error
        $scope.postingState = 2; // Error
        $scope.updating = false;
        console.log("ERROR"); // -------------------------------------- REMOVE after debugging
      });
    };


    // Function for resetting/emptying form fields
    function resetForm(){
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
          rights_restrictions: 0,
          rights_description: ''
        }
      };
    }
  });

