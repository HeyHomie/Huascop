//Variables globales
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
var pathname = window.location.pathname;


//Metodos
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

firebase.auth().onAuthStateChanged((user) => {

  if (user) {
    if (pathname === '/login.html' || pathname === '/Huascop/login.html') {
      if (window.location.hostname === '127.0.0.1') {
        window.location = "/index.html";
      } else {
        window.location = "https://heyhomie.github.io/Huascop/";
      }
    }

    if (pathname === '/index.html' || pathname === '/' || pathname === '/Huascop/' || pathname === '/Huascop/index.html') {
      document.querySelector('#nombreUsuario').innerHTML = user.displayName;
      document.querySelector('#imgUser').innerHTML = `<img src="${user.photoURL}" />`;
    }


  } else {
    if (pathname === '/index.html' || pathname === '/' || pathname === '/Huascop/' || pathname === '/Huascop/index.html') {

      if (window.location.hostname === '127.0.0.1') {
        window.location = "/login.html";
      } else {
        window.location = "https://heyhomie.github.io/Huascop/login.html";
      }
    }
  }
});

const verificarExistenciaUsuario = (name, email) => {

  const buscarUsuario = db.collection('col-usuarios')
    .doc('usuario' + email + 'homie');

  buscarUsuario
    .onSnapshot((querySnapshot) => {
      if (!querySnapshot.exists) {
        const respuesta = {
          nombre: name,
          email: email
        }
        registrarUsuario(respuesta);
      }
    });
}

function registrarUsuario(respuesta) {

  return new Promise((resolve, reject) => {
    db.collection('col-usuarios').doc("usuario" + respuesta.email + "homie").set(respuesta)
      .then(function (docRef) {
        resolve(respuesta)
      })
      .catch(function (error) {

        reject(error)
      })
  });
}

const cerrarSesion = () => {
  firebase.auth().signOut().then(function () {
    if (window.location.hostname === '127.0.0.1') {
      window.location = "/login.html";
    } else {
      window.location = "https://heyhomie.github.io/Huascop/login.html";
    }
  }).catch(function (error) {
    // An error happened.
  });
}

//Implementaciones 
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

//Iniciar session con google
const google = () => {

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().languageCode = 'es';

  firebase.auth().signInWithPopup(provider).then(function (result) {
    verificarExistenciaUsuario(result.user.displayName, result.user.email);
    if (window.location.hostname === '127.0.0.1') {
      window.location = "/index.html";
    } else {
      window.location = "https://heyhomie.github.io/Huascop/";
    }
  }).catch(function (error) {
    console.log(error);
  });
}