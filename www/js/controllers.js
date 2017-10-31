const site = 'http://localhost:3000';
var user = [];

angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function () {

  })

  .controller('PlaylistsCtrl', function ($scope) {

  })

  .controller('ContentCtrl', function ($scope, $ionicPopup) {
    var vm = this;

    vm.showEdit = showEdit;

    // A confirm dialog
    function showEdit() {
      var editPopup = $ionicPopup.confirm({
        title: 'Cambiar estado de ticket',
        template: '<p>Aplique el estado correspondiente al ticket y confirme para guardar los cambios</p>'+
        '<ion-list>'+
        '<ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio>'+
        '<ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio>'+
      '</ion-list>'
        
      });

      editPopup.then(function (res) {
        if (res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };

  })

  .controller('LoginCtrl', function ($scope, $stateParams, $state, $http) {
    var vm = this;
    var mail = "";
    var pwd = "";

    vm.goToSignup = goToSignup;
    vm.doLogin = doLogin;

    function goToSignup() {
      $state.go('app.signup');
    }

    function doLogin() {

      mail = vm.mail;
      pwd = vm.pwd;

      console.log(site);
      console.log(mail);
      console.log(pwd);
      var resultado = [];

      var holeRoute = site + '/users/login/' + mail + '/' + pwd;
      console.log(holeRoute);

      $http.get(site + '/users/login/' + mail + '/' + pwd).
        then(function (resultado) {
          vm.mail = resultado.data.msg;
          vm.pwd = resultado.data.code;

          if (resultado.data.code == 3) {
            //Credenciales correctas
            user = resultado.data.user;
            $state.go('app.browse');
          }
        });


    }
  })


  .controller('SignupCtrl', function ($scope, $stateParams, $state) {
    var vm = this;

    vm.goToLogin = goToLogin;

    function goToLogin() {
      $state.go('app.login');
    }
  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
