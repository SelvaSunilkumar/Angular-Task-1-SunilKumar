app.service("requestService", ['$http',function($http) {   
    this.getAllProfile = function() {
        return $http.get("http://localhost:3000/profiles").success(function(response) {
            return response;
        });
    }

    this.getEmployeeProfile = function(empId) {
        return $http.get("http://localhost:3000/profiles/" + empId).success(function(response) {
            return response;
        }).catch(function(response) {
            return null;
        });
    }

    this.addEmployeeProfile = function(profile) {
        return $http.post("http://localhost:3000/profiles", profile).success(function(response) {
            console.log(response);
        });
    }

    this.editEmployeeProfileName = function(profile, empId) {
        return $http.put("http://localhost:3000/profiles/" + empId, profile).success(function(response) {
            console.log(response);
        });
    }
}]);