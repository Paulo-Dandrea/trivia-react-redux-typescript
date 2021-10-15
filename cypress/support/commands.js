Cypress.Commands.add("addPlayer", (name, score = 0, assertions = 0, gravatarEmail = 'mail@mail.com') => {
    window.localStorage.setItem('player', JSON.stringify({
        player: {
            name,
            assertions,
            score,
            gravatarEmail
        }
    }))
})
Cypress.Commands.add("addRanking", (ranking = []) => {
    window.localStorage.setItem('ranking', JSON.stringify(ranking))
})

Cypress.Commands.add('setToken', () => {
    cy.request({
        method: 'GET',
        url: 'https://opentdb.com/api_token.php?command=request',
    })
        .then((resp) => {
            console.log({resp})
            window.localStorage.setItem('token', resp.body.token)
        })

})
