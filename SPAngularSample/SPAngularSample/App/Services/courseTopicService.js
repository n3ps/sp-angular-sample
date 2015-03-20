(function () {
    'use strict';

    // define factory
    var serviceId = 'courseTopicService';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', courseTopicService]);

    function courseTopicService($rootScope, $http, $resource, $q, config, common) {

        // init factory
        init();

        // service public signature
        return {
            getCourseTopicsById: getCourseTopicsById,
            createCourseTopic: createCourseTopic,
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getCourseTopicsById() {

            var deferred = $q.defer();

            $.ajax({
                type: "GET",
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CourseTopics')/items",
                headers: { "Accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data.d.results);
                    common.logger.log("Retrieved Course Topic items", data, serviceId);
                },
                error: function (data) {
                    deferred.reject(error);
                    common.logger.logError("Unable to retrieve Course Topic items", error, serviceId);
                }
            });

            return deferred.promise;
        }

        function createCourseTopic(newCourseTopic) {

            var deferred = $q.defer();
            var fullUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('CourseTopics')/items";
            var itemType = "SP.Data.CourseTopicsListItem";

            var cat = {
                "__metadata": { "type": itemType },
                "Topic": newCourseTopic.Topic,
                "CourseId": newCourseTopic.CourseId,
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
    }
})();