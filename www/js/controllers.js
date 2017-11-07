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
        template: '<p>Aplique el estado correspondiente al ticket y confirme para guardar los cambios</p>' +
        '<ion-list>' +
        '<ion-radio ng-model="choice" ng-value="\'A\'">Choose A</ion-radio>' +
        '<ion-radio ng-model="choice" ng-value="\'B\'">Choose B</ion-radio>' +
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

  .controller('LoginCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup) {
    var vm = this;
    var mail = "";
    var pwd = "";

    vm.goToSignup = goToSignup;
    vm.doLogin = doLogin;

    // Functions
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

      $http.get(site + '/users/login/' + mail + '/' + pwd).
        then(function (resultado) {
          vm.mail = resultado.data.msg;
          vm.pwd = resultado.data.code;

          //El correo no existe en la base de datos
          if (resultado.data.code != 3) {
            doToast(resultado.data.msg);
          }

          //Credenciales correctas
          else if (resultado.data.code == 3) {
            user = resultado.data.user;
            //Universitario
            if (user.rol == 1) {
              state.go('app.uni');
            }
            //Responsable
            else if (user.rol == 2) {
              state.go('app.res');
            }
            //Bibliotecario
            else if (user.rol == 3) {
              state.go('app.bib');
            }
            //Administrador
            else if (user.rol == 4) {
              state.go('app.adm');
            }

            else {
              doToast('Ha ocurrido un problema al tratar de obtener su rol')
            }
          }
        });
    }
  })


  .controller('SignupCtrl', function ($scope, $stateParams, $state, $ionicPopup) {
    var vm = this;
    var names = "", lasts = "", mail = "", pwd = "", dep = "";





    //Declaración de funciones
    vm.goToLogin = goToLogin;
    vm.doSignup = doSignup;

    //Fucniones
    function doToast(string) {
      var alertPopup = $ionicPopup.alert({
        template: string
      });

      alertPopup.then(function (res) {
        //Do something
      });
    }

    function goToLogin() {
      $state.go('app.login');
    }

    function doSignup() {
      names = vm.names;
      lasts = vm.lasts;
      mail = vm.email;
      pwd = vm.pwd;
      dep = vm.dep;

      console.log(names, lasts, mail, pwd, dep);

      if (names == undefined) {
        doToast('names está bacio men');
      }


    }

  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
