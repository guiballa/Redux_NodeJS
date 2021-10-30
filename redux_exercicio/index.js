const redux = require ('redux')
const prompts = require ('prompts')

const realizaVestibular = (nome, cpf) => {
    const nota_comparacao = Math.random() <= 0.7 
    const notaAtual = nota_comparacao ? Math.floor(Math.random()*5) + 6 : Math.floor(Math.random()*6)
    console.log(notaAtual)
    return {
        type: "REALIZA_VESTIBULAR",
        payload: {
            nome,
            cpf,
            notaAtual
        }
    }
}

const realizaMatricula = (cpf, status) => {
    return {
        type: "REALIZA_MATRICULA",
        payload: {
            cpf,
            status
        }
    }
}

const reducerVestibular = (reducerVestibularAtual = [], acao) => {
    if(acao.type === "REALIZA_VESTIBULAR") {
        return [...reducerVestibularAtual,acao.payload]
    }
    return [...reducerVestibularAtual]
}

const reducerMatricula = (reducerMatriculaAtual = [], acao) => {
    if(acao.type === "REALIZA_MATRICULA") {
        return [...reducerMatriculaAtual,acao.payload]
    }
    return [...reducerMatriculaAtual]
}

const reducers = redux.combineReducers({
    historicoMatricula: reducerMatricula,
    historicoVestibular: reducerVestibular
})

const store = redux.createStore(reducers)

const inicio = async () => {
    const menu = "1-Realizar Vestibular \n2-Realizar Matricula\n3-Visualizar meu status\n4-Visualizar a lista de aprovados\n0-Sair"
    let resposta
    do{
        try {
            resposta = await prompts({
                type: 'number',
                name: 'opcao',
                message: menu
            })
            switch(resposta.opcao){
                case 1:{
                    const {nome} = await prompts({
                        type:'text',
                        name: 'nome',
                        message: 'Digite seu nome'
                    })
                    const {cpf} = await prompts({
                        type:'text',
                        name: 'cpf',
                        message: 'Digite seu CPF'
                    })
                    const acao = realizaVestibular(nome, cpf)
                    store.dispatch(acao)
                    break
                }
                case 2: {
                    const {cpf} = await prompts({
                        type:'text',
                        name: 'cpf',
                        message: 'Digite seu CPF'
                    })
                    const aprovado = store.getState().historicoVestibular.find(
                        aluno => aluno.cpf === cpf && aluno.notaAtual >= 6
                    )
                    if(aprovado){
                        store.dispatch(realizaMatricula(cpf,'M'))
                        console.log('Ok, matriculado')
                    } else {
                        store.dispatch(realizaMatricula(cpf,'NM'))
                        console.log('Não conseguiu ser aprovado')
                    }
                    break
                }
                case 3: {
                    const {cpf} = await prompts({
                        type:'text',
                        name: 'cpf',
                        message: 'Digite seu CPF'
                    })
                    const aluno = store.getState().historicoMatricula.find(
                        a => a.cpf === cpf
                    ) 
                    if (aluno) {
                        console.log(`Seu status é: ${aluno.status}`)
                    } else {
                        console.log('Seu nome não está na lista')
                    }
                    break
                }
                case 4: {
                    const listAprovados = store.getState().historicoVestibular.filter(
                        aluno => aluno.notaAtual >= 6
                    )
                    console.log(listAprovados)
                    break
                }
                case 0: {
                    console.log('Até mais')
                    break
                }

            }

        } catch (error) {
            console.log('Opção invalida')
        }
    } while(resposta.opcao !== 0)
}
inicio()