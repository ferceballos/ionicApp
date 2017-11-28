// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })

      //BEGIN - States for the common user (Universitario)  addTicket
      .state('app.uni', {
        url: '/uni',
        views: {
          'menuContent': {
            templateUrl: 'templates/uniIndex.html',
            controller: 'uniIndexCtrl as vm'
          }
        }
      })

      .state('app.uni-detail', {
        url: '/uni/:chatId',
        cache: false,

        views: {
          'menuContent': {
            templateUrl: 'templates/chat-content.html',
            controller: 'ContentCtrl as vm'
          }
        }
      })

      .state('app.addTicket', {
        url: '/addticket',
        views: {
          'menuContent': {
            templateUrl: 'templates/uniAddTicket.html',
            controller: 'uniAddTicketCtrl as vm'
          }
        }
      })

      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })

      //STATES DEL RESPONSABLE
      .state('app.res', {
        url: '/res',
        views: {
          'menuContent': {
            templateUrl: 'templates/resIndex.html',
            controller: 'resIndexCtrl as vm'
          }
        }
      })

      .state('app.addPeople', {
        url: '/addPeople',
        views: {
          'menuContent': {
            templateUrl: 'templates/resAddPeople.html',
            controller: 'resAddPeopleCtrl as vm'
          }
        }
      })



      .state('app.res-detail', {
        url: '/res/:chatId',
        cache: false,

        views: {
          'menuContent': {
            templateUrl: 'templates/res-chat-content.html',
            controller: 'ResContentCtrl as vm'
          }
        }
      })

      //STATES DEL BIBLIOTECARIO
      .state('app.bib', {
        cache: false,
        url: '/bib',
        views: {
          'menuContent': {
            templateUrl: 'templates/bibIndex.html',
            controller: 'bibIndexCtrl as vm'
          }
        }
      })

      .state('app.bib-detail', {
        url: '/bib/:chatId',
        cache: false,

        views: {
          'menuContent': {
            templateUrl: 'templates/bib-chat-content.html',
            controller: 'BibContentCtrl as vm'
          }
        }
      })

      //STATES DEL ADMINISTRADOR
      .state('app.adm', {
        url: '/adm',
        views: {
          'menuContent': {
            templateUrl: 'templates/admIndex.html',
            controller: 'admIndexCtrl as vm'
          }
        }
      })

      .state('app.stats', {
        url: '/stats',
        views: {
          'menuContent': {
            templateUrl: 'templates/admStats.html',
            controller: 'StatsCtrl'
          }
        }
      })

      //STATES GENERALES


      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl as vm'
          }
        }
      })

      .state('app.welcome', {
        url: '/welcome',
        views: {
          'menuContent': {
            templateUrl: 'templates/welcome.html',
            controller: 'WelcomeCtrl as vm'
          }
        }
      })

      .state('app.asignar', {
        url: '/asignar',
        views: {
          'menuContent': {
            templateUrl: 'templates/asignar.html',
            controller: 'asignarCtrl as vm'
          }
        }
      })



      .state('app.signup', {
        url: '/signup',
        views: {
          'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'SignupCtrl as vm'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
    //$urlRouterProvider.otherwise('/app/welcome');
  });
