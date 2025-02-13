let valores = [];

function atualizarEventos() {
    document.querySelectorAll(".input").forEach((input, index) => {
        input.addEventListener("input", function (event) {
            valores[index] = formatarValor(event.target.value);
            input.value = valores[index];
            calcularTotal();
        });
    });

    document.querySelectorAll(".btns-action .fa-trash").forEach((btn, index) => {
        btn.parentElement.onclick = function () {
            removerInput(index);
        };
    });
}

function formatarValor(valor) {
    valor = valor.replace(/\D/g, ""); // Remove tudo que não for número
    valor = (parseInt(valor, 10) || 0).toString();
    
    while (valor.length < 3) {
        valor = "0" + valor; // Garante pelo menos três dígitos
    }
    
    let inteiro = valor.slice(0, -2);
    let decimal = valor.slice(-2);
    
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formata milhares
    return `${inteiro},${decimal}`;
}

function calcularTotal() {
    let total = valores.reduce((acc, val) => {
        let numero = parseFloat(val.replace(/\./g, "").replace(",", ".")) || 0; // Remove pontos e substitui vírgula por ponto
        return acc + numero;
    }, 0);
    document.getElementById("result").textContent = total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function removerInput(index) {
    document.querySelectorAll(".input-group")[index].remove();
    valores.splice(index, 1);
    atualizarEventos();
    calcularTotal();
}

function addInput() {
    const li = document.createElement("li");
    li.classList.add("input-group");

    const span = document.createElement("span");
    span.classList.add("currency-ref");
    span.textContent = "R$";

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("input");
    input.placeholder = "0,00";
    input.inputMode = "numeric"
    input.value = "0,00";

    const btnsAction = document.createElement("div");
    btnsAction.classList.add("btns-action");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteButton.appendChild(deleteIcon);

    btnsAction.appendChild(deleteButton);

    li.appendChild(span);
    li.appendChild(input);
    li.appendChild(btnsAction);

    document.getElementById("input-list").appendChild(li);
    valores.push("0,00"); // Adiciona novo espaço no array
    atualizarEventos();
    calcularTotal();
}

document.getElementById("add-input").addEventListener("click", addInput);

atualizarEventos();
