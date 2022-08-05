//metodos

const cambiarEstatusStaging = (id, check) => {

  firebase.auth().onAuthStateChanged((user) => {

    const staging = db.collection("col-stagings").doc(id);

    staging.get().then((doc) => {
      if (doc.exists) {
        if (user.email !== doc.data().desarrollador_email && doc.data().en_uso) {
          swich_btn = document.querySelector(`#${check}`);
          console.log(swich_btn);
          swich_btn.checked = true;
          return Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            html: `Solo <strong>${doc.data().desarrollador_email}</strong> puede desactivar este staging`,
            confirmButtonText: 'Aceptar',
          });
        }

        if (doc.data().en_uso) {
          if (doc.data().grupo_correo.length > 1) {
            grupoFotosArray = doc.data().grupo_fotos;
            grupoNombresArray = doc.data().grupo_nombres;
            grupoCorreoArray = doc.data().grupo_correo;

            index = grupoCorreoArray.indexOf(user.email);
            grupoFotosArray.splice(index, 1);
            grupoNombresArray.splice(index, 1);
            grupoCorreoArray.splice(index, 1);

            staging.set({
              en_uso: true,
              desarrollador: grupoNombresArray[0],
              imagen: grupoFotosArray[0],
              desarrollador_email: grupoCorreoArray[0],
              grupo_fotos: grupoFotosArray,
              grupo_nombres: grupoNombresArray,
              grupo_correo: grupoCorreoArray
            }, { merge: true });

          } else {
            staging.set({
              en_uso: false,
              desarrollador: 'Sin uso',
              imagen: './img/user_clean.png',
              grupo_fotos: [],
              grupo_nombres: [],
              grupo_correo: []
            }, { merge: true });
          }

        } else {
          staging.set({
            en_uso: true,
            desarrollador: user.displayName,
            desarrollador_email: user.email,
            imagen: user.photoURL,
            grupo_fotos: [user.photoURL],
            grupo_nombres: [user.displayName],
            grupo_correo: [user.email]
          }, { merge: true });
        }

      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  });

}


