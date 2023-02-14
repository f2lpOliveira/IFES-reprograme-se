(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          inserir();
          form.classList.remove("was-validated");
          form.reset();
        }
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
  });
})();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bd_veiculos")) ?? [];
}

function setLocalStorage(bd_veiculos) {
  localStorage.setItem("bd_veiculos", JSON.stringify(bd_veiculos));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  // Adaptação da função atualizarTabela (5 pontos)
  limparTabela();
  const bd_veiculos = getLocalStorage();
  let index = 0;
  for (veiculo of bd_veiculos) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${veiculo.marca}</td>
        <td>${veiculo.modelo}</td>
        <td>${veiculo.ano}</td>
        <td>${veiculo.cor}</td>
				<td>${veiculo.condicao}</td>
				<td>${veiculo.preco}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `;
    document.querySelector("#tabela>tbody").appendChild(novaLinha);
    index++;
  }
}

function inserir() {
  // Adaptação da função inserir (10 pontos)
  const veiculo = {
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    ano: document.getElementById("ano").value,
    cor: document.getElementById("cor").value,
    condicao: document.getElementById("condicao").value,
    preco: document.getElementById("preco").value,
  };
  const bd_veiculos = getLocalStorage();
  bd_veiculos.push(veiculo);
  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function excluir(index) {
  // Adaptação da função excluir (5 pontos)
  const bd_veiculos = getLocalStorage();
  bd_veiculos.splice(index, 1);
  setLocalStorage(bd_veiculos);
  atualizarTabela();
}

function validarModelo() {
  // Adaptação da função validar (10 pontos)
  const bd_veiculos = getLocalStorage();
  for (veiculo of bd_veiculos) {
    if (modelo.value == veiculo.modelo) {
      modelo.setCustomValidity("Este modelo de veículo já existe!");
      feedbackModelo.innerText = "Este modelo de veículo já existe!";
      return false;
    } else {
      modelo.setCustomValidity("");
      feedbackModelo.innerText = "Informe o modelo do veículo corretamente.";
    }
  }
  return true;
}

atualizarTabela();
// Seleção dos elementos e adição do listener para validação customizada (5 pontos)
const modelo = document.getElementById("modelo");
const feedbackModelo = document.getElementById("feedbackModelo");
modelo.addEventListener("input", validarModelo);
