
const validarFormStaging = () => {
  firebase.auth().onAuthStateChanged((user) => {
    const nombre = document.querySelector('#nombre').value;
    const proyecto = document.querySelector('#proyecto').value;
    const fecha = new Date();

    if (nombre === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El nombre no puede quedar vació',
        confirmButtonText: 'Aceptar',
      });
      return false;
    } else if (proyecto === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El proyecto no puede quedar vació',
        confirmButtonText: 'Aceptar',
      });
      return false;
    }

    const staging = {
      proyecto: proyecto.replace('.', '').trim(),
      fecha,
      nombre: nombre.replace('.', '').trim().toLowerCase(),
      en_uso: true,
      desarrollador: user.displayName,
      desarrollador_email: user.email,
      imagen: user.photoURL
    }
    verificarExistenciaStaging(staging);

  });
}

//Metodos

const verificarExistenciaStaging = (staging) => {

  const buscarStaging = db.collection('col-stagings')
    .doc(staging.nombre);

  buscarStaging.get().then((doc) => {
    if (!doc.exists) {
      registrarStaging(staging);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        html: `Ya está registrado el staging <strong>${staging.nombre}</strong>`,
        confirmButtonText: 'Aceptar',
      });
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

function registrarStaging(staging) {

  return new Promise((resolve, reject) => {
    db.collection('col-stagings').doc(staging.nombre).set(staging)
      .then(function (docRef) {
        resolve(staging)
        Swal.fire({
          icon: 'success',
          title: 'Echo',
          html: `El staging <strong>${staging.nombre}</strong> fue registrado con éxito`,
          confirmButtonText: 'Aceptar',
        });
        document.querySelector('#nombre').value = '';
        document.querySelector('#proyecto').value = '';
      })
      .catch(function (error) {
        reject(error)
      })
  });
}