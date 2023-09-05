
// Carregando informações de config





const parametroTimes = new URLSearchParams(window.location.search);
const timesJSON = parametroTimes.get('dados'); // valor1
console.log(timesJSON); 

const listaPalavras = localStorage.getItem("listaPalavras");
console.log(listaPalavras); 
