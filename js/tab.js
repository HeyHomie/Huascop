
const classStagins = document.getElementsByClassName("stagings");
const classGames = document.getElementsByClassName("games");
const btmStagings = document.getElementsByClassName("btmStagings");
const btnGames = document.getElementsByClassName("btnGames");

document.querySelector("#btmStagings").addEventListener("click", function () {
    classStagins[0].classList.remove('d-none');
    classGames[0].classList.add('d-none');
    btnGames[0].classList.remove('active');
    btmStagings[0].classList.add('active');
});

document.querySelector("#btnGames").addEventListener("click", function () {
    classStagins[0].classList.add('d-none');
    classGames[0].classList.remove('d-none');
    btnGames[0].classList.add('active');
    btmStagings[0].classList.remove('active');
});
