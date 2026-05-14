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
        recruitmentModule.verifyCandidateExists(`${candidateData.firstName} ${candidateData.middleName} ${candidateData.lastName}`)
    })

    it('should allow valid PDF resume', () => {
        Object.assign(candidateData, { email: `john.doe${Date.now()}@example.com` })
        recruitmentModule.addCandidate(candidateData, false)
        recruitmentModule.uploadResume('cypress/fixtures/upload/resume-valid.pdf')
        cy.get(recruitmentLocators.saveButton).click()
        recruitmentModule.verifyUploadSuccess()
    })
})