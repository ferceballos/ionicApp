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

  .controller('uniIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup) {
    var vm = this;

  })

  .controller('LoginCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup) {
    var vm = this;
    var mail = "";
    var pwd = "";

    vm.goToSignup = goToSignup;
    vm.doLogin = doLogin;

    // Functions
    function doToast(string) {
      var toast = $ionicPopup.show({
        title: string,
        buttons: [
          { text: 'OK' }
        ]
      });

      toast.then(function (res) {
        //Do something
      });
    }

    function goToSignup() {
      $state.go('app.signup');
    }

    function doLogin() {

      mail = vm.mail;
      pwd = vm.pwd;

      var resultado = [];

      $http.get(site + '/users/login/' + mail + '/' + pwd).
        then(function (resultado) {
          vm.mail = "";
          vm.pwd = "";

          //El correo no existe en la base de datos
          if (resultado.data.code != 3)
            doToast(resultado.data.msg)
          else if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          //Credenciales correctas
          else if (resultado.data.code == 3) {
            user = resultado.data.user

            //Universitario
            if (user.rol == 1)
              $state.go('app.uni')

            //Responsable
            else if (user.rol == 2)
              $state.go('app.res')

            //Bibliotecario
            else if (user.rol == 3)
              $state.go('app.bib')

            //Administrador
            else if (user.rol == 4)
              $state.go('app.adm')

            else
              doToast('Ha ocurrido un problema al tratar de obtener su rol')
          }
        });
    }
  })


  .controller('SignupCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup) {
    var vm = this;
    var names = "", lasts = "", mail = "", pwd = "", dep = "";
    var depOptions = [];



    //Declaración de funciones
    vm.goToLogin = goToLogin;
    vm.doSignup = doSignup;

    //Funciones

    //Obtener todas las dependencias de la BD
    var resultado = [];
    $http.get(site + '/users/getDep').
      then(function (resultado) {
        var depOptions = resultado.data.dependencies;
        console.log('devOptions', depOptions)

        $scope.select = {
          availableOptions: depOptions
        };
      });

    function doAlert(string) {
      var alertPopup = $ionicPopup.show({
        title: string,
        buttons: [
          { text: 'OK' }
        ]
      });

      alertPopup.then(function (res) {
        goToLogin()
      });
    }

    function doToast(string) {
      var toast = $ionicPopup.show({
        title: string,
        buttons: [
          { text: 'OK' }
        ]
      });

      toast.then(function (res) {
        //Do something
      });
    }

    function goToLogin() {
      $state.go('app.login');
    }

    function doSignup() {
      name = vm.name;
      mail = vm.email;
      pwd = vm.pwd;
      dep = vm.dep;

      console.log(names, lasts, mail, pwd, dep);

      if (names == undefined)
        doToast('Por favor, introduzca un nombre');
      else if (mail == undefined)
        doToast('Por favor,  ingrese un correo');
      else if (!mail.includes('@ucol.mx'))
        doToast('El correo debe contener \'@ucol.mx\' ');
      else if (pwd == undefined)
        doToast('Defina una contraseña');
      else if (dep == undefined)
        doToast('Eliga la dependencia a la que pertenece (o la más cercana a usted)');

      //Todos los datos han sido introducidos
      else {
        var resultado = [];
        $http.get(site + '/users/signup/' + name + '/' + mail + '/' + pwd + '/1/' + dep).
          then(function (resultado) {
            if (resultado.data.code == 2) {
              doToast(resultado.data.msg)
            }

            else if (resultado.data.code == 1) {
              doAlert(resultado.data.msg)
            }
          });

      }
    }

  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
