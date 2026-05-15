import { recruitmentLocators } from "../locators"
import { recruitmentModule } from "../modules/recruitment"
import { recruitmentApi } from "../modules/recruitment/recruitementApi"

describe('Recruitment API - Resume Upload Security Tests', () => {
    let candidateId

    beforeEach(() => {
        cy.login()
    })

    // it('should reject dangerous file extensions (client validation)', () => {
    //     const dangerousFiles = [
    //         'cypress/fixtures/upload/malicious.php',
    //         'cypress/fixtures/upload/malicious.sh',
    //         // 'cypress/fixtures/upload/magicbytes.php.pdf',
    //         'cypress/fixtures/upload/shell.php5'
    //     ]

    //     dangerousFiles.forEach((file) => {
    //         cy.visit('/recruitment/viewCandidates')
    //         cy.get(recruitmentLocators.saveButton).contains('Add').click()

    //         cy.get(recruitmentLocators.simpleButton).click()
    //         cy.get(recruitmentLocators.fileUpload).selectFile(file, { force: true })

    //         recruitmentModule.verifyUploadError()
    //     })
    // })

    it('should create candidate and reject dangerous file types (server validation)', () => {
        const maliciousFiles = [
            {
                name: 'malicious.php',
                base64: 'PD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ZWNobyAnU2hlbGwgZG9uZSAhJzsgPz4='
            },
            {
                name: 'magicbytes.php.pdf',
                base64: 'JVBERi0xLjQKPD9waHAgc3lzdGVtKCRfR0VUWydjbWQnXSk7ID8+Cg=='
            }
        ];

        maliciousFiles.forEach((file) => {
            // Step 1: Create candidate
            recruitmentApi.createCandidate({
                firstName: 'Security',
                lastName: 'Test',
                email: `sec${Date.now()}@test.com`,
                vacancyId: 1
            }).then((response) => {
                expect(response.status).to.eq(200)
                Cypress.env('lastCreatedCandidate', "Security Test")
                candidateId = response.body.data.id

                // Step 2: Try to upload dangerous file
                recruitmentApi.uploadAttachment(candidateId, file.name, file.base64)
                    .then((attachResponse) => {
                        expect(attachResponse.status).to.eq(422) // Unprocessable Entity
                        cy.log(`✅ Blocked ${file.name} as expected`)
                    })
            })
        })
    })

    afterEach(() => {
        const email = Cypress.env('lastCreatedCandidate')
        if (email) {
            recruitmentModule.deleteCandidate(email)
            Cypress.env('lastCreatedCandidate', null)
        }
    })
})