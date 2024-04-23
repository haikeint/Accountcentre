// https://on.cypress.io/api

describe('My First Test', () => {
    it('visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'You did it!')
    })
})

describe('Test about', () => {
    it('visits the app root url', () => {
        cy.visit('/about')
        cy.contains('This is an about page')
    })
})
