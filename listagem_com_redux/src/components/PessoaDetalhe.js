import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'primereact/card'

const PessoaDetalhe = (props) => {
        return (
            <Card title="Detalhes">
                 <h3 className="text-center">
                     {props.pessoa?.nome} {props.pessoa?.sobrenome}
                 </h3>
                 <p className="text-center">{props.pessoa?.endereco}</p>
            </Card>
            // <div >
            //     {props.pessoa?.nome}
            // </div>
        )
}

const mapStateToProps = (state) => {
    return {
        pessoa: state.pessoaSelecionada
    }
}

export default connect(mapStateToProps)(PessoaDetalhe)
