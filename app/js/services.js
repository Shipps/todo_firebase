var todoServices = angular.module("todoAppServices", []);

todoServices.factory('taskListService', [function() {
    
    var unique_key = "todoList";
    var taskLists = {};
    
    var factory = {
        addTaskInFireBase: function (angularFireRef, taskListName, taskListObj) {
            // If only firebase
           /* fireRef.push({
                "taskListName": taskListName
            });*/
        
            angularFireRef.$add({
                title: taskListName,
                completed: false,
                details: JSON.stringify(taskListObj)
            });
            
            return angularFireRef;
        },
        updateTaskListInLocalStorage: function(taskListObj){
            localStorage.removeItem(unique_key);
            localStorage.setItem(unique_key,  JSON.stringify(taskListObj));
            
        },
        getTaskListFromFireBase: function(angularFireRef, taskListKey){
           angularFireRef.forEach(function (todo) {
			if (todo.title === taskListKey) {
				angularFireRef = JSON.parse(todo.details)[taskListKey];
        	}
		});
        },
        getAllTaskListsFromLocalStorage: function(){
          console.log("called");
        },
        deleteTaskListsFromFireBase: function(angularFireRef, taskListName){
           // Removing object with key from firebase
            angularFireRef.forEach(function (todo) {
                if (todo.title === taskListName) {
                    angularFireRef.$remove(todo);
                    return angularFireRef;
                  /*  angularFireRef.on('child_removed', function(oldChildSnapshot) {
                        return angularFireRef;
                    });*/
       
                }
		  });
        }
    };
    
    return factory;
 
}]);