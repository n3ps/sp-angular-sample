(function () {
    'use strict';

    // define factory
    var serviceId = 'courseService';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', 'courseTopicService', courseService]);

    function courseService($rootScope, $http, $resource, $q, config, common, courseTopicService) {

        // init factory
        init();

        // service public signature
        return {
            getCourses: getCourses,
            createCourse: createCourse,
            getCourseById: getCourseById,
            deleteCourse: deleteCourse,
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getCourses() {

            var deferred = $q.defer();

            $.ajax({
                type: "GET",
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Course')/items",
                headers: { "Accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data.d.results);
                    common.logger.log("Retrieved Course items", data, serviceId);
                },
                error: function (data) {
                    deferred.reject(error);
                    common.logger.logError("Unable to retrieve Course items", error, serviceId);
                }
            });

            return deferred.promise;
        }

        function createCourse(newCourse) {

            var deferred = $q.defer();
            var fullUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Course')/items";
            var itemType = "SP.Data.CourseListItem";

            newCourse.Topics = [];
            newCourse.Topics.push('Test1');
            newCourse.Topics.push('Test2');

            var cat = {
                "__metadata": { "type": itemType },
                "Title": newCourse.CourseName,
                "Location": newCourse.Location,
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

                    angular.forEach(newCourse.Topics, function (key, value) {
                        var newCourseTopic = { Topic : key, CourseId : data.d.Id };

                        courseTopicService.createCourseTopic(newCourseTopic);
                    });
                },
                error: function (xhr) {
                    deferred.reject('Error : (' + xhr.status + ') ' + xhr.statusText + ' Message: ' + xhr.responseJSON.error.message.value);
                }
            });

            return deferred.promise;
        }

        function getCourseById(listTitle, itemID) {

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

        function deleteCourse(listTitle, courseId) {
            var deferred = $q.defer();

            this.getCourseById(listTitle, courseId).then(
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
                            deferred.resolve(courseId);
                        },
                        error: function (xhr) {
                            deferred.reject('Error : (' + xhr.status + ') ' + xhr.statusText + ' Message: ' + xhr.responseJSON.error.message.value);
                        }
                    });

                });
            return deferred.promise;
        }

        function updateTestData(listTitle, testData) {
            var deferred = $q.defer();

            this.getTestDataById(listTitle, testData.Id).then(
                function (data1) {

                    var itemType = "SP.Data." + listTitle + "ListItem";
                    var cat = {
                        '__metadata': { "type": itemType },
                        'FirstName': testData.FirstName,
                        'LastName': testData.LastName,
                        'ProvinceId': testData.Province.Id
                    };

                    $.ajax({
                        url: data1.d.__metadata.uri,
                        type: "POST",
                        contentType: "application/json;odata=verbose",
                        data: JSON.stringify(cat),
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                            "X-HTTP-Method": "MERGE",
                            "If-Match": data1.d.__metadata.etag
                        },
                        success: function (data) {
                            deferred.resolve(testData);
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