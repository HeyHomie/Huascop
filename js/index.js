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
      padding: '3em',
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
});