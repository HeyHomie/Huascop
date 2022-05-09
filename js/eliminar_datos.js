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