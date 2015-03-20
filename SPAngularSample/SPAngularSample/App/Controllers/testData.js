(function () {
    'use strict';

    // define controller
    var controllerId = "testData";
    angular.module('app').controller(controllerId,
      ['$scope', '$location', '$routeParams', 'common', 'testDataService', 'provinceService', testData]);

    // create controller
    function testData($scope, $location, $routeParams, common, testDataService, provinceService) {

        var vm = this;

        vm.createTestDataItem = createTestDataItem;
        vm.getTestDataItems = getTestDataItems;
        vm.deleteTestDataItem = deleteTestDataItem;
        vm.updateTestData = updateTestData;
        vm.getTestDataById = getTestDataById;

        init();

        getProvinces();

        getTestDataItems();

        $scope.provinces = [];

        if ($routeParams.id) {
            getTestDataById($routeParams.id);
        }

        // init controller
        function init() {
            common.logger.log("controller loaded", null, controllerId);
            //common.activateController([], controllerId);
        }

        function getProvinces() {

            var promise = provinceService.getProvinces();

            promise.then(function (data) {
                if (data) {
                    $scope.provinces = data;
                } else {
                    throw new Error('error obtaining data');
                }
            }).catch(function (error) {
                common.logger.logError('error obtaining items', error, controllerId);
            });
        }

        function getTestDataItems() {
            
            var promise = testDataService.getTestDataItems();

            promise.then(function (data) {
                if (data) {
                    vm.TestDataItems = data;
                } else {
                    throw new Error('error obtaining data');
                }
            }).catch(function (error) {
                common.logger.logError('error obtaining items', error, controllerId);
            });
        }

        // handle save action
        function createTestDataItem(newTestData) {

            var promise = testDataService.createTestDataItem(newTestData);

            promise.then(function () {
                common.logger.logSuccess("Saved item.", null, controllerId);
            })
            .then(function () {
                $location.path('/TestDataList');
            });
        }

        function deleteTestDataItem(testDataId) {

            var promise = testDataService.deleteTestData('TestData', testDataId);

            promise.then(function () {
                common.logger.logSuccess("Deleted item.", null, controllerId);
            })
            .then(function () {
                $location.path('/TestDataList');
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

        function getTestDataById(testDataId) {

            var promise = testDataService.getTestDataById('TestData', testDataId);

            promise.then(function (data) {
                if (data) {
                    vm.TestData = data.d;
                } else {
                    throw new Error('error obtaining data');
                }
            });
        }
    };

})();