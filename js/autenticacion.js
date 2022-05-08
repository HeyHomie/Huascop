//Iniciar session con google

const google = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'es';

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var email = result.user.email;

    console.log(email, user);

    // console.log(result.user)

    // if (email == 'clasmap.mx@gmail.com') {
    //   window.location = "./index.html";
    // } else if (email != 'clasmap.mx@gmail.com') {
    //   window.location = "./login.html";
    // }


  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


function cerrarSesion() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    window.location = "./login.html";
  }).catch(function (error) {
    // An error happened.
  });
}