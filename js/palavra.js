var palavras = [];

const opcoes = document.getElementsByTagName("input");
const button = document.getElementById("iniciar");

const armazenaPalavras = new Promise((resolve, reject) => {
    button.addEventListener("click", () => {
        for (const op of opcoes){
            if(op.checked){
                palavras.push(op.name);
            }
        }

        resolve(palavras);
        window.location.href = "times.html";
    });
})


armazenaPalavras.then((dados) =>{
    localStorage.setItem("listaPalavras", dados);
})