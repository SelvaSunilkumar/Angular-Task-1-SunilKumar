var app = angular.module('taskOne', ['ngRoute']);

app.component('navLinks', {
    template: '<ul class="nav justify-content-center">' +
                '<li class="nav-item"> '+
                    '<a class="nav-link" href="#/all-profile">All Profiles</a>'+
                '</li>'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="#/add/profile">Add Profile</a>'+
                '</li>'+
           ' </ul>'
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/all-profile', {
        templateUrl:'all_profile.htm',
        controller:'all-profile'
    }).when('/profile/:empId', {
        templateUrl:'my-profile.htm',
        controller:'my-profile'
    }).when('/add/profile', {
        templateUrl:'add-profile.htm',
        controller:'add-profile'
    });
}]);

app.controller('all-profile', ['$scope', '$http', function($scope, $http) {
    $scope.profiles = null;
    $http.get("http://localhost:3000/profiles").success(function(response) {
        $scope.profiles = response;
    });
}]);

app.controller('my-profile', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.profile = null;
    let empId = $routeParams.empId;
    console.log(empId);
    $http.get("http://localhost:3000/profiles/" + empId).success(function(response) {
        $scope.profile = response;
    });
}]);    

app.controller('add-profile', ['$scope', '$http', function($scope, $http) {

    $scope.addProfile = function() {
        if ($scope.profile.id.length < 7) {
            alert("Emp Id : Low number of letters");
            return;
        }
        
        console.log("submiting");
        let profileData = $scope.profile;
        $http.post("http://localhost:3000/profiles", profileData).success(function(response) {
            console.log(response);
        });
    }

}]);