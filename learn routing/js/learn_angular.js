/*
*
* Author: Justin Goldsmith | DotSlashDesign
*
* File: learn_angular.js
* Purpose: This is file contains all the routing and controllers
*          for the learnAngular app I'm working on while teaching
*          myself AngularJS
*
* Feedback: Please send feedback to justin@justingoldsmith.net
*
*/

//-- Initialize main module - still learning about modules.
//-- Not entirely sure when to use more than one module.
//-- ngRoute is passed in to the contructor function as a
//-- single item array to provide app-wide global routing.
var app = angular.module("aTodoList", ['ngRoute']);


//-- $routeProvider is a built in module (class?) that provides
//-- routing functionality from ngRoute
//-- Not entirely sure what $locationProvider does really, still trying to figure that out
app.config(['$routeProvider', '$locationProvider',  
  function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $locationProvider.html5Mode(false);

    $routeProvider.
      when('/', {templateUrl: './partials/main.html'}).
      when('/todo', {templateUrl: './partials/todo.html', controller: 'todoCtrl'}).
      when('/third', {templateUrl: './partials/third.html'});
}]);



//-- BEGIN GLOBAL APP MAIN CONTROLLER
app.controller("MainCtrl", function($scope, $location) {
  //console.log($location.url())

  //-- A simple function to repeat items by any number passed in when it's called (currently using in ng-repeat)
  $scope.ngRpt = function(num) {
    return new Array(num);
  }

  //-- Set the navbar link belonging to the current page to active to preserve highlighting across refresh
  //-- and initially set active on "Home" when page is newly loaded. 
  if($location.url() === '/') {
    $('#home-li').addClass('active');
  } else if($location.url() === '/todo') {
    $('#todo-li').addClass('active');
  } else if($location.url() === '/third') {
    $('#third-li').addClass('active');
  }

  //-- Enact the routing when a navbar link is clicked - callable in any clickable element on any page
  //-- currently only in use on the navbar.
  $scope.setRoute = function(route) {
    $location.path(route);

    //-- Set highlighting on navbar link belonging to current page and show/hide the search bar
    //-- depending on which page is in view.
    switch($location.path()) {
      case '/':
        $('.navbar-form').css({'visibility':'hidden'});
        $('#todo-li').removeClass('active');
        $('#third-li').removeClass('active')
        $('#home-li').addClass('active');
        break;
      case '/todo':
        $('.navbar-form').css({'visibility':'visible'});
        $('#todo-li').addClass('active');
        $('#third-li').removeClass('active')
        $('#home-li').removeClass('active');
        break;
      case '/third':
        $('.navbar-form').css({'visibility':'hidden'});
        $('#todo-li').removeClass('active');
        $('#third-li').addClass('active')
        $('#home-li').removeClass('active');
      default:
        $('.navbar-form').css({'visibility':'hidden'});
        break;
    }
  }


  $scope.invertColumns = function() {
    $('#main-col-1').toggleClass('col-lg-8').toggleClass('col-lg-3');
    $('#main-col-2').toggleClass('col-lg-3').toggleClass('col-lg-8');
  }

  $scope.smallerImg = function() {
    $('.promo-img').css({'width':'100px', 'height':'100px'});
    $('.promo-image').css({'width':'100px', 'height':'100px'});
  }
  $scope.largerImg = function() {
    $('.promo-img').css({'width':'200px', 'height':'200px'});
    $('.promo-image').css({'width':'200px', 'height':'200px'});
  }
  $scope.normalImg = function() {
    $('.promo-img').css({'width':'150px', 'height':'150px'});
    $('.promo-image').css({'width':'150px', 'height':'150px'});
  }
});
//-- END GLOBAL APP MAIN CONTROLLER


//-- BEGIN TODO LIST PARTIAL CONTROLLER
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

    console.log(category.value);
    console.log(newTask);

    switch (category.value) {
      case "Home":
        //alert('"' + newTask.value + '"' + ' has been added to ' + category.value);
        $scope.task_data[0].tasks.push($scope.newTask);
        //$scope.$broadcast($scope.task_data[0].tasks.update);
        console.log($scope.task_data[0].tasks);
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
//-- END TODO LIST PARTIAL CONTROLLER
