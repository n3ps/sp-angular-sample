
(function () {
    'use strict';

    var app = angular.module('app');

    // get all the routes
    app.constant('routes', getRoutes());

    // config routes & their resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);

    function routeConfigurator($routeProvider, routes) {
        routes.forEach(function (route) {
            $routeProvider.when(route.url, route.config);
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // build the routes
    function getRoutes() {
        return [
          {
              url: '/',
              config: {
                  templateUrl: '../Style%20Library/App/Views/dashboard.html',
                  title: 'dashboard',
                  settings: {
                      nav: 0,
                      content: 'dashboard',
                      quickLaunchEnabled: false
                  }
              }
          },
          {
              url: '/Home',
              config: {
                  templateUrl: '../Style%20Library/App/Views/dashboard.html',
                  title: 'Home',
                  settings: {
                      nav: 1,
                      content: 'Home',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/TestDataList',
              config: {
                  templateUrl: '../Style%20Library/App/Views/testDataList.html',
                  title: 'TestData List',
                  settings: {
                      nav: 1,
                      content: 'TestData List',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/TestDataCreate',
              config: {
                  templateUrl: '../Style%20Library/App/Views/testDataCreate.html',
                  title: 'TestData Create',
                  settings: {
                      nav: 1,
                      content: 'TestData Create',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/TestDataEdit/:id',
              config: {
                  templateUrl: '../Style%20Library/App/Views/testDataEdit.html',
                  title: 'TestData Edit',
                  settings: {
                      nav: 1,
                      content: 'TestData Edit',
                      quickLaunchEnabled: false
                  }
              }
          },
          {
              url: '/CourseList',
              config: {
                  templateUrl: '../Style%20Library/App/Views/courseList.html',
                  title: 'Course List',
                  settings: {
                      nav: 1,
                      content: 'Course List',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/CourseCreate',
              config: {
                  templateUrl: '../Style%20Library/App/Views/courseCreate.html',
                  title: 'Course Create',
                  settings: {
                      nav: 1,
                      content: 'Course Create',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/StudentList',
              config: {
                  templateUrl: '../Style%20Library/App/Views/studentList.html',
                  title: 'Student List',
                  settings: {
                      nav: 1,
                      content: 'Student List',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/StudentCreate',
              config: {
                  templateUrl: '../Style%20Library/App/Views/studentCreate.html',
                  title: 'Student Create',
                  settings: {
                      nav: 1,
                      content: 'Student Create',
                      quickLaunchEnabled: true
                  }
              }
          },
          {
              url: '/StudentEdit/:id',
              config: {
                  templateUrl: '../Style%20Library/App/Views/studentEdit.html',
                  title: 'Student Edit',
                  settings: {
                      nav: 1,
                      content: 'Student Edit',
                      quickLaunchEnabled: true
                  }
              }
          },
        ];
    }
})();