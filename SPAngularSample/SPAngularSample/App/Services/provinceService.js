(function () {
    'use strict';

    // define factory
    var serviceId = 'provinceService';
    angular.module('app').factory(serviceId,
      ['$rootScope', '$http', '$resource', '$q', 'config', 'common', 'spContext', provinceService]);

    function provinceService($rootScope, $http, $resource, $q, config, common, spContext) {

        // init factory
        init();

        // service public signature
        return {
            getProvinces: getProvinces
        };

        // init service
        function init() {
            common.logger.log("service loaded", null, serviceId);
        }

        function getProvinces() {

            var deferred = $q.defer();

            $.ajax({
                type: "GET",
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Province')/items",
                headers: { "Accept": "application/json;odata=verbose" },
                success: function (data) {
                    deferred.resolve(data.d.results);
                    common.logger.log("Retrieved Province items", data, serviceId);
                },
                error: function (data) {
                    deferred.reject(error);
                    common.logger.logError("Unable to retrieve Province items", error, serviceId);
                }
            });

            return deferred.promise;
        }
    }
})();