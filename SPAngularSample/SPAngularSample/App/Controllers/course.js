(function () {
    'use strict';

    // define controller
    var controllerId = "course";
    angular.module('app').controller(controllerId,
      ['$scope', '$location', '$routeParams', 'common', 'courseService', course]);

    // create controller
    function course($scope, $location, $routeParams, common, courseService) {

        var vm = this;

        vm.getCourses = getCourses;
        vm.saveCourse = saveCourse;
        vm.deleteCourse = deleteCourse;

        vm.newCourseTopic = "";
        vm.courseTopics = [];

        init();

        getCourses();

        vm.addCourseTopic = function() {
            vm.courseTopics.push({ courseTopicList: newCourseTopic });
        } 

        function init() {
            common.logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
        }

        function getCourses() {
            
            var promise = courseService.getCourses();

            promise.then(function (data) {
                if (data) {
                    vm.courses = data;
                } else {
                    throw new Error('error obtaining data');
                }
            }).catch(function (error) {
                common.logger.logError('error obtaining items', error, controllerId);
            });
        }

        function saveCourse(newCourse) {

            var promise = courseService.createCourse(newCourse);

            promise.then(function () {
                common.logger.logSuccess("Saved item.", null, controllerId);
            })
            .then(function () {
                $location.path('/CourseList');
            });
        }

        function deleteCourse(courseId) {

            var promise = courseService.deleteCourse('Course', courseId);

            promise.then(function () {
                common.logger.logSuccess("Deleted item.", null, controllerId);
            })
            .then(function () {
                $location.path('/CourseList');
            });

        }

        // handle save action
        function updateTestData(newTestData) {

            var promise = testDataService.updateTestData('TestData', newTestData);

            promise.then(function () {
                common.logger.logSuccess("Saved item.", null, controllerId);
            })
            .then(function () {
                $location.path('/TestDataList');
            });
        }

        $scope.edit = function (newTestData) {
            $scope.testData = angular.copy(newTestData);
        }
    };

})();