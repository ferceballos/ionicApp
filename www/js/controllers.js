const site = 'http://localhost:3000';
var user = [];

angular.module('starter.controllers', ['ionic', 'chart.js', 'ionic-toast', 'ionic-datepicker'])



  .controller('AppCtrl', function () {

  })

  .controller('PlaylistsCtrl', function ($scope) {

  })

  .controller('WelcomeCtrl', function ($scope) {

  })

  .controller('admPermisosCtrl', function ($scope, $stateParams, $state, $http, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicActionSheet) {
    var vm = this;

    vm.goToPermisos = goToPermisos;
    vm.goToConsultas = goToConsultas;
    vm.goToStats = goToStats;



    //Functions

    function goToPermisos() {

    }

    function goToConsultas() {
      $ionicViewSwitcher.nextDirection('forward');

      $state.go('app.adm')
    }

    function goToStats() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('app.stats')
    }


    getResponsables()
    getBibliotecarios()
    getStudents()

    function getBibliotecarios() {
      var resultado = [];

      $http.get(site + '/users/getLibrarians').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.bibliotecarios = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }

    function getStudents() {
      var resultado = [];

      $http.get(site + '/users/getStudents').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.students = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }

    function getResponsables() {
      var resultado = [];

      $http.get(site + '/users/getResponsables').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.responsables = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }


    //Declarations of functions
    vm.goToRes = goToRes;
    vm.doLibrarian = doLibrarian;

    vm.doStudent = doStudent;
    vm.doResponsable = doResponsable;


    //Functions
    function doLibrarian(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de universitario ' + userid + ' a bibliotecario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 3).
        then(function (resultado) {
          getResponsables()
          getBibliotecarios()
          getStudents()
        });
    }

    function doResponsable(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de biblio ' + userid + ' a responsable')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 2).
        then(function (resultado) {
          getResponsables()
          getBibliotecarios()
          getStudents()
        });
    }

    function doStudent(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de bibliotecario ' + userid + ' a universitario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 1).
        then(function (resultado) {
          getResponsables()
          getBibliotecarios()
          getStudents()
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

    function goToRes() {
      $state.go('app.res')
    }





  })


  .controller('StatsCtrl', function ($ionicScrollDelegate, $state, $ionicViewSwitcher, $scope, ionicToast, ionicDatePicker, $http) {
    var vm = this;

    console.log('entre a stats ctrl')
    vm.goToPermisos = goToPermisos;
    vm.goToConsultas = goToConsultas;
    vm.goToStats = goToStats;



    //Functions

    function goToPermisos() {
      console.log('go to permisos')
      $ionicViewSwitcher.nextDirection('back');
      $state.go('app.admPermisos')
    }

    function goToConsultas() {
      console.log('go to consultar')
      $ionicViewSwitcher.nextDirection('back');

      $state.go('app.adm')
    }

    function goToStats() {
      console.log('go to stats')
    }



    //Tickets
    $scope.tickets = 1392

    //Variables que componen la gráfica de los meses
    $scope.c1labels = ["May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov"];
    $scope.c1data = [[28, 48, 40, 19, 86, 27, 90]];
    $scope.c1series = ['Tickets'];

    //Gráfica dona de los estados
    $scope.c2labels = ["Nuevos", "En proceso", "Cerrados"];
    $scope.c2data = [20, 30, 50];

    //Grafica de estrellas
    $scope.c3labels = ["1", "2", "3", "4", "5"];
    $scope.c3data = [30, 56, 45, 60, 100];
    $scope.c3series = ['Series A', 'Series B'];


    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    }

    $scope.showToast = function () {
      var nIntervId;
      nIntervId = setInterval(dataTest, 1000);

      ionicToast.show('Activando numeros de muestra.', 'top', false, 2500);
    }

    function dataTest() {
      $scope.tickets = Math.floor((Math.random() * 3000) + 600);
      $scope.c1data = [[Math.floor((Math.random() * 30) + 1), Math.floor((Math.random() * 50) + 1), Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 25) + 1), Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 40) + 1), Math.floor((Math.random() * 100) + 1)]];

      $scope.c2data = [Math.floor((Math.random() * 25) + 1), Math.floor((Math.random() * 40) + 1), Math.floor((Math.random() * 80) + 1)];

      $scope.c3data = [Math.floor((Math.random() * 30) + 1), Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 50) + 1), Math.floor((Math.random() * 60) + 1), Math.floor((Math.random() * 100) + 1)];
      
    }




    var ipObj1 = {
      callback: function (fechaInicio) {
        console.log('Fecha 1 : ' + fechaInicio);
        console.log('Fecha 2 : ' + new Date(fechaInicio));



        var date = new Date(fechaInicio);
        date.setMonth(date.getMonth() + 1)

        var dateToShow = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        $scope.fechaInicio = dateToShow
        var formattedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        var formattedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        console.log(formattedDate);

      },
      mondayFirst: true,
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nov", "Dic"],
      showTodayButton: true,
      setLabel: 'OK',
      todayLabel: 'HOY',
      closeLabel: '<i class="icon ion-android-close"></i>',
      from: new Date(2016, 1, 1),
      to: new Date(2025, 10, 30),
      templateType: 'popup'
    };

    var ipObj2 = {
      callback: function (fechaFinal) {


        $scope.c1data = [[200, 20, 40, 100, 90, 20, 14]];
        $scope.c2data = [69, 23, 39];
        $scope.tickets = 724
        //Mandatory

        var date = new Date(fechaFinal);
        date.setMonth(date.getMonth() + 1)

        var dateToShow = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        $scope.fechaFinal = dateToShow
        var formattedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

        console.log('date', date)
        console.log('date.getDate', date.getDate)
        console.log('dateToShow', dateToShow)

        console.log('formattedDate', formattedDate);

      },
      mondayFirst: true,
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nov", "Dic"],
      showTodayButton: true,
      setLabel: 'OK',
      todayLabel: 'HOY',
      closeLabel: '<i class="icon ion-android-close"></i>',
      from: new Date(2016, 1, 1),
      to: new Date(2025, 10, 30),
      templateType: 'popup'
    };

    $scope.openDPInit = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.openDPFinal = function () {
      ionicDatePicker.openDatePicker(ipObj2);
    };




  })



  // Content controller para el universitario

  .controller('ContentCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope, $stateParams, $interval, $ionicScrollDelegate) {

    //Variables
    var vm = this;
    var messageInput = "";
    var allMessages = [];
    var chatMessages = "";
    var count = 0;

    //Methods declaration
    vm.goToMenu = goToMenu;
    vm.uniEditTi = uniEditTi;
    vm.uniCalificar = uniCalificar;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;
    vm.stopLoading = stopLoading;



    var nIntervId;
    nIntervId = setInterval(loader, 1000);


    function loader() {
      console.log(count);
      count++;
      getMessages()
      getHeaderInformation()
    }

    function stopLoading() {
      clearInterval(nIntervId);
    }



    function sendMessage() {
      console.log('sendMessage start')
      var resultado = [];
      messageInput = encodeURIComponent(vm.messageInput);
      vm.messageInput = "";
      console.log('user.id', user.id)
      console.log('Sending message to ', $stateParams.chatId)
      console.log('messageInput', messageInput)
      $http.get(site + '/tickets/mod/message/' + user.id + '/' + $stateParams.chatId + '/' + messageInput).
        then(function (resultado) {


          console.log('Mensaje enviado')
          allMessages = [];
          getMessages();
        });

      console.log('sendMessage end')
    }

    function getMessages() {
      console.log('getMessages start')
      var resultado = [];
      $http.get(site + '/tickets/get/messages/' + $stateParams.chatId).

        then(function (resultado) {

          if (resultado.data.code == 2) {
            allMessages = [];
            console.log('No messages on ticket ', $stateParams.chatId)
            console.log('No messages on ticket ', $stateParams.chatId)
            processMeesages(allMessages);
          }


          else if (resultado.data.mensajitos != undefined) {
            allMessages = [];
            allMessages = resultado.data.mensajitos;
            processMeesages(allMessages);
          }
        });
      console.log('getMessage end')
    }

    function processMeesages(recievedMessages) {
      console.log('processMeesages start')
      chatMessages = "";
      vm.chatMessages = "";

      for (var i = 0; i < recievedMessages.length; i++) {

        //Message from the logged user
        if (recievedMessages[i].userMsg == user.id) {
          chatMessages += '<div class="row ">' +
            '            <div class="col col-10 "></div>' +
            '            <div class="col card owner-container">' +
            '                <div class="item item-text-wrap owner">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '        </div>';
        }

        //Messages from the other user
        else {
          chatMessages += '<div class="row ">' +
            '            <div class="col card message-container">' +
            '                <div class="item item-text-wrap message">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '            <div class="col col-10 "></div>' +
            '        </div>';
        }
      }

      //Once the for loop ends (What's down didn't show up on the console)
      vm.chatMessages = chatMessages;

      console.log('processMeesages end')
      $ionicScrollDelegate.scrollBottom();
    }

    function goToMenu() {
      //$stateParams.chatId = undefined;
      vm.stopLoading();
      chatMessages = "";
      $state.go('app.uni');
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

    function getHeaderInformation() {
      var getHeaderResultado = [];
      //    /getbyfolio/:folio
      $http.get(site + '/tickets/getbyfolio/' + $stateParams.chatId).
        then(function (getHeaderResultado) {
          var allTickets = [];

          if (getHeaderResultado.data.code == 2)
            console.log(getHeaderResultado.data.msg)

          else {
            $rootScope.actualTicket = undefined;
            $rootScope.actualTicket = getHeaderResultado.data.ticketito;

            if ($rootScope.actualTicket[0].rate == undefined) {
              vm.rate = "<p>Sin calificar</p>";
            }
            else {
              vm.rate = '<p>' + $rootScope.actualTicket[0].rate + ' <i class="icon ion-star"></i></p> ';
            }


            vm.at = getHeaderResultado.data.ticketito[0];
          }
        });
    }





    //Methods that execute once the controller loads

    console.log('$stateParams.chatId', $stateParams.chatId)
    //Here the chatId gets life


    getMessages()
    getHeaderInformation()
    //loader()



    function uniEditTi() {
      $ionicActionSheet.show({
        titleText: 'Editar ticket', buttons: [{ text: '<i class="icon ion-android-star"></i> Calificar ticket' },], destructiveText: '<i class="icon ion-android-done"></i> Cerrar ticket', cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          uniCalificar()



          return true;
        }, destructiveButtonClicked: function () {
          console.log('$stateParams.chatId', $stateParams.chatId)
          console.log('DESTRUCT');
          var resultado = [];
          //Editar el status del ticket a cerrado

          $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/3').
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;

        }
      });
    }

    function uniCalificar() {
      $ionicActionSheet.show({
        titleText: 'Califique el servicio dado', buttons: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          var resultado = [];

          console.log('$stateParams.chatId', $stateParams.chatId);
          $http.get(site + '/tickets/mod/rate/' + $stateParams.chatId + '/' + (index + 1)).
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;
        }
      });
    }
  })


  //Controlador para el contenido de una consulta/ticket (Como bibliotecario)
  .controller('BibContentCtrl', function (ionicToast, $scope, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope, $stateParams, $interval) {

    //Variables
    var vm = this;
    var messageInput = "";
    var allMessages = [];
    var chatMessages = "";
    var count = 0;
    var count = 0;
    var nIntervId;

    //Method's declaration
    vm.goToMenu = goToMenu;
    vm.EditTi = EditTi;
    vm.uniCalificar = uniCalificar;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;
    vm.stopLoading = stopLoading;


    nIntervId = setInterval(loader, 1000); //Number of miliseconds in which iteration is set

    //Functions

    //Function to retrieve data to the view every iteration (defined above)
    function loader() {
      console.log(count);
      count++;
      getMessages()
      getHeaderInformation()
    }

    function stopLoading() {
      clearInterval(nIntervId);
    }


    function sendMessage() {
      console.log('sendMessage start')
      var resultado = [];
      messageInput = vm.messageInput;
      vm.messageInput = "";
      console.log('user.id', user.id)
      console.log('Sending message to ', $stateParams.chatId)
      console.log('messageInput', messageInput)
      $http.get(site + '/tickets/mod/message/' + user.id + '/' + $stateParams.chatId + '/' + encodeURIComponent(messageInput)).
        then(function (resultado) {

          console.log('Mensaje enviado')
          allMessages = [];
          getMessages();
        });

      console.log('sendMessage end')
    }

    function getMessages() {
      console.log('getMessages start')
      var resultado = [];
      $http.get(site + '/tickets/get/messages/' + $stateParams.chatId).

        then(function (resultado) {

          if (resultado.data.code == 2) {
            allMessages = [];
            console.log('No messages on ticket ', $stateParams.chatId)
            console.log('No messages on ticket ', $stateParams.chatId)
            processMeesages(allMessages);
          }


          else if (resultado.data.mensajitos != undefined) {
            allMessages = [];
            allMessages = resultado.data.mensajitos;
            processMeesages(allMessages);
          }
        });
      console.log('getMessage end')
    }

    function processMeesages(recievedMessages) {
      console.log('processMeesages start')
      chatMessages = "";
      vm.chatMessages = "";

      for (var i = 0; i < recievedMessages.length; i++) {

        //Message from the logged user
        if (recievedMessages[i].userMsg == user.id) {
          chatMessages += '<div class="row ">' +
            '            <div class="col col-10 "></div>' +
            '            <div class="col card owner-container">' +
            '                <div class="item item-text-wrap owner">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '        </div>';
        }

        //Messages from the other user
        else {
          chatMessages += '<div class="row ">' +
            '            <div class="col card message-container">' +
            '                <div class="item item-text-wrap message">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '            <div class="col col-10 "></div>' +
            '        </div>';
        }
      }

      //Once the for loop ends (What's down didn't show up on the console)
      vm.chatMessages = chatMessages;

      console.log('processMeesages end')
    }

    function goToMenu() {
      //$stateParams.chatId = undefined;
      stopLoading();
      chatMessages = "";
      $state.go('app.bib');
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

    function getHeaderInformation() {
      var getHeaderResultado = [];
      //    /getbyfolio/:folio
      $http.get(site + '/tickets/getbyfolio/' + $stateParams.chatId).
        then(function (getHeaderResultado) {
          var allTickets = [];

          if (getHeaderResultado.data.code == 2)
            doToast(getHeaderResultado.data.msg)

          else {
            $rootScope.actualTicket = undefined;
            $rootScope.actualTicket = getHeaderResultado.data.ticketito;

            if ($rootScope.actualTicket[0].rate == undefined) {
              vm.rate = "<p>Sin calificar</p>";
            }
            else {
              vm.rate = '<p>' + $rootScope.actualTicket[0].rate + ' <i class="icon ion-star"></i></p> ';
            }


            vm.at = getHeaderResultado.data.ticketito[0];
          }
        });
    }





    //Methods that execute once the controller loads

    console.log('$stateParams.chatId', $stateParams.chatId)
    //Here the chatId gets life


    getMessages()
    getHeaderInformation()
    //loader()




    function EditTi() {
      $ionicActionSheet.show({
        titleText: 'Editar ticket', buttons: [{ text: '<i class="icon ion-chatbox-working"></i> Atender' }], destructiveText: '<i class="icon ion-android-done"></i> Cerrar', cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {

          //atender
          if (index == 0 && vm.at.status == 'Cerrado') {
            ionicToast.show('No se puede atender un ticket cerrado', 'top', false, 3000);

          }
          else if (index == 0 && vm.at.status != 'Cerrado') {
            var resultado = [];
            //Editar el status del ticket a en proceso

            $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/2').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

            //Editar el bibliotecario que atiende el ticket
            $http.get(site + '/tickets/mod/librarian/' + $stateParams.chatId + '/' + user.id).
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          return true;
        },

        destructiveButtonClicked: function () {
          console.log('Boton de cerrar presionado')
          var resultado = [];
          //Editar el status del ticket a cerrado

          $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/3').
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;
        }
      });
    }

    function uniCalificar() {
      $ionicActionSheet.show({
        titleText: 'Califique el servicio dado', buttons: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          var resultado = [];

          console.log('$stateParams.chatId', $stateParams.chatId);
          $http.get(site + '/tickets/mod/rate/' + $stateParams.chatId + '/' + (index + 1)).
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;
        }
      });
    }
  })



  .controller('ResContentCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope, $stateParams, $interval) {

    //Variables
    var vm = this;
    var messageInput = "";
    var allMessages = [];
    var chatMessages = "";
    var count = 0;

    //Methods declaration
    vm.goToMenu = goToMenu;
    vm.EditTi = EditTi;
    vm.uniCalificar = uniCalificar;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;

    // vm.stopLoading = stopLoading;


    var nIntervId;
    nIntervId = setInterval(loader, 1000);


    function loader() {
      getMessages()
      getHeaderInformation()
    }

    function stopLoading() {
      clearInterval(nIntervId);
    }


    function sendMessage() {
      console.log('sendMessage start')
      var resultado = [];
      messageInput = vm.messageInput;
      vm.messageInput = "";
      console.log('user.id', user.id)
      console.log('Sending message to ', $stateParams.chatId)
      console.log('messageInput', messageInput)
      $http.get(site + '/tickets/mod/message/' + user.id + '/' + $stateParams.chatId + '/' + encodeURIComponent(messageInput)).
        then(function (resultado) {

          console.log('Mensaje enviado')
          allMessages = [];
          getMessages();
        });

      console.log('sendMessage end')
    }

    function getMessages() {
      console.log('getMessages start')
      var resultado = [];
      $http.get(site + '/tickets/get/messages/' + $stateParams.chatId).

        then(function (resultado) {

          if (resultado.data.code == 2) {
            allMessages = [];
            console.log('No messages on ticket ', $stateParams.chatId)
            console.log('No messages on ticket ', $stateParams.chatId)
            processMeesages(allMessages);
          }


          else if (resultado.data.mensajitos != undefined) {
            allMessages = [];
            allMessages = resultado.data.mensajitos;
            processMeesages(allMessages);
          }
        });
      console.log('getMessage end')
    }

    function processMeesages(recievedMessages) {
      console.log('processMeesages start')
      chatMessages = "";
      vm.chatMessages = "";

      for (var i = 0; i < recievedMessages.length; i++) {

        //Message from the logged user
        if (recievedMessages[i].userMsg == user.id) {
          chatMessages += '<div class="row ">' +
            '            <div class="col col-10 "></div>' +
            '            <div class="col card owner-container">' +
            '                <div class="item item-text-wrap owner">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '        </div>';
        }

        //Messages from the other user
        else {
          chatMessages += '<div class="row ">' +
            '            <div class="col card message-container">' +
            '                <div class="item item-text-wrap message">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '            <div class="col col-10 "></div>' +
            '        </div>';
        }
      }

      //Once the for loop ends (What's down didn't show up on the console)
      vm.chatMessages = chatMessages;

      console.log('processMeesages end')
    }

    function goToMenu() {
      //$stateParams.chatId = undefined;
      stopLoading()
      chatMessages = "";
      $state.go('app.res');
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

    function getHeaderInformation() {
      var getHeaderResultado = [];
      //    /getbyfolio/:folio
      $http.get(site + '/tickets/getbyfolio/' + $stateParams.chatId).
        then(function (getHeaderResultado) {
          var allTickets = [];

          if (getHeaderResultado.data.code == 2)
            doToast(getHeaderResultado.data.msg)

          else {
            $rootScope.actualTicket = undefined;
            $rootScope.actualTicket = getHeaderResultado.data.ticketito;

            if ($rootScope.actualTicket[0].rate == undefined) {
              vm.rate = "<p>Sin calificar</p>";
            }
            else {
              vm.rate = '<p>' + $rootScope.actualTicket[0].rate + ' <i class="icon ion-star"></i></p> ';
            }


            vm.at = getHeaderResultado.data.ticketito[0];
          }
        });
    }





    //Methods that execute once the controller loads

    console.log('$stateParams.chatId', $stateParams.chatId)
    //Here the chatId gets life


    getMessages()
    getHeaderInformation()
    //loader()



    function EditTi() {
      $ionicActionSheet.show({
        titleText: 'Editar ticket', buttons: [{ text: '<i class="icon ion-android-open"></i> Abrir' }, { text: '<i class="icon ion-android-done"></i> Cerrar' }, { text: '<i class="icon ion-android-person"></i> Asignar' }, { text: '<i class="icon ion-university"></i> Transferir' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          /*           abrir 0
                    cerrar 1
                    asignar 2
                    transferir 3
           */

          //abrir
          if (index == 0) {
            var resultado = [];
            //Editar el status del ticket a cerrado

            $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/2').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          //cerrar
          else if (index == 1) {
            var resultado = [];
            //Editar el status del ticket a cerrado

            $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/3').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          //asignar  mod/librarian/:idt/:idb
          else if (index == 2) {

            stopLoading();
            $rootScope.ticketAAsignar = $stateParams.chatId;
            console.log($rootScope.ticketAAsignar)
            $state.go("app.asignar")
          }

          //transferir
          else if (index == 3) {

          }




          return true;
        }
      });
    }

    function uniCalificar() {
      $ionicActionSheet.show({
        titleText: 'Califique el servicio dado', buttons: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          var resultado = [];

          console.log('$stateParams.chatId', $stateParams.chatId);
          $http.get(site + '/tickets/mod/rate/' + $stateParams.chatId + '/' + (index + 1)).
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;
        }
      });
    }
  })

  .controller('AdmContentCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope, $stateParams, $interval) {

    //Variables
    var vm = this;
    var messageInput = "";
    var allMessages = [];
    var chatMessages = "";
    var count = 0;

    //Methods declaration
    vm.goToMenu = goToMenu;
    vm.EditTi = EditTi;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;

    // vm.stopLoading = stopLoading;


    var nIntervId;
    nIntervId = setInterval(loader, 1000);


    function loader() {
      getMessages()
      getHeaderInformation()
    }

    function stopLoading() {
      clearInterval(nIntervId);
    }


    function sendMessage() {
      console.log('sendMessage start')
      var resultado = [];
      messageInput = vm.messageInput;
      vm.messageInput = "";
      console.log('user.id', user.id)
      console.log('Sending message to ', $stateParams.chatId)
      console.log('messageInput', messageInput)
      $http.get(site + '/tickets/mod/message/' + user.id + '/' + $stateParams.chatId + '/' + encodeURIComponent(messageInput)).
        then(function (resultado) {

          console.log('Mensaje enviado')
          allMessages = [];
          getMessages();
        });

      console.log('sendMessage end')
    }

    function getMessages() {
      console.log('getMessages start')
      var resultado = [];
      $http.get(site + '/tickets/get/messages/' + $stateParams.chatId).

        then(function (resultado) {

          if (resultado.data.code == 2) {
            allMessages = [];
            console.log('No messages on ticket ', $stateParams.chatId)
            console.log('No messages on ticket ', $stateParams.chatId)
            processMeesages(allMessages);
          }


          else if (resultado.data.mensajitos != undefined) {
            allMessages = [];
            allMessages = resultado.data.mensajitos;
            processMeesages(allMessages);
          }
        });
      console.log('getMessage end')
    }

    function processMeesages(recievedMessages) {
      console.log('processMeesages start')
      chatMessages = "";
      vm.chatMessages = "";

      for (var i = 0; i < recievedMessages.length; i++) {

        //Message from the logged user
        if (recievedMessages[i].userMsg == user.id) {
          chatMessages += '<div class="row ">' +
            '            <div class="col col-10 "></div>' +
            '            <div class="col card owner-container">' +
            '                <div class="item item-text-wrap owner">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '        </div>';
        }

        //Messages from the other user
        else {
          chatMessages += '<div class="row ">' +
            '            <div class="col card message-container">' +
            '                <div class="item item-text-wrap message">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '            <div class="col col-10 "></div>' +
            '        </div>';
        }
      }

      //Once the for loop ends (What's down didn't show up on the console)
      vm.chatMessages = chatMessages;

      console.log('processMeesages end')
    }

    function goToMenu() {
      //$stateParams.chatId = undefined;
      stopLoading()
      chatMessages = "";
      $state.go('app.adm');
    }

    function getHeaderInformation() {
      var getHeaderResultado = [];
      //    /getbyfolio/:folio
      $http.get(site + '/tickets/getbyfolio/' + $stateParams.chatId).
        then(function (getHeaderResultado) {
          var allTickets = [];

          if (getHeaderResultado.data.code == 2)
            doToast(getHeaderResultado.data.msg)

          else {
            $rootScope.actualTicket = undefined;
            $rootScope.actualTicket = getHeaderResultado.data.ticketito;

            if ($rootScope.actualTicket[0].rate == undefined) {
              vm.rate = "<p>Sin calificar</p>";
            }
            else {
              vm.rate = '<p>' + $rootScope.actualTicket[0].rate + ' <i class="icon ion-star"></i></p> ';
            }


            vm.at = getHeaderResultado.data.ticketito[0];
          }
        });
    }





    //Methods that execute once the controller loads

    console.log('$stateParams.chatId', $stateParams.chatId)
    //Here the chatId gets life


    getMessages()
    getHeaderInformation()
    //loader()



    function EditTi() {
      $ionicActionSheet.show({
        titleText: 'Editar ticket', buttons: [{ text: '<i class="icon ion-android-open"></i> Abrir' }, { text: '<i class="icon ion-android-done"></i> Cerrar' }, { text: '<i class="icon ion-android-person"></i> Asignar' }, { text: '<i class="icon ion-university"></i> Transferir' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          /*           abrir 0
                    cerrar 1
                    asignar 2
                    transferir 3
           */

          //abrir
          if (index == 0) {
            var resultado = [];
            //Editar el status del ticket a cerrado

            $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/2').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          //cerrar
          else if (index == 1) {
            var resultado = [];
            //Editar el status del ticket a cerrado

            $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/3').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  ionicToast.show(resultado.data.msg, 'top', false, 2500);
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          //asignar  mod/librarian/:idt/:idb
          else if (index == 2) {

            stopLoading();
            $rootScope.ticketAAsignar = $stateParams.chatId;
            console.log($rootScope.ticketAAsignar)
            $state.go("app.asignar")
          }

          //transferir
          else if (index == 3) {

          }




          return true;
        }
      });
    }
  })

  // CONTENT-CONTROLLER PARA RESPONSABLE
  .controller('ContentCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $state, $http, $rootScope, $stateParams, $interval) {

    //Variables
    var vm = this;
    var messageInput = "";
    var allMessages = [];
    var chatMessages = "";
    var count = 0;

    //Methods declaration
    vm.goToMenu = goToMenu;
    vm.uniEditTi = uniEditTi;
    vm.uniCalificar = uniCalificar;
    vm.sendMessage = sendMessage;
    vm.getMessages = getMessages;
    vm.sendMessage = sendMessage;
    // vm.stopLoading = stopLoading;


    var nIntervId;
    nIntervId = setInterval(loader, 1000);


    function loader() {
      getMessages()
      getHeaderInformation()
    }

    function stopLoading() {
      clearInterval(nIntervId);
    }



    function sendMessage() {
      console.log('sendMessage start')
      var resultado = [];
      messageInput = vm.messageInput;
      vm.messageInput = "";
      console.log('user.id', user.id)
      console.log('Sending message to ', $stateParams.chatId)
      console.log('messageInput', messageInput)
      $http.get(site + '/tickets/mod/message/' + user.id + '/' + $stateParams.chatId + '/' + messageInput).
        then(function (resultado) {

          console.log('Mensaje enviado')
          allMessages = [];
          getMessages();
        });

      console.log('sendMessage end')
    }

    function getMessages() {
      console.log('getMessages start')
      var resultado = [];
      $http.get(site + '/tickets/get/messages/' + $stateParams.chatId).

        then(function (resultado) {

          if (resultado.data.code == 2) {
            allMessages = [];
            console.log('No messages on ticket ', $stateParams.chatId)
            console.log('No messages on ticket ', $stateParams.chatId)
            processMeesages(allMessages);
          }


          else if (resultado.data.mensajitos != undefined) {
            allMessages = [];
            allMessages = resultado.data.mensajitos;
            processMeesages(allMessages);
          }
        });
      console.log('getMessage end')
    }

    function processMeesages(recievedMessages) {
      console.log('processMeesages start')
      chatMessages = "";
      vm.chatMessages = "";

      for (var i = 0; i < recievedMessages.length; i++) {

        //Message from the logged user
        if (recievedMessages[i].userMsg == user.id) {
          chatMessages += '<div class="row ">' +
            '            <div class="col col-10 "></div>' +
            '            <div class="col card owner-container">' +
            '                <div class="item item-text-wrap owner">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '        </div>';
        }

        //Messages from the other user
        else {
          chatMessages += '<div class="row ">' +
            '            <div class="col card message-container">' +
            '                <div class="item item-text-wrap message">' +
            recievedMessages[i].contenido +
            '                </div>' +
            '            </div>' +
            '            <div class="col col-10 "></div>' +
            '        </div>';
        }
      }

      //Once the for loop ends (What's down didn't show up on the console)
      vm.chatMessages = chatMessages;

      console.log('processMeesages end')
    }

    function goToMenu() {
      //$stateParams.chatId = undefined;
      stopLoading()
      chatMessages = "";
      $state.go('app.uni');
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

    function getHeaderInformation() {
      var getHeaderResultado = [];
      //    /getbyfolio/:folio
      $http.get(site + '/tickets/getbyfolio/' + $stateParams.chatId).
        then(function (getHeaderResultado) {
          var allTickets = [];

          if (getHeaderResultado.data.code == 2)
            doToast(getHeaderResultado.data.msg)

          else {
            $rootScope.actualTicket = undefined;
            $rootScope.actualTicket = getHeaderResultado.data.ticketito;

            if ($rootScope.actualTicket[0].rate == undefined) {
              vm.rate = "<p>Sin calificar</p>";
            }
            else {
              vm.rate = '<p>' + $rootScope.actualTicket[0].rate + ' <i class="icon ion-star"></i></p> ';
            }


            vm.at = getHeaderResultado.data.ticketito[0];
          }
        });
    }





    //Methods that execute once the controller loads

    console.log('$stateParams.chatId', $stateParams.chatId)
    //Here the chatId gets life



    loader()



    function uniEditTi() {
      $ionicActionSheet.show({
        titleText: 'Editar ticket', buttons: [{ text: '<i class="icon ion-android-star"></i> Calificar ticket' },], destructiveText: '<i class="icon ion-android-done"></i> Cerrar ticket', cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          uniCalificar()



          return true;
        }, destructiveButtonClicked: function () {
          console.log('$stateParams.chatId', $stateParams.chatId)
          console.log('DESTRUCT');
          var resultado = [];
          //Editar el status del ticket a cerrado

          $http.get(site + '/tickets/mod/status/' + $stateParams.chatId + '/3').
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;

        }
      });
    }

    function uniCalificar() {
      $ionicActionSheet.show({
        titleText: 'Califique el servicio dado', buttons: [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' },], cancelText: 'Cancel', cancel: function () {
          console.log('CANCELLED');
        }, buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index)
          var resultado = [];

          console.log('$stateParams.chatId', $stateParams.chatId);
          $http.get(site + '/tickets/mod/rate/' + $stateParams.chatId + '/' + (index + 1)).
            then(function (resultado) {
              if (resultado.data.code == 2) {
                ionicToast.show(resultado.data.msg, 'top', false, 2500);
              }

              else {
                getHeaderInformation()
              }
            });
          return true;
        }
      });
    }
  })









  .controller('uniIndexCtrl', function (ionicToast, $scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
    var vm = this;

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
    function reloadUniTickets() {
      $rootScope.emptyMessage = "";
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];


          if (resultado.data.code == 2) {
            $rootScope.emptyMessage = " <div class='padding grey-text text-center'><img class='padding' src='img/empty2.png' width='45%'> <br> <p>Parece que no hay  ninguna pregunta  por aquí</p><p>si desdeas hacer una, sólo toca el <b>botón verde</b></p></div>   "
          }

          else {
            var depOptions = resultado.data.ticketito;

            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };
            $rootScope.emptyMessage = "";
          }
        });
    }

    function goToUni() {
      $state.go('app.uni')
    }

    function goToCreate(params) {
      $ionicViewSwitcher.nextDirection('forward');
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
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('app.addTicket');
    };

  })



  // CONTROLLER FOR RESPONSABLE
  .controller('resIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
    var vm = this;



    //Obtener los reportes de un usuario
    var resultado = [];
    var depOptions = [];



    //Declarations of functions
    vm.goToUni = goToUni;
    vm.goToCreate = goToCreate;
    vm.showActionSheet = showActionSheet;
    vm.addPeople = addPeople;



    //Functions
    function getAssignedTickets() {
      console.log('star get assignedtickets')
      var resultado = [];
      $http.get(site + '/tickets/getByLibrarian/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log('codigo 2 en getAssignedTickets')

          else {
            console.log('assignedTickets', resultado.data.ticketito)
            $scope.assignedTickets = resultado.data.ticketito;
          }

          console.log('getAssigned terminado')
        });
    }

    function getNewTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByNew').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.newTickets = resultado.data.ticketito;
          }
        });
    }

    function getInProcessTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByDoing/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doingTickets = resultado.data.ticketito;
          }
        });
    }

    function getDoneTickets() {

      var resultado = [];
      $http.get(site + '/tickets/getByDone').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doneTickets = resultado.data.ticketito;
          }
        });

    }

    function reload() {
      getAssignedTickets();
      getNewTickets();
      getInProcessTickets();
      getDoneTickets();

    }

    var indexInterval;
    indexInterval = setInterval(reload, 1000);


    function stopLoading() {
      clearInterval(indexInterval);
    }

    //Obtener los reportes de un usuario
    var resultado = [];
    var depOptions = [];




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
      $ionicViewSwitcher.nextDirection('forward');
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

    function addPeople() {
      $state.go('app.addPeople');
    };

    reload()

  })

  //CONTROLLER FOR BIBLIOTECARIO
  .controller('bibIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
    var vm = this;


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

    /*     var nIntervId;
        var count=0;
        nIntervId = setInterval(loader, 5000);
    
    
        function loader() {
          console.log(count);
          count++;
          getAssignedTickets();
          getNewTickets();
          getInProcessTickets();
          getDoneTickets();
        }
    
        function stopLoading() {
          clearInterval(nIntervId);
        }
    
        loader() */






    function getAssignedTickets() {
      console.log('star get assignedtickets')
      var resultado = [];
      $http.get(site + '/tickets/getByLibrarian/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log('codigo 2 en getAssignedTickets')

          else {
            console.log('assignedTickets', resultado.data.ticketito)
            $scope.assignedTickets = resultado.data.ticketito;
          }

          console.log('getAssigned terminado')
        });
    }

    function getNewTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByNew').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.newTickets = resultado.data.ticketito;
          }
        });
    }

    function getInProcessTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByDoing/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doingTickets = resultado.data.ticketito;
          }
        });
    }

    function getDoneTickets() {

      var resultado = [];
      $http.get(site + '/tickets/getByDone').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doneTickets = resultado.data.ticketito;
          }
        });

    }
    var count = 0;

    function reload() {
      console.log(count)
      count++
      getAssignedTickets();
      getNewTickets();
      getInProcessTickets();
      getDoneTickets();

    }

    //Obtener los reportes de un usuario
    var resultado = [];
    var depOptions = [];



    //Declarations of functions
    vm.goToUni = goToUni;
    vm.goToCreate = goToCreate;
    vm.showActionSheet = showActionSheet;
    vm.showAddSheet = showAddSheet;



    //Functions



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
      $ionicViewSwitcher.nextDirection('forward');
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


    var indexInterval;
    indexInterval = setInterval(reload, 1000);


    function stopLoading() {
      clearInterval(indexInterval);
    }

    reload()
  })

  //CONTROLLER FOR ADMIN
  .controller('admIndexCtrl', function (ionicToast, $scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
    var vm = this;





    //Declarations of functions
    vm.goToPermisos = goToPermisos;
    vm.goToConsultas = goToConsultas;
    vm.goToStats = goToStats;



    //Functions

    function goToPermisos() {
      $ionicViewSwitcher.nextDirection('back');
      $state.go('app.admPermisos')
    }

    function goToConsultas() {
    }

    function goToStats() {
      $ionicViewSwitcher.nextDirection('forward');
      $state.go('app.stats')
    }

    //Functions
    function getAssignedTickets() {
      console.log('star get assignedtickets')
      var resultado = [];
      $http.get(site + '/tickets/getByLibrarian/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log('codigo 2 en getAssignedTickets')

          else {
            console.log('assignedTickets', resultado.data.ticketito)
            $scope.assignedTickets = resultado.data.ticketito;
          }

          console.log('getAssigned terminado')
        });
    }

    function getNewTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByNew').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.newTickets = resultado.data.ticketito;
          }
        });
    }

    function getInProcessTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getByDoing').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doingTickets = resultado.data.ticketito;
          }
        });
    }

    function getDoneTickets() {

      var resultado = [];
      $http.get(site + '/tickets/getByDone').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            console.log(resultado.data.msg)

          else {
            $scope.doneTickets = resultado.data.ticketito;
          }
        });

    }

    function reload() {
      getAssignedTickets();
      getNewTickets();
      getInProcessTickets();
      getDoneTickets();

    }

    var indexInterval;
    indexInterval = setInterval(reload, 1000);


    function stopLoading() {
      clearInterval(indexInterval);
    }


    reload()


  })



  .controller('uniAddTicketCtrl', function (ionicToast, $scope, $stateParams, $state, $http, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicActionSheet) {
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
          $rootScope.emptyMessage = ""
          var allTickets = [];

          if (resultado.data.code == 2) {
            $rootScope.emptyMessage = " <div class='padding grey-text text-center'><img class='padding' src='img/empty2.png' width='45%'> <br> <p>Parece que no hay  ninguna pregunta  por aquí</p><p>si desdeas hacer una, sólo toca el <b>botón verde</b></p></div>   "

          }


          else {

            var depOptions = resultado.data.ticketito;

            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };
            $rootScope.emptyMessage = ""
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
      if (peti == undefined || peti == "") {
        ionicToast.show('El asunto es obligatorio', 'top', false, 2500);

      }

      else {
        if (init == undefined || init == "")
          init = "No fue necesario explicar más a fondo.";



        var resultado = [];

        $http.get(site + '/tickets/create/' + encodeURIComponent(peti) + '/' + encodeURIComponent(init) + '/' + user.id).
          then(function (resultado) {
            //Limpiar campos
            vm.asunto = undefined;
            vm.mensaje = undefined;

            console.log(resultado.data.code);
            console.log(resultado.data.msg);
            //Problema al crear el ticket
            if (resultado.data.code == 2)
              ionicToast.show(resultado.data.msg, 'top', false, 2500);

            //Ticket creado con éxito
            else if (resultado.data.code == 1) {
              $ionicViewSwitcher.nextDirection('back');

              reloadUniTickets();
              //$scope.$apply();

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


  .controller('resAddPeopleCtrl', function ($scope, $stateParams, $state, $http, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicActionSheet) {
    var vm = this;

    getBibliotecarios()
    getStudents()

    function getBibliotecarios() {
      var resultado = [];

      $http.get(site + '/users/getLibrarians').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.bibliotecarios = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }

    function getStudents() {
      var resultado = [];

      $http.get(site + '/users/getStudents').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.students = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }


    //Declarations of functions
    vm.goToRes = goToRes;
    vm.doLibrarian = doLibrarian;

    vm.doStudent = doStudent;



    //Functions
    function doLibrarian(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de universitario ' + userid + ' a bibliotecario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 3).
        then(function (resultado) {
          getBibliotecarios()
          getStudents()
        });
    }

    function doStudent(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de bibliotecario ' + userid + ' a universitario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 1).
        then(function (resultado) {
          getBibliotecarios()
          getStudents()
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

    function goToRes() {
      $state.go('app.res')
    }



  })

  .controller('asignarCtrl', function (ionicToast, $scope, $stateParams, $state, $http, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicActionSheet) {
    var vm = this;

    getBibliotecarios()
    getStudents()

    function getBibliotecarios() {
      var resultado = [];

      $http.get(site + '/users/getLibrarians').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.bibliotecarios = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }

    function getStudents() {
      var resultado = [];

      $http.get(site + '/users/getStudents').
        then(function (resultado) {

          //There was a problem getting the users from the database
          if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

          //All the users were bring succesfully
          else {
            $scope.students = resultado.data.users;
            console.log('resultado.data.users', resultado.data.users)
          }
        });
    }


    //Declarations of functions
    vm.goToRes = goToRes;
    vm.doLibrarian = doLibrarian;

    vm.doStudent = doStudent;

    vm.asignar = asignar;

    function goToTicket() {
      $state.go('app.res-detail', { chatId: $rootScope.ticketAAsignar });
    }

    vm.goToTicket = goToTicket;



    //Functions

    function asignar(userid) {
      var resultado = [];
      $http.get(site + '/tickets/mod/status/' + $rootScope.ticketAAsignar + '/2').
        then(function (resultado) {
          if (resultado.data.code == 2) {
            ionicToast.show(resultado.data.msg, 'top', false, 2500);
          }

          else {

          }
        });


      $http.get(site + '/tickets/mod/librarian/' + $rootScope.ticketAAsignar + '/' + userid).
        then(function (resultado) {
          if (resultado.data.code == 1) {
            ionicToast.show(resultado.data.msg, 'top', false, 2500);
            goToTicket()
          }

          else {
            ionicToast.show(resultado.data.msg, 'top', false, 2500);
            goToTicket()
          }
        });
    }

    function doLibrarian(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de universitario ' + userid + ' a bibliotecario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 3).
        then(function (resultado) {
          getBibliotecarios()
          getStudents()
        });
    }

    function doStudent(userid) {
      ///modrol/: id /: rol
      console.log('cambiando rol de bibliotecario ' + userid + ' a universitario')
      var resultado = [];

      $http.get(site + '/users/modrol/' + userid + '/' + 1).
        then(function (resultado) {
          getBibliotecarios()
          getStudents()
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

    function goToRes() {
      $state.go('app.res')
    }
  })



  .controller('LoginCtrl', function ($ionicViewSwitcher, ionicToast, $scope, $stateParams, $state, $http, $ionicPopup) {
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
      $ionicViewSwitcher.nextDirection('forward');

      $state.go('app.signup');
    }

    function doLogin() {

    if (vm.mail==undefined || vm.mail == "") {
      ionicToast.show("Introduzca un correo", 'top', false, 2500);
    }

      else if (vm.pwd == undefined || vm.pwd == "") {
        ionicToast.show("La contraseña no puede estar vacía", 'top', false, 2500);
      }
      else{

      mail = vm.mail;
      pwd = vm.pwd;
      

      var resultado = [];

      $http.get(site + '/users/login/' + mail + '/' + pwd).
        then(function (resultado) {
          vm.mail = undefined;
          vm.pwd = undefined;

          //El correo no existe en la base de datos
          if (resultado.data.code != 3)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);
          else if (resultado.data.code == 2)
            ionicToast.show(resultado.data.msg, 'top', false, 2500);

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
    }
  })


  .controller('SignupCtrl', function (ionicToast, $scope, $stateParams, $state, $http, $ionicPopup) {
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
      names = vm.name;
      mail = vm.email;
      pwd = vm.pwd;
      dep = vm.dep;

      console.log(names, lasts, mail, pwd, dep);

      if (names == undefined || names == '')
        ionicToast.show('Por favor, introduzca su nombre', 'top', false, 2500);

      else if (mail == undefined)
        ionicToast.show('Por favor,  ingrese un correo', 'top', false, 2500);

      else if (!mail.includes('@ucol.mx'))
        ionicToast.show('El correo debe contener \'@ucol.mx\' ', 'top', false, 2500);

      else if (pwd == undefined)
        ionicToast.show('Defina una contraseña', 'top', false, 2500);

      else if (dep == undefined)
        ionicToast.show('Eliga la dependencia a la que pertenece (o la más cercana a usted)', 'top', false, 2500);


      //Todos los datos han sido introducidos
      else {
        var resultado = [];
        $http.get(site + '/users/signup/' + names + '/' + mail + '/' + pwd + '/1/' + dep).
          then(function (resultado) {
            if (resultado.data.code == 2) {
              ionicToast.show(resultado.data.msg, 'top', false, 2500);
            }

            else if (resultado.data.code == 1) {
              ionicToast.show(resultado.data.msg, 'top', false, 2500);
              goToLogin();
            }
          });

      }
    }

  })
  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
