.factory('FirebaseDB', function ($q, $state, $timeout) {
  var instance, storageInstance, unsubscribe, currentUser = null
  var initialized = false

  return {
    initialize: function () {

      // Inicializamos el Firebase, cambia el código por el tuyo dentro del var config
      var config = {
     apiKey: "AIzaSyDb_EFfVjCjN7dbAYQlXxcnnu8oHAZnE_c",
  authDomain: "my-app-cookyourweb.firebaseapp.com",
  databaseURL: "https://my-app-cookyourweb.firebaseio.com",
  storageBucket: "my-app-cookyourweb.appspot.com",
  messagingSenderId: "489610286180"
      };

      // initialize database and storage
      instance = firebase.initializeApp(config);
      storageInstance = firebase.storage();

      // listen for authentication event, dont start app until I
      // get either true or false
      unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
        currentUser = user
        console.log("got user..", currentUser);
      })
    },
    /**
     * return database instance
     */
    database: function () {
      return instance.database()
    },
    /**
    * return storage instance
    */
    storage: function () {
      return storageInstance
    },
    isAuth: function () {
      return $q(function (resolve, reject) {
        return firebase.auth().currentUser ? resolve(true) : reject("NO USER")
      })
    },
    /**
     * return the currentUser object
     */
    currentUser: function () {
      debugger;
      return firebase.auth().currentUser
    },

    /**
     * @param  {any} _credentials
     */
    login: function (_credentials) {
      return firebase.auth().signInWithEmailAndPassword(_credentials.email, _credentials.password)
        .then(function (authData) {
          currentUser = authData
          return authData
        })
    },
    /**
     * @param  {any} _credentials
     */
    createUser: function (_credentials) {
      return firebase.auth().createUserWithEmailAndPassword(_credentials.email, _credentials.password).then(function (authData) {
        currentUser = authData
        return authData
      }).then(function (authData) {

        // add the user to a seperate list
        var ref = instance.database().ref('Trash-Talk/users');
        return ref.child(authData.uid).set({
          "provider": authData.providerData[0],
          "avatar": (authData.profileImageURL || "missing"),
          "displayName": authData.email
        })

      })
    }
  }
})
