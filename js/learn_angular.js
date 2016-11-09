/*
*
* Author: Justin Goldsmith | DotSlashDesign
*
* File: learn_angular.js
* Purpose: This file contains all the routing and controllers
*          for the learnAngular app I'm working on while teaching
*          myself AngularJS
*
* Feedback: Please send feedback to justin@dotslashdesign.com
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
  $('#home-li').addClass('active');

  if($location.url() === '/') {
    $('#home-li').addClass('active');
  } else if($location.url() === '/todo') {
    $('#home-li').toggleClass('active');
    $('#todo-li').addClass('active');
  } else if($location.url() === '/third') {
    $('#home-li').toggleClass('active');
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
    if ($('.promo-img').css('margin-left') == "80px") {
      $('.promo-img').css({'width':'100px', 'height':'100px', 'margin-left':'+=40px'});
      $('.promo-image').css({'width':'100px', 'height':'100px'});
    } else {
      if ($('.promo-img').css('width') == "100px") {
        alert('Already small.');
        return 0;
      } else {
        $('promo-img').css({'width':'100px', 'height':'100px'});
        $('promo-image').css({'width':'100px', 'height':'100px'});
      }
    }
  }
  $scope.largerImg = function() {
    if ($('.promo-img').css('width') == "200px") {
      alert('Already large.');
      return 0;
    } else {
      $('.promo-img').css({'width':'200px', 'height':'200px', 'margin-left':'-=40px'});
      $('.promo-image').css({'width':'200px', 'height':'200px'});
    }
  }
  $scope.normalImg = function() {

    if ($('.promo-img').css('margin-left') == "80px") {
      $('.promo-img').css({'width':'150px', 'height':'150px', 'margin-left':'+=40px'});
      $('.promo-image').css({'width':'150px', 'height':'150px'});
    } else {
      if ($('.promo-img').css('width') == "150px") {
        alert('Already normal.');
        return 0;
      } else {
        $('.promo-img').css({'width':'150px', 'height':'150px'});
        $('.promo-image').css({'width':'150px', 'height':'150px'});
      }
    }
  }

  function formatTime(hours) {
    if (hours == 12) {
      hours = "12";

      return hours;
    } else {
      hours = hours % 12;

      return hours;
    }
  }

  function addAMPM(hours) {
    if (hours > 12) {
      ampm = "AM";

      return ampm;
    } else {
      ampm = "PM";

      return ampm;
    }
  }

  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }

    return i;
  }

  function clock() {
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    var weekday = d.getDay();
    var year = d.getFullYear();
    var hours = formatTime(d.getHours());
    var mins = addZero(d.getMinutes());
    var secs = addZero(d.getSeconds());
    var ampm = addAMPM(hours);

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    //document.getElementById('date').innerHTML = days[weekday] + " " + months[month] + "/" + day + "/" + year + " " + hours + ':' + mins + ':' + secs + " " + ampm;

    setTimeout(clock, 1000);
  }

  var d = new Date();
  var month = d.getMonth();
  var day = d.getDate();
  var year = d.getFullYear();

  console.log(d);
  console.log(month);
  console.log(day);
  console.log(year);

  clock();
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

  $scope.addTask = function($event) {
    var category = document.getElementById('todo-category').value;
    var newTask = document.getElementById('new-task').value;

    console.log(category);
    console.log(newTask);

    switch (category) {
      case "Home":
        $scope.task_data[0].tasks.push($scope.newTask);

        category.value = "";
        newTask.value = "";
        break;
      case "School":
        $scope.task_data[1].tasks.push($scope.newTask);

        category.value = "";
        newTask.value = "";
        break;
      case "Work":
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

  $scope.removeTask = function($index, $event) {
    var taskParent = angular.element(event.target).parent().parent().attr('id');

    switch(taskParent) {
      case "Home":
        $scope.task_data[0].tasks.splice($index, 1);
        break;
      case "School":
        $scope.task_data[1].tasks.splice($index, 1);
        break;
      case "Work":
        $scope.task_data[2].tasks.splice($index, 1);
        break;
      default:
        alert('OOPS! Looks like something went wrong...try again?');
        break;
    }
  }
});
//-- END TODO LIST PARTIAL CONTROLLER
