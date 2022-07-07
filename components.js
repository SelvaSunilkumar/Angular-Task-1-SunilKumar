app.component('navLinks', {
    template: '<ul class="nav justify-content-center">' +
                '<li class="nav-item"> '+
                    '<a class="nav-link" href="#/all-profile">All Profiles</a>'+
                '</li>'+
                '<li class="nav-item">'+
                    '<a class="nav-link" href="#/add/profile">Add Profile</a>'+
                '</li>'+
            '</ul>'
});

app.component('profileInfo', {
    template:   '<div class="profile-detail">' + 
                    '<span class="profile-title"> {{ $ctrl.name }} </span>' +
                    '<span class="profile-info">{{ $ctrl.value }}</span>' +
                '</div>',
    bindings: {
        value : '<',
        name : '@'
    }
});

app.component('inputWarning', {
    template: '<span class="input-warning">' +
                    '** {{ $ctrl.message }}' +
                '</span>',
    bindings: {
        message : '@'
    }
});