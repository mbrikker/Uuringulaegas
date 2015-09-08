'use strict';

/**
 * @ngdoc function
 * @name arkofinquiryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the arkofinquiryApp
 */
angular.module('arkofinquiryApp')
  .controller('MainCtrl', function ($rootScope, LoginService, $route, $scope) {

    $rootScope.developerView = true; // Set to 'true' to see hidden raw data

    $scope.userLoaded = false;

    $scope.$on('$locationChangeStart', function(event) {
      getLoggedInUser();
    });

    function getLoggedInUser(){
      LoginService.getLoggedInUser('', function(data){
        // Success
        $rootScope.loggedIn = true;
        $rootScope.currentUserData = data;
        $scope.userLoaded = true;
      }, function(error){
        // Error (not logged in)
        $rootScope.loggedIn = false;
        $scope.userLoaded = true;
      });
    }

    $rootScope.langStrings = {
      inqLog: {
        passportStatus: {
          1: 'recommended activity',
          2: 'requested activity',
          3: 'accepted activity',
          4: 'Started activity',
          5: 'Completed activity',
          6: 'reviewed evidence for',
          7: 'graded activity',
          8: 'Received a badge for',
          9: 'Advanced to level'
        },
        groupPageStatus: {
          1: 'recommended activity',
          2: 'requested activity',
          3: 'accepted activity',
          4: 'started activity',
          5: 'completed activity',
          6: 'reviewed evidence for',
          7: 'graded activity',
          8: 'received a badge for',
          9: 'Advanced to level'
        }
      },
      inqAct: {
        location: {
          0: 'Web-based',
          1: 'Physical location'
        },
        domains: {
          astronomy: 'Astronomy',
          biology: 'Biology',
          chemistry: 'Chemistry',
          ecology: 'Ecology',
          evolution: 'Evolution',
          geology: 'Geology',
          paleontology: 'Paleontology',
          physics: 'Physics',
          geometry: 'Geometry',
          logic: 'Logic',
          probability: 'Probability',
          statistics: 'Statistics',
          computer_science: 'Computer science',
          materials_science: 'Materials science',
          engineering: 'Engineering',
          technology: 'Technology',
          mathematics: 'Mathematics',
          anatomy: 'Anatomy',
          arts: 'Arts',
          grammar: 'Grammar',
          social_sciences: 'Social sciences',
          botany: 'Botany',
          geophysics: 'Geophysics',
          algebra: 'Algebra',
          calculus: 'Calculus',
          trigonometry: 'Trigonometry'
        },
        languages: {
          est: 'Estonian',
          eng: 'English',
          fin: 'Finnish',
          rus: 'Russian'
        },
        levels: {
          1: 'Basic',
          2: 'Advanced',
          3: 'Expert'
        },
        coveredPhases: {
          1: 'Orientation',
          2: 'Conceptualisation',
          3: 'Investigation',
          4: 'Conclusion',
          5: 'Discussion'
        },
        departingPhases: {
          1: 'Orientation',
          2: 'Conceptualisation',
          3: 'Investigation',
          4: 'Conclusion',
          5: 'Discussion'
        },
        successEvidence: {
          1: 'Direct empirical evidence',
          2: 'Indirect empirical evidence',
          3: 'Theoretical evidence',
          4: 'Ecological evidence'
        },
        rightsRestrictions: {
          0: 'No',
          1: 'Yes'
        }
      },
      user: {
        roles: {
          teacher: 'Teacher',
          learner: 'Learner'
        },
        countries: {
          AD: "Andorra",
          AE: "United Arab Emirates",
          AF: "Afghanistan",
          AG: "Antigua and Barbuda",
          AI: "Anguilla",
          AL: "Albania",
          AM: "Armenia",
          AN: "Netherlands Antilles",
          AO: "Angola",
          AQ: "Antarctica",
          AR: "Argentina",
          AS: "American Samoa",
          AT: "Austria",
          AU: "Australia",
          AW: "Aruba",
          AX: "Åland Islands",
          AZ: "Azerbaijan",
          BA: "Bosnia and Herzegovina",
          BB: "Barbados",
          BD: "Bangladesh",
          BE: "Belgium",
          BF: "Burkina Faso",
          BG: "Bulgaria",
          BH: "Bahrain",
          BI: "Burundi",
          BJ: "Benin",
          BM: "Bermuda",
          BN: "Brunei Darussalam",
          BO: "Bolivia",
          BR: "Brazil",
          BS: "Bahamas",
          BT: "Bhutan",
          BV: "Bouvet Island",
          BW: "Botswana",
          BY: "Belarus",
          BZ: "Belize",
          CA: "Canada",
          CC: "Cocos (Keeling) Islands",
          CD: "Congo, The Democratic Republic of the",
          CF: "Central African Republic",
          CG: "Congo",
          CH: "Switzerland",
          CI: "Cote D'Ivoire",
          CK: "Cook Islands",
          CL: "Chile",
          CM: "Cameroon",
          CN: "China",
          CO: "Colombia",
          CR: "Costa Rica",
          CS: "Serbia and Montenegro",
          CU: "Cuba",
          CV: "Cape Verde",
          CX: "Christmas Island",
          CY: "Cyprus",
          CZ: "Czech Republic",
          DE: "Germany",
          DJ: "Djibouti",
          DK: "Denmark",
          DM: "Dominica",
          DO: "Dominican Republic",
          DZ: "Algeria",
          EC: "Ecuador",
          EE: "Estonia",
          EG: "Egypt",
          EH: "Western Sahara",
          ER: "Eritrea",
          ES: "Spain",
          ET: "Ethiopia",
          FI: "Finland",
          FJ: "Fiji",
          FK: "Falkland Islands (Malvinas)",
          FM: "Micronesia, Federated States of",
          FO: "Faroe Islands",
          FR: "France",
          GA: "Gabon",
          GB: "United Kingdom",
          GD: "Grenada",
          GE: "Georgia",
          GF: "French Guiana",
          GG: "Guernsey",
          GH: "Ghana",
          GI: "Gibraltar",
          GL: "Greenland",
          GM: "Gambia",
          GN: "Guinea",
          GP: "Guadeloupe",
          GQ: "Equatorial Guinea",
          GR: "Greece",
          GS: "South Georgia and the South Sandwich Islands",
          GT: "Guatemala",
          GU: "Guam",
          GW: "Guinea-Bissau",
          GY: "Guyana",
          HK: "Hong Kong",
          HM: "Heard Island and Mcdonald Islands",
          HN: "Honduras",
          HR: "Croatia",
          HT: "Haiti",
          HU: "Hungary",
          ID: "Indonesia",
          IE: "Ireland",
          IL: "Israel",
          IM: "Isle of Man",
          IN: "India",
          IO: "British Indian Ocean Territory",
          IQ: "Iraq",
          IR: "Iran, Islamic Republic Of",
          IS: "Iceland",
          IT: "Italy",
          JE: "Jersey",
          JM: "Jamaica",
          JO: "Jordan",
          JP: "Japan",
          KE: "Kenya",
          KG: "Kyrgyzstan",
          KH: "Cambodia",
          KI: "Kiribati",
          KM: "Comoros",
          KN: "Saint Kitts and Nevis",
          KP: "Korea, Democratic People's Republic of",
          KR: "Korea, Republic of",
          KW: "Kuwait",
          KY: "Cayman Islands",
          KZ: "Kazakhstan",
          LA: "Lao People's Democratic Republic",
          LB: "Lebanon",
          LC: "Saint Lucia",
          LI: "Liechtenstein",
          LK: "Sri Lanka",
          LR: "Liberia",
          LS: "Lesotho",
          LT: "Lithuania",
          LU: "Luxembourg",
          LV: "Latvia",
          LY: "Libyan Arab Jamahiriya",
          MA: "Morocco",
          MC: "Monaco",
          MD: "Moldova, Republic of",
          MG: "Madagascar",
          MH: "Marshall Islands",
          MK: "Macedonia, The Former Yugoslav Republic of",
          ML: "Mali",
          MM: "Myanmar",
          MN: "Mongolia",
          MO: "Macao",
          MP: "Northern Mariana Islands",
          MQ: "Martinique",
          MR: "Mauritania",
          MS: "Montserrat",
          MT: "Malta",
          MU: "Mauritius",
          MV: "Maldives",
          MW: "Malawi",
          MX: "Mexico",
          MY: "Malaysia",
          MZ: "Mozambique",
          NA: "Namibia",
          NC: "New Caledonia",
          NE: "Niger",
          NF: "Norfolk Island",
          NG: "Nigeria",
          NI: "Nicaragua",
          NL: "Netherlands",
          NO: "Norway",
          NP: "Nepal",
          NR: "Nauru",
          NU: "Niue",
          NZ: "New Zealand",
          OM: "Oman",
          PA: "Panama",
          PE: "Peru",
          PF: "French Polynesia",
          PG: "Papua New Guinea",
          PH: "Philippines",
          PK: "Pakistan",
          PL: "Poland",
          PM: "Saint Pierre and Miquelon",
          PN: "Pitcairn",
          PR: "Puerto Rico",
          PS: "Palestinian Territory, Occupied",
          PT: "Portugal",
          PW: "Palau",
          PY: "Paraguay",
          QA: "Qatar",
          RE: "Reunion",
          RO: "Romania",
          RU: "Russian Federation",
          RW: "Rwanda",
          SA: "Saudi Arabia",
          SB: "Solomon Islands",
          SC: "Seychelles",
          SD: "Sudan",
          SE: "Sweden",
          SG: "Singapore",
          SH: "Saint Helena",
          SI: "Slovenia",
          SJ: "Svalbard and Jan Mayen",
          SK: "Slovakia",
          SL: "Sierra Leone",
          SM: "San Marino",
          SN: "Senegal",
          SO: "Somalia",
          SR: "Suriname",
          ST: "Sao Tome and Principe",
          SV: "El Salvador",
          SY: "Syrian Arab Republic",
          SZ: "Swaziland",
          TC: "Turks and Caicos Islands",
          TD: "Chad",
          TF: "French Southern Territories",
          TG: "Togo",
          TH: "Thailand",
          TJ: "Tajikistan",
          TK: "Tokelau",
          TL: "Timor-Leste",
          TM: "Turkmenistan",
          TN: "Tunisia",
          TO: "Tonga",
          TR: "Turkey",
          TT: "Trinidad and Tobago",
          TV: "Tuvalu",
          TW: "Taiwan, Province of China",
          TZ: "Tanzania, United Republic of",
          UA: "Ukraine",
          UG: "Uganda",
          UM: "United States Minor Outlying Islands",
          US: "United States",
          UY: "Uruguay",
          UZ: "Uzbekistan",
          VA: "Holy See (Vatican City State)",
          VC: "Saint Vincent and the Grenadines",
          VE: "Venezuela",
          VG: "Virgin Islands, British",
          VI: "Virgin Islands, U.S.",
          VN: "Vietnam",
          VU: "Vanuatu",
          WF: "Wallis and Futuna",
          WS: "Samoa",
          YE: "Yemen",
          YT: "Mayotte",
          ZA: "South Africa",
          ZM: "Zambia",
          ZW: "Zimbabwe"
        }
      }

    }

  });
