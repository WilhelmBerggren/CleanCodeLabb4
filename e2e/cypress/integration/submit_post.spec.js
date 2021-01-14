const title = 'Your grandma won\'t believe how much you\'ve grown these past two weeks!'
const url = 'https://picsum.photos/200'

context('PostItems', () => {
  beforeEach(() => {
    cy.visit('http://localhost')
  })

  it('submits a form and uploads a link', () => {
    cy.get('#title-field')
      .type(title)
      .should('have.value', title)

    cy.get('#url-field')
      .type(url)
      .should('have.value', url)

    cy.get('#submit-post-button').click()
  })
  
  it('finds post on site', () => {
    cy.get('.post').contains(title).parent().parent()
      .children('.post-url').should('have.text', url)
  })
})

context('DeleteItems', () => {
  beforeEach(() => {
    cy.visit('http://localhost')
  })
  
  it('deletes post', () => {
    cy.get('.post').contains(title).parent().parent()
      .find('.delete-post-button').click()

    })
  it('makes sure post is deleted', () => {
    cy.get('.post').contains(title).should('not.exist')
  })
})
