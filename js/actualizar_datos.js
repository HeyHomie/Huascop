//metodos

const cambiarEstatusStaging = (id, check) => {

  firebase.auth().onAuthStateChanged((user) => {

    const staging = db.collection("col-stagings").doc(id);

    staging.get().then((doc) => {
      if (doc.exists) {
        if (user.email !== doc.data().desarrollador_email) {
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
          staging.set({
            en_uso: false,
            desarrollador: 'Sin uso',
            imagen: './img/user_clean.png'
          }, { merge: true });
        } else {
          staging.set({
            en_uso: true,
            desarrollador: user.displayName,
            imagen: user.photoURL
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


