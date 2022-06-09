var app = angular.module('taskOne', ['ngRoute']);

app.run(['$rootScope', '$location', 'requestService', '$routeParams', function($rootScope, $location, requestService, $routeParams) {
    $rootScope.$on('$routeChangeStart', function(event, current) {
        //current.$$route.withAccess = false;
        if (current.$$route.withAccess) {
            let empId = $routeParams.empId;
            let locationUrl = $location.path();
            let locationPaths = locationUrl.split('/');
            console.log(locationPaths[2]);
            requestService.getEmployeeProfile(locationPaths[2]).then(function(response) {
                if (response === null) {
                    event.preventDefault();
                    $location.path('/');
                } 
            });
            /*event.preventDefault();
            $location.path('/');*/
        }
    });
}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/all-profile', {
        templateUrl:'all_profile.htm',
        controller:'all-profile'
    }).when('/profile/:empId', {
        templateUrl:'my-profile.htm',
        controller:'my-profile',
        withAccess: true
    }).when('/add/profile', {
        templateUrl:'add-profile.htm',
        controller:'add-profile'
    });
}]);

app.controller('all-profile', ['$scope', 'requestService', function($scope, requestService) {
    $scope.profiles = null;
    requestService.getAllProfile().then(function(response) {
        $scope.profiles = response.data;
    });
}]);

app.controller('my-profile', ['$scope', '$routeParams', 'requestService', function($scope, $routeParams, requestService) {
    $scope.profile = null;
    let empId = $routeParams.empId;
    console.log(empId);
    requestService.getEmployeeProfile(empId).then(function(response) {
        $scope.profile = response.data;
    });

    $scope.editProfileName = function() {
        requestService.editEmployeeProfileName($scope.profile, empId).then(function(response) {
            console.log(response);
        });
    }
}]);    

app.controller('add-profile', ['$scope', 'requestService', function($scope, requestService) {

    $scope.addProfile = function() {
        if ($scope.profile.id.length < 7) {
            alert("Emp Id : Low number of letters");
            return;
        }
        requestService.addEmployeeProfile($scope.profile).then(function(response) { console.log(response); });
    }

}]);