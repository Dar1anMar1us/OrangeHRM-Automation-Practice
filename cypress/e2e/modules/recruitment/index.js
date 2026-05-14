import { recruitmentLocators } from "../../locators";

export const recruitmentModule = {
    visitCandidates() {
        cy.visit('/recruitment/viewCandidates')
        return this;
    },

    visitVacancies() {
        cy.visit('/recruitment/viewJobVacancy')
        return this;
    },

    addCandidate(candidate, save = true) {
        this.visitCandidates()

        cy.get(recruitmentLocators.addButton).contains('Add').click()

        cy.get(recruitmentLocators.firstName).type(candidate.firstName);
        cy.get(recruitmentLocators.middleName).type(candidate.middleName || '')
        cy.get(recruitmentLocators.lastName).type(candidate.lastName);

        cy.get(recruitmentLocators.email).type(candidate.email)
        if (candidate.contactNumber) {
            cy.get(recruitmentLocators.contactNumber).type(candidate.contactNumber)
        }

        if (candidate.vacancy) {
            cy.get(recruitmentLocators.vacancyDropdown).click()
            cy.contains('.oxd-select-option', candidate.vacancy).click()
        }

        save && cy.get(recruitmentLocators.saveButton).click()
            .then(() => cy.get(recruitmentLocators.successToast).should('contain', 'Successfully Saved'))
        
        return this
    },

    searchCandidate(fullName) {
        cy.visit('/recruitment/viewCandidates')
        cy.get(recruitmentLocators.searchHints).first().type(fullName)
        cy.get('button.oxd-button').contains('Search').click()
        return this
    },

    verifyCandidateExists(fullName) {
        this.searchCandidate(fullName)
        cy.get(recruitmentLocators.candidateRecord).should('contain', fullName)
    },

    uploadResume(filePath) {
        cy.get(recruitmentLocators.fileUpload).selectFile(filePath, { force: true });
        return this;
    },

    verifyUploadSuccess() {
        cy.get(recruitmentLocators.successToast).should('be.visible');
    },

    verifyUploadError() {
        cy.get(recruitmentLocators.errorMessage).should('contain', 'File type not allowed')
    }
}