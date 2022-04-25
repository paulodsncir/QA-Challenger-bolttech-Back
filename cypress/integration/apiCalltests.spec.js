import apidata from '../fixtures/apidata.json'
import user from '../fixtures/user.json'


describe('Api Calls Test', () => {

    it('Should Register user "admin" and validate if was registered ', () => {
        let userName

        cy.request({
            method: 'POST',
            url: `${apidata.url}register`,
            body: {
                email: user.email,
                password: user.password,
            }


        }).then((response) => {
            expect(response.status).to.equal('200')
            userName = response.body.userName

            // outras validações seriam feitas aqui mas não consegui fazer o registro

        })

        // uma nova chamada na api para garantir que o usuario foi registrado
        cy.request({
            method: 'POST',
            url: `${apidata.url}login`,
            basicAuth: {
                userName: userName,
                password: user.password
            }

        }).then((response) => {
            expect(response.body.aceesToken).to.not.be('')
        })
    })
})