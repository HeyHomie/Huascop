const buscarStagings = () => {
  const busqueda = document.querySelector('#busqueda_staging').value;
  const filter = busqueda.toLowerCase()
  const div = document.querySelector('#list_stagings');

  const div2 = div.getElementsByClassName("project-box-content-header");

  for (i = 0; i < div2.length; i++) {
    p = div2[i].getElementsByTagName("p")[0];

    if (p) {
      txtValue = p.textContent || p.innerText;

      if (txtValue.indexOf(filter) > -1) {
        document.getElementsByClassName('project-box-wrapper')[i].style.display = "";
      } else {
        document.getElementsByClassName('project-box-wrapper')[i].style.display = "none";
      }
    }
  }

}


