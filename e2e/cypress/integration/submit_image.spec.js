const title = 'To be wise is to yeet the devil'
const url = 'https://i.imgur.com/Ux1z7xS.jpg'

context('PostItems', () => {
  beforeEach(() => {
    cy.visit('http://localhost')
  })

  it('submits a form and uploads an image-link', () => {
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
      .find('.post-image').should('exist')
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
