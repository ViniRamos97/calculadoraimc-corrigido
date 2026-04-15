function calcularIMC() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    if (peso === "" || altura === "") {
        alert("Preencha os campos!");
        return;
    }

    let imc = peso / (altura * altura);
    document.getElementById("resultado").innerHTML = "IMC: " + imc.toFixed(2);
}

async function salvarIMC() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    let imcTexto = document.getElementById("resultado").innerText;

    if (imcTexto === "") {
        alert("Calcule o IMC primeiro!");
        return;
    }

    let imc = imcTexto.replace("IMC: ", "");

    await fetch("http://localhost:3001/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            peso: peso,
            altura: altura,
            imc: imc
        }),
    });

    carregarIMCs();
}

async function carregarIMCs() {
    let resposta = await fetch("http://localhost:3001/ler");
    let dados = await resposta.json();

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    dados.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `IMC: ${item.imc} | Peso: ${item.peso} | Altura: ${item.altura}`;
        lista.appendChild(li);
    });
}

window.onload = function () {
    carregarIMCs();
};