import { recruitmentLocators } from "../locators"
import { recruitmentModule } from "../modules/recruitment"

describe('Recruitment Module - Candidates', () => {
    let candidateData

    before(() => {
        cy.fixture('users.json').then((users) => {
            candidateData = users.newCandidate
        })
    })

    beforeEach(() => {
        cy.login() // Uses cy.session() - very fast
    })

    it('should add a new candidate successfully', () => {
        Object.assign(candidateData, { email: `john.doe${Date.now()}@example.com` })
        recruitmentModule.addCandidate(candidateData)
        Cypress.env('lastCreatedCandidate', candidateData.fullName)
        recruitmentModule.verifyCandidateExists(`${candidateData.firstName} ${candidateData.middleName} ${candidateData.lastName}`)
    })

    it('should allow valid PDF resume', () => {
        Object.assign(candidateData, { email: `john.doe${Date.now()}@example.com` })
        recruitmentModule.addCandidate(candidateData, false)
        Cypress.env('lastCreatedCandidate', candidateData.fullName)
        recruitmentModule.uploadResume('cypress/fixtures/upload/resume-valid.pdf')
        cy.get(recruitmentLocators.saveButton).click()
        recruitmentModule.verifyUploadSuccess()
    })

    afterEach(() => {
        const fullName = Cypress.env('lastCreatedCandidate')
        if (fullName) {
            recruitmentModule.deleteCandidate(fullName)
            Cypress.env('lastCreatedCandidate', null)
        }
    })
})