const eliminarStaging = (id, nombre) => {
  const staging = db.collection("col-stagings").doc(id);

  Swal.fire({
    title: `<span style='font-weight: 100;'>¿Estás seguro(a) de querer eliminar este staging:</span> ${nombre}?`,
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, quiero eliminarlo'
  }).then((result) => {
    if (result.isConfirmed) {
      staging.get().then((doc) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.email !== doc.data().desarrollador_email && doc.data().en_uso) {
            Swal.fire({
              icon: 'warning',
              title: 'Oops...',
              html: `Solo <strong>${doc.data().desarrollador_email}</strong> puede eliminar este staging`,
              confirmButtonText: 'Aceptar',
            });
          } else {
            db.collection("col-stagings").doc(id).delete().then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Echo',
                html: `El staging <strong>${nombre}</strong> fue eliminado con éxito`,
                confirmButtonText: 'Aceptar',
              });
            }).catch((error) => {
              console.error("Error removing document: ", error);
            });
          }
        });
      });
    }
  })
}


const salirseAunGrupo = (id, email) => {
  const staging = db.collection("col-stagings").doc(id);

  staging.get().then((doc) => {

    grupoFotosArray = doc.data().grupo_fotos;
    grupoNombresArray = doc.data().grupo_nombres;
    grupoCorreoArray = doc.data().grupo_correo;

    index = grupoCorreoArray.indexOf(email);
    grupoFotosArray.splice(index, 1);
    grupoNombresArray.splice(index, 1);
    grupoCorreoArray.splice(index, 1);

    staging.set({
      grupo_fotos: grupoFotosArray,
      grupo_nombres: grupoNombresArray,
      grupo_correo: grupoCorreoArray
    }, { merge: true });

    const myModalEl = document.getElementById('unirseAunGrupo');
    const modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();

    Swal.fire({
      icon: 'success',
      title: 'Echo',
      html: `Te has salido del grupo del staging <strong>${doc.data().nombre}</strong>`,
      confirmButtonText: 'Aceptar',
    });
  });

}