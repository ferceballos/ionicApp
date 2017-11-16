const site = 'http://localhost:3000';
var user = [];

angular.module('starter.controllers', ['ionic'])

  .controller('AppCtrl', function () {

  })

  .controller('PlaylistsCtrl', function ($scope) {

  })

  // Content controller para el universitario

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


    /* 
        var nIntervId;
        nIntervId = setInterval(loader, 1000);
    
    
        function loader() {
          console.log(count);
          count++;
        }
    
        function stopLoading() {
          clearInterval(nIntervId);
        } */



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
      //vm.stopLoading();
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
                doToast(resultado.data.msg)
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
                doToast(resultado.data.msg)
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
    vm.sendMessage = sendMessage;
    // vm.stopLoading = stopLoading;


    /* 
        var nIntervId;
        nIntervId = setInterval(loader, 1000);
    
    
        function loader() {
          console.log(count);
          count++;
        }
    
        function stopLoading() {
          clearInterval(nIntervId);
        } */



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
      //vm.stopLoading();
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
                  doToast(resultado.data.msg)
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
                  doToast(resultado.data.msg)
                }

                else {
                  getHeaderInformation()
                }
              });

          }

          //asignar  mod/librarian/:idt/:idb
          else if (index == 2) {
            var resultado = [];
            //Editar el status del ticket a cerrado

/*             $http.get(site + '/tickets/mod/librarian/' + $stateParams.chatId + '/2').
              then(function (resultado) {
                if (resultado.data.code == 2) {
                  doToast(resultado.data.msg)
                }

                else {
                  getHeaderInformation()
                }
              }); */

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
                doToast(resultado.data.msg)
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


    /* 
        var nIntervId;
        nIntervId = setInterval(loader, 1000);
    
    
        function loader() {
          console.log(count);
          count++;
        }
    
        function stopLoading() {
          clearInterval(nIntervId);
        } */



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
      //vm.stopLoading();
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
                doToast(resultado.data.msg)
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
                doToast(resultado.data.msg)
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









  .controller('uniIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
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
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;


            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };

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

  })

  .controller('uniIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
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
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;


            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };

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

  })

  // CONTROLLER FOR RESPONSABLE
  .controller('resIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
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

    reloadResTickets();


    //Obtener los reportes de un usuario
    var resultado = [];
    var depOptions = [];



    //Declarations of functions
    vm.goToUni = goToUni;
    vm.goToCreate = goToCreate;
    vm.showActionSheet = showActionSheet;
    vm.addPeople = addPeople;



    //Functions
    function reloadResTickets() {
      var resultado = [];
      $http.get(site + '/tickets/getAll').
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;


            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };

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
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;


            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };

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

  })

  //CONTROLLER FOR ADMIN
  .controller('admIndexCtrl', function ($scope, $stateParams, $state, $http, $ionicPopup, $rootScope, $ionicActionSheet, $ionicViewSwitcher) {
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
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;


            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };

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

  })



  .controller('uniAddTicketCtrl', function ($scope, $stateParams, $state, $http, $ionicViewSwitcher, $rootScope, $ionicPopup, $ionicActionSheet) {
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

            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };
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


    //Declarations of functions
    vm.goToRes = goToRes;
    vm.goToCreate = goToCreate;
    vm.addPeople = addPeople;
    vm.showActionSheet = showActionSheet;
    vm.showAddSheet = showAddSheet;

    //Functions

    function addPeople() {
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
              $ionicViewSwitcher.nextDirection('back');

              reloadUniTickets();
              //$scope.$apply();

              $state.go('app.uni');
            }
          });
      }
    }

    function reloadUniTickets(params) {
      $http.get(site + '/tickets/getbyuser/' + user.id).
        then(function (resultado) {
          var allTickets = [];

          if (resultado.data.code == 2)
            doToast(resultado.data.msg)

          else {

            var depOptions = resultado.data.ticketito;

            $rootScope.ticketsOfUni = {
              availableOptions: depOptions
            };
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

    function goToRes() {
      $state.go('app.res')
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
          vm.mail = undefined;
          vm.pwd = undefined;

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
