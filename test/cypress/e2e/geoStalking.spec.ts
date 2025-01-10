describe('/#/photo-wall', () => {
  beforeEach(() => {
    cy.visit('/#/forgot-password')
  })

  describe('challenge "geoStalkingMeta"', () => {
    it('Should be possible to find the answer to a security question in the meta-data of a photo on the photo wall', () => {
      cy.task('GetFromMemories', 'geoStalkingMetaSecurityAnswer').then(
        (answer: unknown) => {
          const answerString = answer as string;
          cy.task('GetFromConfig', 'application.domain').then((appDomain: unknown) => {
            const appDomainString = appDomain as string;
            cy.get('#email').type(`john@${appDomainString}`)
            cy.get('#securityAnswer').type(answerString)
            cy.get('#newPassword').type('123456')
            cy.get('#newPasswordRepeat').type('123456')
            cy.get('#resetButton').click()

            cy.expectChallengeSolved({ challenge: 'Meta Geo Stalking' })
          })
        }
      )
    })
  })

  describe('challenge "geoStalkingVisual"', () => {
    it('Should be possible to determine the answer to a security question by looking closely at an image on the photo wall', () => {
      cy.task('GetFromMemories', 'geoStalkingVisualSecurityAnswer').then(
        (answer: unknown) => {
          const answerString = answer as string;
          cy.task('GetFromConfig', 'application.domain').then((appDomain: unknown) => {
            const appDomainString = appDomain as string;
            cy.get('#email').type(`emma@${appDomainString}`)
            cy.get('#securityAnswer').type(answerString)
            cy.get('#newPassword').type('123456')
            cy.get('#newPasswordRepeat').type('123456')
            cy.get('#resetButton').click()

            cy.expectChallengeSolved({ challenge: 'Visual Geo Stalking' })
          })
        }
      )
    })
  })
})
