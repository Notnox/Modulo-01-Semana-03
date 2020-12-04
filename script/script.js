function adicionar(){
    let texto = window.document.querySelector('input#textoentrada')

    if (texto.value == ''){return window.alert('[ERRO] É necessário informar uma tarefa!')}

    let tarefaTexto = document.createTextNode(texto.value)

    if (localStorage.totalTarefas == undefined) {
        localStorage.setItem('totalTarefas',1)
    } else {
        let vLS = Number(localStorage.totalTarefas)
        vLS++
        localStorage.setItem('totalTarefas',vLS)
    }

    let vLinha = 'div' + localStorage.totalTarefas
    let vLabel = 'lb' + localStorage.totalTarefas

    let tarefaBotao = document.createTextNode('X')

    let linha = document.createElement('div')
    linha.setAttribute('class', 'tarefa')
    linha.setAttribute('id', vLinha)

    let check = document.createElement('input')
    check.setAttribute('type', 'checkbox')
    check.setAttribute('id', 'ch'+ vLabel)
    check.onclick = function (){realizado(vLabel)}

    let tarefa = document.createElement('p')
    tarefa.setAttribute('id', vLabel)
    tarefa.setAttribute('title', texto.value)
    tarefa.appendChild(tarefaTexto)

    let botao = document.createElement('button')
    botao.setAttribute('title', 'Excluir tarefa')
    botao.onclick = function (){excluir(vLinha,vLabel)}
    botao.appendChild(tarefaBotao)

    let tarefas = window.document.querySelector('section#tarefas')
  
    tarefas.appendChild(linha)

    linha.appendChild(check)
    linha.appendChild(tarefa)
    linha.appendChild(botao)

    texto.value = ''
}

function realizado(tarefa){
    let feito = window.document.querySelector('input#' + 'ch' + tarefa)
    let vtarefa = window.document.querySelector('p#' + tarefa)
    
    if (feito.checked == true){
        vtarefa.style = "text-decoration: line-through 4px"
    } else {
        vtarefa.style = "text-decoration: none"
    }
}

function excluir(linha,vLinha){
    let vTarefa = window.document.querySelector('p#' + vLinha)

    let escolha = window.confirm(`Você tem certeza que deseja remover a tarefa ${vTarefa.innerHTML}?`)

    if (escolha) {
        let tarefa = window.document.querySelector('div#' + linha)

        tarefa.parentNode.removeChild(tarefa)
    }
}