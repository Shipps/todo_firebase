var app = angular.module("tasksApp", ['ngRoute', 'tasksAppControllers', 'todoAppServices', 'todoAppDirectives', 'firebase']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/new',{
        controller: 'newListController',
        templateUrl: 'partials/newTaskList.html'
    })
    .when('/task/:taskId',{
        controller: 'taskListController',
        templateUrl: 'partials/taskListDetails.html'
    })
    .otherwise({
        controller: 'displayTasksController',
        templateUrl: 'partials/displayTaskList.html'
    });
}]);


