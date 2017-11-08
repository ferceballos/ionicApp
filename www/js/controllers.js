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

  .controller('uniIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $ionicActionSheet) {
    var vm = this;

    reloadUniTickets();


    //Obtener los reportes de un usuario
    var resultado = [];
    var depOptions = [];



    //Declarations of functions
    vm.goToUni = goToUni;
    vm.goToCreate = goToCreate;
    vm.showActionSheet = showActionSheet;
    vm.showAddSheet = showAddSheet;

    //Functions

    function reloadUniTickets(params) {
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;
            console.log('devOptions', depOptions)


            $scope.ticketsOfUni = {
              availableOptions: depOptions
            };
            $scope.$apply();


            console.log('avaliablaoptions', $scope.ticketsOfUni.availableOptions);


          }
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

    function goToUni() {
      $state.go('app.uni')
    }

    function goToCreate(params) {
      $state.go('app.addTicket');
    }

    function showActionSheet() {
      $ionicActionSheet.show({
        titleText: 'ActionSheet Example', buttons: [{ text: '<i class="icon ion-share"></i> Share' }, { text: '<i class="icon ion-arrow-move"></i> Move' },], destructiveText: 'Delete', cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          return true;
        }, destructiveButtonClicked: function () {
          console.log('DESTRUCT');
          return true;
        }
      });
    };

    function showAddSheet() {
      $state.go('app.addTicket');
    };

  })



  .controller('uniAddTicketCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $ionicActionSheet) {
    var vm = this;

    //Declarations of functions
    vm.goToUni = goToUni;
    vm.goToCreate = goToCreate;
    vm.addTicket = addTicket;
    vm.showActionSheet = showActionSheet;
    vm.showAddSheet = showAddSheet;

    //Functions

    function reloadUniTickets(params) {
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;
            console.log('devOptions', depOptions)


            $scope.ticketsOfUni = {
              availableOptions: depOptions
            };
            $scope.$apply();


            console.log('avaliablaoptions', $scope.ticketsOfUni.availableOptions);


          }
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

    function goToUni() {
      $state.go('app.uni')
    }

    function goToCreate(params) {
      $state.go('app.addTicket');
    }

    function addTicket() {
      var peti = vm.asunto;
      var init = vm.mensaje;

      // validar que exista un asunto
      if (peti == undefined || init == "") {
        doToast('El asunto es obligatorio');
      }

      else {
        if (init == undefined || init == "")
          init = "No fue necesario explicar más a fondo.";



        var resultado = [];

        $http.get(site + '/tickets/create/' + peti + '/' + init + '/' + user.id).
          then(function (resultado) {
            //Limpiar campos
            vm.asunto = undefined;
            vm.mensaje = undefined;

            console.log(resultado.data.code);
            console.log(resultado.data.msg);
            //Problema al crear el ticket
            if (resultado.data.code == 2)
              doToast(resultado.data.msg)

            //Ticket creado con éxito
            else if (resultado.data.code == 1) {
              reloadUniTickets();
              $state.go('app.uni');

            }

          });
      }
    }

    function showActionSheet() {
      $ionicActionSheet.show({
        titleText: 'ActionSheet Example', buttons: [{ text: '<i class="icon ion-share"></i> Share' }, { text: '<i class="icon ion-arrow-move"></i> Move' },], destructiveText: 'Delete', cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          return true;
        }, destructiveButtonClicked: function () {
          console.log('DESTRUCT');
          return true;
        }
      });
    };

    function showAddSheet() {
      $state.go('app.addTicket');
      //uniAddTicketCtrl
    };

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
