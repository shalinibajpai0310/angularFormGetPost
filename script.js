// Code goes here

var app = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.controller('myCtrl', function($scope, $q, postUserDetail, $uibModal) {
  $scope.formInfo = {};
  $scope.submit = function() {
    alert(JSON.stringify($scope.formInfo));
    postUserDetail.postDetails($scope.formInfo).then(function(res) {
      alert("posted Successfully");
    }, function(error) {
      alert("Bad Request");
      window.location.reload();
    })


  }

  $scope.getPrevData = function() {
    postUserDetail.getUserData().then(function(res) {
      $uibModal.open({
        templateUrl: 'info.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
          items: function() {
            return res;
          }
        }
      });

    }, function(err) {
      alert("Bad GET REQUEST");
    })
  }
});


app.factory('postUserDetail', function($http, $q) {

  var postUser = {};
  postUser.postDetails = function(userData) {
      var defer = $q.defer();
      var options = {
        url: './data.json',
        method: 'POST',
        data: userData
      };

      $http(options).then(function(response) {
        defer.resolve();
      }, function(error) {
        defer.reject();
      })

      return defer.promise;
    },

    postUser.getUserData = function() {
      var defer = $q.defer();
      var options = {
        url: "./data.json",
        method: 'GET',

      };

      $http(options).then(function(response) {
        defer.resolve(response.data);
      }, function(error) {
        defer.reject();
      })

      return defer.promise;
    }

  return postUser;

})


app.controller('ModalInstanceCtrl', function($scope, items) {
  $scope.info = items;
})