document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });

  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');

  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });

  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });

  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });

  const miStorageGlobal = window.localStorage;

  if (!miStorageGlobal.aviso_huascop) {
    Swal.fire({
      title: 'Importante',
      text: 'Ahora solo se tendrán como máximo 2 stagins por proyecto, por lo que es importante que al momento que termines de probar lo dejes de usar para que otros compañeros puedan hacer sus pruebas  ',
      width: 600,
      confirmButtonText: 'Entendido',
      padding: '1em',
      color: '#1f1c24',
      background: '#fff url(/images/trees.png)',
      backdrop: `
    #0e1412b8
    left top
    no-repeat
  `
    });
    miStorageGlobal.setItem('aviso_huascop', 'true');
  }

  async function start() {
    const steps = ['1', '2']
    const Queue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Siguiente >',
      // optional classes to avoid backdrop blinking between steps
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' }
    })

    await Queue.fire({
      title: 'Mejora #1',
      currentProgressStep: 0,
      html: `<p>Ahora múltiples usuarios podrán usar un mismo staging</p><br><video class="w-100" src="https://heyhomie.github.io/Huascop/videos/mejora1.mov" autoplay>Tu navegador no admite el elemento <code>video</code>.</video>`,
      // optional class to show fade-in backdrop animation which was disabled in Queue mixin
      showClass: { backdrop: 'swal2-noanimation' },
    })
    await Queue.fire({
      title: 'Mejora #2',
      html: `<p>Ahora podrás quitarte por unos minutos el estrés en lo que descansas la mente y juegas unos minutos podrás sumar score y ver quien tiene mayor puntos ganados en los juegos. Todos los developers podran jugar y el score se estará guardando</p><br><video class="w-100" src="https://heyhomie.github.io/Huascop/videos/mejora2.mov" autoplay >Tu navegador no admite el elemento <code>video</code>.</video>`,
      currentProgressStep: 1
    })
  }
  if (!miStorageGlobal.mejoras_huascop) {
    start();
    miStorageGlobal.setItem('mejoras_huascop', 'true');
  }

});