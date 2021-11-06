export const selecionarPessoa = (pessoa) => {
    return{
        type: 'PESSOA_SELECIONADA',
        payload: {
            pessoa
        }
    }
}