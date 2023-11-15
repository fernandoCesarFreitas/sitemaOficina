
describe('User Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001/login')

    cy.get('[data-cy="login-email"]').type('teste@email.com')
    cy.get('[data-cy="login-password"]').type('123456')
    
    cy.intercept("POST", "http://localhost:3000/login",{fixture: "login.json"})
    cy.wait(1000)
    cy.contains('button', 'Entrar').click();

    cy.intercept("GET", "http://localhost:3000/usuarios",{fixture: "users.json"})
    cy.wait(1000)
  })
  it('deve abrir o modal de criacao de usuarios', () => {
    cy.visit('http://localhost:3001/users')
    cy.wait(1000)
    cy.contains("Criar usuário").click();

    cy.contains("button", "Enviar Dados").should("exist")
  })
})