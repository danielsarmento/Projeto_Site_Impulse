exports.valuesContato = async () => {
    const phaseContatoId = "310751595"

    try{
        const cards = await fetch(
            "https://api.pipefy.com/graphql",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIxNTk5NTQsImVtYWlsIjoiZGFuaWVsLmltcHVsc2ViQGdtYWlsLmNvbSIsImFwcGxpY2F0aW9uIjozMDAyMTcyNTB9fQ.OPT1Bn55gTEq7IMaJdTkdYuGf5vufNlnDKXYGzsnYEXz4Ny1zB6mXQZN5at4EpPbCH_THZXMoAcsyS1eDvOHwA",
                },
                body: JSON.stringify({
                "query": `{ phase ( id: ${phaseContatoId}) {cards_count}}`,
                }),
            }
        )

        const dadosCards = await cards.json()
        //const allCards = dadosCards.data.phase.cards.edges
        const quantidadeDeClientes = dadosCards.data.phase.cards_count

        //const valoresPropostaImplementacao =[]
        //const valoresPropostaRecorrencia = []
        
        //Verifica se Veio Vazio
        /* if(allCards.length == 0){
            return {
                valorImplementacao: 0,
                valorRecorrencia: 0,
                quantidadeDeClientes: quantidadeDeClientes
            }
        } else {
            allCards.map((obj) => {
                obj.node.fields.map((object)=>{
                    if(object.name === "Valor da implementação"){
                        valoresPropostaImplementacao.push(object.value)
                    } if(object.name === "Valor recorrente da proposta"){
                        valoresPropostaRecorrencia.push(object.value)
                    }
                })
            })
            
            const somaPropostaImplementacao = valoresPropostaImplementacao.reduce((acumulador, valorAtual) => {
                const numero = Number(valorAtual.replace(".", "").replace(",", "."));
                return acumulador + numero
            }, 0)
    
            const somaPropostaRecorrencia = valoresPropostaRecorrencia.reduce((acumulador, valorAtual) => {
                const numero = Number(valorAtual.replace(".", "").replace(",", "."));
                return acumulador + numero
            }, 0)
            
            
            
        } */
        
        return {
            //valorImplementacao: somaPropostaImplementacao,
            //valorRecorrencia: somaPropostaRecorrencia,
            quantidadeDeClientes: quantidadeDeClientes
        }
        
    } catch (err){
        console.log(err)
    }
}

//valuesContato()