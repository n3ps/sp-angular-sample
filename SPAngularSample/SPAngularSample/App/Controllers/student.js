(function () {
    'use strict';

    // define controller
    var controllerId = "student";
    angular.module('app').controller(controllerId,
      ['$scope', '$location', '$routeParams', 'common', 'studentService', student]);

    // create controller
    function student($scope, $location, $routeParams, common, studentService) {

        var vm = this;

        vm.getStudents = getStudents;
        vm.saveStudent = saveStudent;
        vm.deleteStudent = deleteStudent;
        vm.getStudentById = getStudentById;

        init();

        getStudents();

        if ($routeParams.id) {
            getStudentById($routeParams.id);
        }

        function init() {
            common.logger.log("controller loaded", null, controllerId);
            common.activateController([], controllerId);
        }

        function getStudents() {
            
            var promise = studentService.getStudents();

            promise.then(function (data) {
                if (data) {
                    vm.students = data;
                } else {
                    throw new Error('error obtaining data');
                }
            }).catch(function (error) {
                common.logger.logError('error obtaining items', error, controllerId);
            });
        }

        function saveStudent(newStudent) {

            var promise = studentService.createStudent(newStudent);

            promise.then(function () {
                common.logger.logSuccess("Saved item.", null, controllerId);
            })
            .then(function () {
                $location.path('/StudentList');
            });
        }

        function deleteStudent(studentId) {

            var promise = studentService.deleteStudent('Student', studentId);

            promise.then(function () {
                common.logger.logSuccess("Deleted item.", null, controllerId);
            })
            .then(function () {
                $location.path('/StudentList');
            });

        }

        function getStudentById(studentId) {

            var promise = studentService.getStudentById('Student', studentId);

            promise.then(function (data) {
                if (data) {
                    vm.Student = data.d;
                } else {
                    throw new Error('error obtaining data');
                }
            });
        }
    };

})();