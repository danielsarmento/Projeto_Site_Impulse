exports.valuesCapturas = async () => {
    const phaseCapturasId = "310785032"

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
                "query": `{ phase ( id: ${phaseCapturasId}) {cards_count}}`,
                }),
            }
        )

        const dadosCards = await cards.json()
        //const allCards = dadosCards.data.phase.cards.edges
        const quantidadeDeClientes = dadosCards.data.phase.cards_count

        return {

            quantidadeDeClientes: quantidadeDeClientes
        }
        
    } catch (err){
        console.log(err)
    }
}

//valuesCapturas()