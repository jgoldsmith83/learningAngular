
var app = angular.module("aTodoList", []);

app.controller("todoCtrl", function($scope) {
  
  $scope.task_data = [
    {
      title: "Home",
      tasks: [
      "Paint the bedroom",
      "Cean out the garage",
      "Rake the yard"
      ]
    },
    {
      title: "School",
      tasks: [
      "Finish term paper",
      "Select classes for next semester",
      "Visit financial aid department"
      ]
    },
    {
      title: "Work",
      tasks: [
      "Finish project",
      "Ask boss for a raise",
      "Apply for developer jobs"
      ]
    }
  ];

  $scope.addTask = function() {
    var category = document.getElementById('todo-category');
    var newTask = document.getElementById('new-task').value;

    switch (category.value) {
      case "Home":
        //alert('"' + newTask.value + '"' + ' has been added to ' + category.value);
        $scope.task_data[0].tasks.push($scope.newTask.value);
        $scope.$broadcast($scope.task_data[0].tasks.update);
        //alert($scope.task_data[0].tasks);
        category.value = "";
        newTask.value = "";
        break;
      case "School":
        //alert('"' + newTask.value + '"' + ' has been added to ' + category.value);
        $scope.task_data[1].tasks.push($scope.newTask);
        category.value = "";
        newTask.value = "";
        break;
      case "Work":
        //alert('"' + newTask.value + '"' + ' has been added to ' + category.value);
        $scope.task_data[2].tasks.push($scope.newTask);
        category.value = "";
        newTask.value = "";
        break;
      default:
        alert("Please select a category...");
    }
  }

  $scope.completeTask = function($index, $event) {
    var textParent = angular.element(event.target).parent().parent().attr('id');

    $("#"+textParent+"-task-"+$index).css({'text-decoration':'line-through'});
  }

  $scope.removeTask = function(x) {
    var taskParent = angular.element(event.target).parent().parent().attr('id');

    console.log(x)

    switch(taskParent) {
      case "Home":
        $scope.task_data[0].tasks.splice(x, 1);
        break;
      default:
        alert('OOPS! Looks like something went wrong...try again?');
        break;
    }
  }
});
