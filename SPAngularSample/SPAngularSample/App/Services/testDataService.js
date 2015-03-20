(function () {
    'use strict';

    // define factory
    var serviceId = 'testDataService';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', 'spContext', testDataService]);

    function testDataService($rootScope, $http, $resource, $q, config, common, spContext) {

        // init factory
        init();

        // service public signature
        return {
            getTestDataItems: getTestDataItems,
            createTestDataItem: createTestDataItem,
            getTestDataById: getTestDataById,
            deleteTestData: deleteTestData,
            updateTestData: updateTestData,
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getTestDataItems() {

            var deferred = $q.defer();

            $.ajax({
                type: "GET",
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TestData')/items",
                headers: { "Accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data.d.results);
                    common.logger.log("retrieved TestData Items", data, serviceId);
                },
                error: function (data) {
                    deferred.reject(error);
                    common.logger.logError("Unable to retrieve TestData items", error, serviceId);
                }
            });

            return deferred.promise;
        }

        function createTestDataItem(testData) {

            var deferred = $q.defer();
            var fullUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('TestData')/items";
            var itemType = "SP.Data.TestDataListItem";

            var cat = {
                "__metadata": { "type": itemType },
                "FirstName": testData.FirstName,
                "LastName": testData.LastName,
                "ProvinceId": testData.Province.Id
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

        function getTestDataById(listTitle, itemID) {

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

        function deleteTestData(listTitle, testDataId) {
            var deferred = $q.defer();

            this.getTestDataById(listTitle, testDataId).then(
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
                            deferred.resolve(testDataId);
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