const redux = require('redux')
//essa função é criadora de ação
const criarContrato = (nome, taxa) => {
    //esse JSON que ela devolve é uma ação
    return {
        type: 'CRIAR_CONTRATO',
        payload:{
            nome,
            taxa
        }
    }
}

//essa função é criadora de ação
const cancelarContrato = (nome) => {
    //esse JSON que ela devolve é uma ação
    return{
        type: 'CANCELAR_CONTRATO',
        payload:{
            nome
        }
    }
}

//essa função é criadora de ação
const solicitarCashback = (nome, valor) => {
    //esse JSON que ela devolve é uma ação
    return{
        type: 'SOLICITAR_CASHBACK',
        payload:{
            nome,
            valor
        }
    }
}

//essa função é um reducer
//por isso, ela recebe uma fatia do estado e a ação sobre a qual pode operar
const historicoDePedidosCashback = (historicoDePedidosCashbackAtual = [],acao) => {
    if(acao.type === 'SOLICITAR_CASHBACK'){
        return [
            ...historicoDePedidosCashbackAtual,
            acao.payload
        ]
    }
    return historicoDePedidosCashbackAtual
}

//essa função é um reducer
//por isso, ela recebe uma fatia do estado e a ação sobre a qual pode operar
const caixa = (valorEmCaixa = 0, acao) => {
    if(acao.type === 'SOLICITAR_CASHBACK'){
        return valorEmCaixa - acao.payload.valor
    } else if(acao.type === 'CRIAR_CONTRATO'){
        return valorEmCaixa + acao.payload.taxa
    } 
    return valorEmCaixa
}


//essa função é um reducer
//por isso, ela recebe uma fatia do estado e a ação sobre a qual pode operar
const contratos = (ListaContratosAtuais = [],acao) => {
    if(acao.type === 'CRIAR_CONTRATO'){
        return [
            ...ListaContratosAtuais,
            acao.payload
        ]
    }
    if(acao.type === 'CANCELAR_CONTRATO'){
        return ListaContratosAtuais.filter(c => c.nome !== acao.payload.nome)
        
    }
    return ListaContratosAtuais
}


//vamos construir um objeto chamado 'store'
//store: todos os reducers e as partes de estado que cada um manipula

//vamos combinar os seus reducers numa coisa só
const todosOsReducers = redux.combineReducers({
    historicoDePedidosCashback,
    caixa,
    contratos
})

/*
const store = redux.createStore(todosOsReducers)
store.dispatch(criarContrato('José',50))
console.log(store.getState())
const acaoContratoMaria = criarContrato('Maria',50)
store.dispatch(acaoContratoMaria)
console.log(store.getState())
const acaoCashbackMaria = solicitarCashback('Maria',10)
store.dispatch(acaoCashbackMaria)
console.log(store.getState())
const acaoCashbackJose = solicitarCashback('Jose',20)
store.dispatch(acaoCashbackJose)
console.log(store.getState())
const acaoCancelarContratoMaria = cancelarContrato('Maria')
store.dispatch(acaoCancelarContratoMaria)
console.log(store.getState())
*/

const transacao = (store) => {
    const nomes = ['José','Maria','Caio','Guilherme']
    const funcoes = {
        0: (nome)=>{store.dispatch(criarContrato(nome,50))},
        1: (nome)=>{store.dispatch(cancelarContrato(nome))},
        2: (nome)=>{store.dispatch(solicitarCashback(nome,(Math.floor(Math.random()*21))+10))}
    }
    funcaoSorteada = Math.floor(Math.random()*3)
    nomeSorteado = nomes[Math.floor(Math.random()*4)]
    funcoes[funcaoSorteada](nomeSorteado)
    console.log(store.getState())
}

const store = redux.createStore(todosOsReducers)
setInterval(() => {transacao(store)},5000)
