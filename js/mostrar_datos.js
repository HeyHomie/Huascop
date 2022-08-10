//Mostrar datos

//onclick = "EntrarAGrupo('${doc.id}', '${doc.data().nombre}')"
db.collection("col-stagings").orderBy("proyecto", "desc").orderBy("nombre", "desc")
  .onSnapshot((querySnapshot) => {
    document.querySelector('#list_stagings').innerHTML = '';
    contador = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().en_uso) {
        contador = contador + 1;
        document.querySelector('#list_stagings').innerHTML += `
         <div class="project-box-wrapper">
            <div class="project-box project-activo">
              <div class="project-box-header">
                <div class="more-wrapper" style="margin-left: 0.7rem">
                  <button type="button" id="btnVerUnirseGrupo" class="project-btn-more" data-bs-toggle="modal" data-bs-target="#unirseAunGrupo" onclick="mostrarDatosDeGrupo('${doc.id}')">
                    <div class="delete-content" style="color: #bfbfbf;">
                        <i class="fa-solid fa-people-group"></i>
                      </div>
                  </button>
                </div>
                <div class="more-wrapper">
                  <button class="project-btn-more" onclick="eliminarStaging('${doc.id}', '${doc.data().nombre}')">
                    <div class="delete-content" style="color: #bfbfbf;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#34c47187' width='17px' height='17px' ><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                      </div>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header content_search">
                <p class="box-content-header">${doc.data().nombre}</p>
                <p class="box-content-subheader">${doc.data().proyecto}</p>                
                <svg class='mt-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#fff' widt="100"
                  height='100'>
                  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z" />
                </svg>
              </div>

              <div class="project-box-footer">
                <span>${doc.data().desarrollador}</span>
                <div class="participants">
                  <span class="count_grupo"><small>${doc.data().grupo_fotos.length}</small></span>
                  <a data-bs-toggle="modal" data-bs-target="#verParticipantes" onclick="mostrarListaDesarrolladores('${doc.id}')">
                    <div id="participantes_${contador}"></div>
                  </a>
                </div>
              </div>
              <div class="project-box-footer">
              <div></div>
                <div class="days-left" style="color: #34c471;">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="${doc.data().nombre}_id" checked onclick="cambiarEstatusStaging('${doc.id}', '${doc.data().nombre}_id')">
                    <label class="form-check-label" for="${doc.data().nombre}_id"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        fotosArray = doc.data().grupo_fotos;
        fotosArray.forEach(function (foto, index) {
          if (index <= 10) {
            document.querySelector(`#participantes_${contador}`).innerHTML += `<img src="${foto}" alt="participant">`;
          }
        }, this);
      } else {
        document.querySelector('#list_stagings').innerHTML += `
          <div class="project-box-wrapper">
            <div class="project-box project-inactivo">
              <div class="project-box-header">
                <span></span>
                <div class="more-wrapper">
                  <button class="project-btn-more" onclick="eliminarStaging('${doc.id}', '${doc.data().nombre}')">
                    <div class="delete-content" style="color: #34c471;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#bfbfbf' width='17px' height='17px' ><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
                      </div>
                  </button>
                </div>
              </div>
              <div class="project-box-content-header content_search">
                <p class="box-content-header">${doc.data().nombre}</p>
                <p class="box-content-subheader">${doc.data().proyecto}</p>

                <svg class='mt-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='#fff' widt="100"
                  height='100'>
                  <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                  <path
                    d="M439.55 236.05L244 40.45a28.87 28.87 0 0 0-40.81 0l-40.66 40.63 51.52 51.52c27.06-9.14 52.68 16.77 43.39 43.68l49.66 49.66c34.23-11.8 61.18 31 35.47 56.69-26.49 26.49-70.21-2.87-56-37.34L240.22 199v121.85c25.3 12.54 22.26 41.85 9.08 55a34.34 34.34 0 0 1-48.55 0c-17.57-17.6-11.07-46.91 11.25-56v-123c-20.8-8.51-24.6-30.74-18.64-45L142.57 101 8.45 235.14a28.86 28.86 0 0 0 0 40.81l195.61 195.6a28.86 28.86 0 0 0 40.8 0l194.69-194.69a28.86 28.86 0 0 0 0-40.81z" />
                </svg>
              </div>
              <div class="project-box-footer">
                <span>${doc.data().desarrollador}</span>
                <div class="participants">
                  <img
                    src="${doc.data().imagen}"
                    alt="participant">                               
                </div>
              </div>
              <div class="project-box-footer">
              <div></div>
                <div class="days-left" style="color: #34c471;">
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="${doc.data().nombre}_id" onclick="cambiarEstatusStaging('${doc.id}', '${doc.data().nombre}_id')">
                    <label class="form-check-label" for="${doc.data().nombre}_id"></label>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>`;
      }

    });
  });



db.collection("col-stagings").where('en_uso', '==', true)
  .onSnapshot((querySnapshot) => {
    document.querySelector('#stagings_activos').innerHTML = querySnapshot.docs.length;
  });

db.collection("col-stagings").where('en_uso', '==', false)
  .onSnapshot((querySnapshot) => {
    document.querySelector('#stagings_inactivos').innerHTML = querySnapshot.docs.length;
  });

db.collection("col-stagings")
  .onSnapshot((querySnapshot) => {
    document.querySelector('#total_stagings').innerHTML = querySnapshot.docs.length;
  });

// Grupos
const mostrarDatosDeGrupo = (id) => {
  const staging = db.collection("col-stagings").doc(id);

  staging.get().then((doc) => {
    if (doc.exists) {
      firebase.auth().onAuthStateChanged((user) => {
        grupoCorreoArray = doc.data().grupo_correo;

        if (grupoCorreoArray.includes(user.email)) {
          const unidoAunGrupoClassArray = document.getElementsByClassName("unidoAunGrupoClass");
          for (let i = 0; i < unidoAunGrupoClassArray.length; i++) {
            unidoAunGrupoClassArray[i].classList.remove('d-none');
          }
          const unirseAunGrupoClassArray2 = document.getElementsByClassName("unirseAunGrupoClass");
          for (let i = 0; i < unirseAunGrupoClassArray2.length; i++) {
            unirseAunGrupoClassArray2[i].classList.add('d-none');
          }
        } else {
          const unirseAunGrupoClassArray = document.getElementsByClassName("unirseAunGrupoClass");
          for (let i = 0; i < unirseAunGrupoClassArray.length; i++) {
            unirseAunGrupoClassArray[i].classList.remove('d-none');
          }
          const unidoAunGrupoClassArray2 = document.getElementsByClassName("unidoAunGrupoClass");
          for (let i = 0; i < unidoAunGrupoClassArray2.length; i++) {
            unidoAunGrupoClassArray2[i].classList.add('d-none');
          }
        }

        document.querySelector('#grupoStaging').innerHTML = doc.data().nombre;
        document.querySelector('#grupoProyecto').innerHTML = doc.data().proyecto;
        document.querySelector('#addBtnGrupo').innerHTML = `<button class="btn btn-outline-primary" type="button" onclick="unirseAunGrupo('${id}')">Sí, quiero unirme</button>`;
        document.querySelector('#eliminarBtnGrupo').innerHTML = `<button class="btn btn-outline-primary mb-4" type="button" onclick="salirseAunGrupo('${id}','${user.email}')">Sí, quiero salirme</button>`;

        document.querySelector('#ramaStaging').innerHTML = doc.data().rama_pruebas === undefined ? 'Aún no se crea rama' : doc.data().rama_pruebas;
        document.querySelector('#ramaStaging2').innerHTML = doc.data().rama_pruebas === undefined ? 'Aún no se crea rama' : doc.data().rama_pruebas;
        document.querySelector('#ramaStaging3').innerHTML = doc.data().rama_pruebas === undefined ? 'Aún no se crea rama' : doc.data().rama_pruebas;
        document.querySelector('#ramaStaging4').innerHTML = doc.data().rama_pruebas === undefined ? 'Aún no se crea rama' : doc.data().rama_pruebas;
        document.querySelector('#stagingNameCode').innerHTML = doc.data().rama_push === undefined ? 'Aún no se crea rama' : doc.data().rama_push;

        if (doc.data().rama_pruebas !== undefined) {
          const stagingName = doc.data().rama_pruebas.replace('test_', '');
          document.querySelector('#ejemploCode').innerHTML = `git push origin ${doc.data().rama_pruebas}:staging/${stagingName} --force`;
        } else {
          document.querySelector('#ejemploCode').innerHTML = 'No hay ejemplo';
        }


      });
    }

  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}


// Games - Mostrar scores

db.collection("col-stack").orderBy("puntos", "desc")
  .onSnapshot((querySnapshot) => {
    let stack = document.querySelector('#scoreStackId');
    stack.innerHTML = '';
    querySnapshot.forEach((doc) => {
      stack.innerHTML += `
        <div class="score-box">
              <img src="${doc.data().foto}" alt="profile image">
              <div class="score-content">
                <div class="score-header">
                  <div class="name">${doc.data().nombre}</div>
                    <div class="points-checkbox">
                      <input type="checkbox" id="star-1">
                      <label for="star-1">
                        ${doc.data().puntos}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
    });
  });

db.collection("col-stick-hero").orderBy("puntos", "desc")
  .onSnapshot((querySnapshot) => {
    let stack = document.querySelector('#scoreStickHeroId');
    stack.innerHTML = '';
    querySnapshot.forEach((doc) => {
      stack.innerHTML += `
        <div class="score-box">
              <img src="${doc.data().foto}" alt="profile image">
              <div class="score-content">
                <div class="score-header">
                  <div class="name">${doc.data().nombre}</div>
                    <div class="points-checkbox">
                      <input type="checkbox" id="star-1">
                      <label for="star-1">
                        ${doc.data().puntos}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
    });
  });

db.collection("col-crossy-road").orderBy("puntos", "desc")
  .onSnapshot((querySnapshot) => {
    let stack = document.querySelector('#scoreCrossyRoadId');
    stack.innerHTML = '';
    querySnapshot.forEach((doc) => {
      stack.innerHTML += `
        <div class="score-box">
              <img src="${doc.data().foto}" alt="profile image">
              <div class="score-content">
                <div class="score-header">
                  <div class="name">${doc.data().nombre}</div>
                    <div class="points-checkbox">
                      <input type="checkbox" id="star-1">
                      <label for="star-1">
                        ${doc.data().puntos}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
    });
  });

const mostrarListaDesarrolladores = (id) => {
  const staging = db.collection("col-stagings").doc(id);
  let lista = document.querySelector('#listParticipantes');

  lista.innerHTML = '';
  staging.get().then((doc) => {
    if (doc.exists) {
      grupoNombresArray = doc.data().grupo_nombres;
      grupoFotosArray = doc.data().grupo_fotos;

      grupoFotosArray.forEach(function (foto, index) {
        lista.innerHTML += `
        <div class="score-box">
              <img src="${foto}" alt="profile image">
              <div class="score-content">
                <div class="score-header">
                  <div class="name">${grupoNombresArray[index]}</div>
                    <div class="points-checkbox">
                      <input type="checkbox" id="star-1">                      
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
      }, this);
    }

  }).catch((error) => {
    console.log("Error getting document:", error);
  });

}
