var qtdTimes = 2;
var qtdPessoas = 2;

const span = document.querySelectorAll("span");
console.log(span[0].nextElementSibling);


span.forEach((element) => {
    element.nextElementSibling.addEventListener('change', () => {
        element.innerHTML = element.nextElementSibling.value;
    });
});


function buscaQtds() {
    qtdTimes = document.getElementsByTagName("input")[0].value;
    qtdPessoas = document.getElementsByTagName("input")[1].value;

    window.location.href = `formando-times.html?param1=${qtdTimes}&param2=${qtdPessoas}`;

};
