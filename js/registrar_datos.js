
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
      rama_pruebas: '',
      rama_push: '',
      desarrollador: user.displayName,
      desarrollador_email: user.email,
      imagen: user.photoURL,
      grupo_fotos: [user.photoURL],
      grupo_nombres: [user.displayName],
      grupo_correo: [user.email]
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

//Grupos

const unirseAunGrupo = (id) => {
  firebase.auth().onAuthStateChanged((user) => {
    const staging = db.collection("col-stagings").doc(id);
    staging.get().then((doc) => {
      if (doc.exists) {
        grupoCorreoArray = doc.data().grupo_correo

        return staging.update({
          grupo_fotos: firebase.firestore.FieldValue.arrayUnion(user.photoURL),
          grupo_nombres: firebase.firestore.FieldValue.arrayUnion(user.displayName),
          grupo_correo: firebase.firestore.FieldValue.arrayUnion(user.email)
        }).then(() => {
          const myModalEl = document.getElementById('unirseAunGrupo');
          const modal = bootstrap.Modal.getInstance(myModalEl)
          modal.hide();
          Swal.fire({
            icon: 'success',
            title: 'Echo',
            html: `Te has unido al grupo del staging <strong>${doc.data().nombre}</strong>`,
            confirmButtonText: 'Aceptar',
          });
          console.log("Document successfully updated!");
        })

      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  });
}