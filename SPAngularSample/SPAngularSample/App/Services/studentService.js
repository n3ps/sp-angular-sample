(function () {
    'use strict';

    // define factory
    var serviceId = 'studentService';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', studentService]);

    function studentService($rootScope, $http, $resource, $q, config, common) {

        // init factory
        init();

        // service public signature
        return {
            getStudents: getStudents,
            createStudent: createStudent,
            getStudentById: getStudentById,
            deleteStudent: deleteStudent,
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getStudents() {

            var deferred = $q.defer();

            $.ajax({
                type: "GET",
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Student')/items",
                headers: { "Accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data.d.results);
                    common.logger.log("Retrieved Student items", data, serviceId);
                },
                error: function (data) {
                    deferred.reject(error);
                    common.logger.logError("Unable to retrieve Student items", error, serviceId);
                }
            });

            return deferred.promise;
        }

        function createStudent(newStudent) {

            var deferred = $q.defer();
            var fullUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Student')/items";
            var itemType = "SP.Data.StudentListItem";

            var cat = {
                "__metadata": { "type": itemType },
                "FirstName": newStudent.FirstName,
                "LastName": newStudent.LastName,
            };

            $.ajax({
                url: fullUrl,
                type: "POST",
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(cat),
                headers: {
                    "Accept": "application/json;odata=verbose", // return data format
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    deferred.resolve(data.d);
                },
                error: function (xhr) {
                    deferred.reject('Error : (' + xhr.status + ') ' + xhr.statusText + ' Message: ' + xhr.responseJSON.error.message.value);
                }
            });

            return deferred.promise;
        }

        function getStudentById(listTitle, itemID) {

            var deferred = $q.defer();
            var fullUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/Items('" + itemID + "')";

            $.ajax({
                url: fullUrl,
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (xhr) {
                    deferred.reject('Error : (' + xhr.status + ') ' + xhr.statusText + ' Message: ' + xhr.responseJSON.error.message.value);
                }
            });

            return deferred.promise;
        }

        function deleteStudent(listTitle, studentId) {
            var deferred = $q.defer();

            this.getStudentById(listTitle, studentId).then(
                function (data1) {
                    $.ajax({
                        url: data1.d.__metadata.uri,
                        type: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "X-HTTP-Method": "DELETE",
                            "If-Match": data1.d.__metadata.etag
                        },
                        success: function (data) {
                            deferred.resolve(studentId);
                        },
                        error: function (xhr) {
                            deferred.reject('Error : (' + xhr.status + ') ' + xhr.statusText + ' Message: ' + xhr.responseJSON.error.message.value);
                        }
                    });

                });
            return deferred.promise;
        }
    }
})();