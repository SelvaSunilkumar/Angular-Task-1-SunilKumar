var app = angular.module('taskOne', ['ngRoute']);

app.run(['$rootScope', '$location', 'requestService', '$routeParams', function($rootScope, $location, requestService, $routeParams) {
    $rootScope.$on('$routeChangeStart', function(event, current) {
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

app.controller('my-profile', ['$scope', '$routeParams', 'requestService', '$q', function($scope, $routeParams, requestService, $q) {
    $scope.profile = null;

    $scope.status = "Active";
    $scope.statusClass = "text-success";

    let empId = $routeParams.empId;

    console.log(empId);
    requestService.getEmployeeProfile(empId).then(function(response) {
        $scope.profile = response.data;
    });

    $scope.editInputField = function() {
        this.editField = (this.editField) ? false : true;
    }

    function verifyName(name) {
        var q = $q.defer();
        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        setTimeout(function() {
            format.test(name) ? q.reject("Name contains special Characters.") : q.resolve("Editing");
        }, 100);
        return q.promise;
    }

    $scope.editProfileName = function() {
        verifyName($scope.profile.name)
            .then(function(response) {
                $scope.status = "Editing";
                $scope.statusClass = "text-warning";
                setTimeout(function() {
                    requestService.editEmployeeProfileName($scope.profile, empId).then(function(response) {
                        console.log(response);
                        $scope.status = "Active";
                        $scope.statusClass = "text-success";
                    });
                }, 2000);
                
            })
            .catch(function(failure) {
                console.log(failure)
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