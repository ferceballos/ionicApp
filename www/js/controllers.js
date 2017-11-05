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
  vm.goToStudent = goToStudent;
  vm.goToRecovery = goToRecovery;

  function goToSignup(){
    $state.go('app.signup');
  }
  function goToStudent(){
    $state.go('app.student');
  }
  function goToRecovery(){
    $state.go('app.recovery');
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
        console.log(resultado.data);
        vm.mail="";
        vm.pwd="";
        if (resultado.data.code == 3){
          //Credenciales correctas
          user = resultado.data.user;
          $state.go('app.student');
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

.controller('RecoveryCtrl', function($scope, $stateParams, $state) {

})
.controller('newTicketCtrl', function($scope, $stateParams, $state) {

})

.controller('StudentCtrl', function($scope, $stateParams, $state) {
  var vm = this;
  var user = vm.user;
  var message = vm.message;
  console.log("recibi mensaje y mensaje es igual a"+ message);
  vm.Logout = Logout ;
  vm.goToTicket = goToTicket;
  vm.goToNewTicket = goToNewTicket;

  function goToTicket(){
    $state.go('app.ticket');
  }
  function goToNewTicket(){
    $state.go('app.newTicket');
  }

  function Logout(){
    console.log("entre a la funcion");
    $state.go('app.login');
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
