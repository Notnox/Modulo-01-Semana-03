if (localStorage.tarefasSalvas == undefined) {
    iniciarLS()
} else {
    let listaTarefas = JSON.parse(localStorage['tarefasSalvas'])
    if (listaTarefas.length > 0) {
        let apagarListas = window.confirm('Você deseja carregar a lista salva?')

        if (apagarListas){
            localStorage.setItem('totalTarefas',1)
            for (let t in listaTarefas){
                criarLinhas(listaTarefas[t],'sim')
            }
        } else {
            iniciarLS()
        }
    }
}

function adicionar(){
    let texto = window.document.querySelector('input#textoentrada')

    if (texto.value == ''){return window.alert('[ERRO] É necessário informar uma tarefa!')}

    criarLinhas(texto.value)

    texto.value = ''
}

function criarLinhas(valorTexto,recarregar){
    let tarefaTexto = document.createTextNode(valorTexto)

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
    if (recarregar == 'sim') {
        let listaTarefas = JSON.parse(localStorage['tarefasSalvas'])
        let tarefasCheck = JSON.parse(localStorage['tarefasConcluidas'])

        for (let n = 0; n < listaTarefas.length;n++){
            if (listaTarefas[n] == valorTexto){
                if (tarefasCheck[n] == 'true'){
                    check.setAttribute('checked', 'checked')
                }
            }
        }
    }

    let tarefa = document.createElement('p')
    tarefa.setAttribute('id', vLabel)
    tarefa.setAttribute('title', valorTexto)
    tarefa.onclick = function (){exibirTarefa(vLabel)}
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

    if (recarregar != 'sim'){
        let listaTarefas = []
        let ltarefas = JSON.parse(localStorage['tarefasSalvas'])
        for (let n in ltarefas){
            listaTarefas.push(ltarefas[n])
        }

        listaTarefas.push(valorTexto)
        localStorage["tarefasSalvas"] = JSON.stringify(listaTarefas)

        let tarefasCheck = JSON.parse(localStorage['tarefasConcluidas'])
        tarefasCheck.push('false')
        localStorage["tarefasConcluidas"] = JSON.stringify(tarefasCheck)
    } else {
        realizado(vLabel)
    }
}

function iniciarLS(){
    let listaTarefas = []
    let tarefasCheck = []
    localStorage["tarefasSalvas"] = JSON.stringify(listaTarefas)
    localStorage["tarefasConcluidas"] = JSON.stringify(tarefasCheck)
    localStorage.setItem('totalTarefas',1)
}

function realizado(tarefa){
    let feito = window.document.querySelector('input#' + 'ch' + tarefa)
    let vtarefa = window.document.querySelector('p#' + tarefa)
    let auxiliar = false


    if (feito.checked == true){
        vtarefa.style = "text-decoration: line-through 4px"
        auxiliar = true
    } else {
        vtarefa.style = "text-decoration: none"
        auxiliar = false
    }

    let listaTarefas = JSON.parse(localStorage['tarefasSalvas'])
    let tarefasCheck = JSON.parse(localStorage['tarefasConcluidas'])
    let auxiliarTarefa = []

    for (let n = 0; n < listaTarefas.length;n++){
        if (listaTarefas[n] == vtarefa.innerHTML){
            if (auxiliar) {
                auxiliarTarefa.push('true')
            } else {
                auxiliarTarefa.push('false')
            }
        } else {
            auxiliarTarefa.push(tarefasCheck[n])
        }
    }
    localStorage["tarefasConcluidas"] = JSON.stringify(auxiliarTarefa)
}

function excluir(linha,vLinha){
    let vTarefa = window.document.querySelector('p#' + vLinha)

    let escolha = window.confirm(`Você tem certeza que deseja remover a tarefa ${vTarefa.innerHTML}?`)

    if (escolha) {
        let tarefa = window.document.querySelector('div#' + linha)

        tarefa.parentNode.removeChild(tarefa)

        let listaTarefas = JSON.parse(localStorage['tarefasSalvas'])
        let tarefasCheck = JSON.parse(localStorage['tarefasConcluidas'])

        for (let n in listaTarefas){
        if (listaTarefas[n] == vTarefa.innerHTML){
            listaTarefas.splice(n,1)
            tarefasCheck.splice(n,1)

            localStorage.setItem('tarefasSalvas',JSON.stringify(listaTarefas))
            localStorage.setItem('tarefasConcluidas',JSON.stringify(tarefasCheck))
            return
        }
    }

    }
}

function exibirTarefa(tarefa) {
    let vtarefa = window.document.querySelector('p#' + tarefa)
    window.alert(vtarefa.innerHTML)
}   
