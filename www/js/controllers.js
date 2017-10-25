const site = 'http://localhost:3000';
var user = [];

angular.module('starter.controllers', [])

.controller('AppCtrl', function() {

})

.controller('PlaylistsCtrl', function($scope) {

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

    var holeRoute = site+'/users/login/'+mail+'/'+pwd;
    console.log(holeRoute);

    $http.get(site+'/users/login/'+mail+'/'+pwd).
    then(function(resultado) {
        vm.mail = resultado.data.msg;
        vm.pwd = resultado.data.code;

        if (resultado.data.code == 3){
          //Credenciales correctas
          user = resultado.data.user;
          $state.go('app.signup'); 
          console.log(user);
          console.log(resultado.data.user);
  
        }
    });


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
