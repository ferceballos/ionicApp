const site = 'localhost:3000';

angular.module('starter.controllers', [])

.controller('AppCtrl', function() {

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('LoginCtrl', function($scope, $stateParams, $state, $http) {
  var vm = this;    
  var mail = "";
  var pwd = "";
  
  vm.goToSignup = goToSignup;
  vm.doLogin = doLogin;

  function goToSignup(){
    $state.go('app.signup');
  }

  function doLogin(){

    mail = vm.mail;
    pwd = vm.pwd;

    console.log(site);
    console.log(mail);
    console.log(pwd);

    var resultado = [];

    $http.get(site+'/users/login/'+mail+'/'+pwd)
      .succes(function(resultado){
        console.log(resultado);
      });

      console.log(resultado);
  }
})


.controller('SignupCtrl', function($scope, $stateParams, $state) {
  var vm = this;

  vm.goToLogin = goToLogin;

  function goToLogin(){
    $state.go('app.login');
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
