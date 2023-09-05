
const parametros = new URLSearchParams(window.location.search);
const qtdTimes = parametros.get('param1'); // valor1
const qtdPessoas = parametros.get('param2'); // valor2

const divTimes = document.getElementById("nomes-times");

for (let index = 0; index < qtdTimes; index++) {

    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = "Time " + (index+1);
    div.appendChild(p);

    for (let index = 0; index < qtdPessoas; index++) {

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Nome Jogador " + (index+1));
        div.appendChild(input);
    }
    
    divTimes.appendChild(div);
}


var times = [];
var qtdNomes = parseInt(qtdPessoas);


const prosseguir = document.getElementById("prosseguir");


function montaTimes(){

    const nomeTime = document.getElementsByTagName("p");
    const nomes = document.getElementsByTagName("input");

    for (let i = 0; i < nomeTime.length; i++) {
        var time = new Times(nomeTime[i].innerHTML);
        for (let j = i*qtdNomes; j < i*qtdNomes+qtdNomes; j++) {
            time.pessoas.push(nomes[j].value);
        }
        times.push(time);
    }

    const parametroConsulta = encodeURIComponent(JSON.stringify(times));
    window.location.href = `config.html?dados=${parametroConsulta}`;
};

