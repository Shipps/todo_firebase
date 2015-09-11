var taskControllers = angular.module("tasksAppControllers", []);

taskControllers.controller("newListController", ['$rootScope', '$scope', '$location', '$firebaseArray' ,'taskListService', function($rootScope, $scope, $location, $firebaseArray, taskListService){
    $scope.taskListName = "";
    $scope.tasklist = [];
    $scope.taskName = "";
    
    var taskListObj = {};
    
    var url = 'https://taskApps.firebaseIO.com';
	var fireRef = new Firebase(url);

	// If using angular fire. Angularfire will provide additional features providing binding
	var angularFireRef = $firebaseArray(fireRef);
    $rootScope.TaskListRef = angularFireRef;
    
    
    $scope.addTask = function(event){
            $scope.tasklist.push({
                "name" : $scope.taskName,
                "completed" : false
            });
            $scope.taskName = "";
    }
    
    $scope.deleteTask = function(index) {
        $scope.tasklist.splice(index, 1);
    }
    
    $scope.save = function(){
        taskListObj[$scope.taskListName] = $scope.tasklist;
        $rootScope.TaskListRef = taskListService.addTaskInFireBase(angularFireRef, $scope.taskListName, taskListObj);
        taskListObj = {};
        $location.path("");
        
    }
    
    $scope.cancel = function(){
        $location.path("");
        
    }
    
}]);

taskControllers.controller("taskListController", ['$rootScope', '$scope', '$routeParams', '$location', '$firebaseArray', 'taskListService', function($rootScope, $scope, $routeParams, $location, $firebaseArray, taskListService){
    
    $scope.taskName = "";
    $scope.taskListName = $routeParams.taskId;
    
    var taskListObj = {};
    
    var url = 'https://taskApps.firebaseIO.com';
	var fireRef = new Firebase(url);

	// If using angular fire. Angularfire will provide additional features providing binding
	//$rootScope.TaskListRef = $firebaseArray(fireRef);
    
   $scope.currentListObj = $firebaseArray(fireRef);
    
   //var objRef = taskListService.getTaskListFromFireBase($scope.currentListObj, $scope.taskListName);
  taskListService.getTaskListFromFireBase($scope.currentListObj, $scope.taskListName);
  
    
    $scope.addTask = function(event){
        if (event.keyCode === 13) {
            $scope.currentListObj.push({
                "name" : $scope.taskName,
                "completed" : false
            });
            $scope.taskName = "";
        }
    }
    
    $scope.cancel = function(){
        $location.path("");
        
    }
     
    $scope.deleteTask = function(index) {
        $scope.currentListObj.splice(index, 1);
    }
    
     $scope.update = function(){
        taskListObj[$routeParams.taskId] = $scope.currentListObj;
        taskListService.setTaskListInLocalStorage( $routeParams.taskId, taskListObj);
        taskListObj = {};
        $location.path("");
        
    }
    
}]);

taskControllers.controller("displayTasksController", ['$rootScope', '$scope', '$location', '$firebaseArray', 'taskListService', function($rootScope, $scope, $location, $firebaseArray, taskListService){

    var url = 'https://taskApps.firebaseIO.com';
	var fireRef = new Firebase(url);

	// If using angular fire. Angularfire will provide additional features providing binding
    $rootScope.TaskListRef = $firebaseArray(fireRef);
    
    $scope.viewTaskList = function(path){
        $location.path(path);
    }
    
    $scope.deleteTaskList = function(key){
        $rootScope.TaskListRef = taskListService.deleteTaskListsFromFireBase($rootScope.TaskListRef, key);
        $location.path("");
    }
    
    $scope.launchList = function(path){
        $location.path(path);
    }
    
}]);
    