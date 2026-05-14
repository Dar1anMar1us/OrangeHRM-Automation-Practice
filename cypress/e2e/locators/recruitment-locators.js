export const recruitmentLocators = {
    // Left menu
    recruitmentMenu: 'a[href*="recruitment"]',
    // Sub menus
    candidatesTab: 'li.oxd-topbar-body-nav-tab-item:contains("Candidates")',
    vacanciesTab: 'li.oxd-topbar-body-nav-tab-item:contains("Vacancies")',
    // Add Candidate form
    addButton: 'button.oxd-button.oxd-button--medium.oxd-button--secondary',
    firstName: 'input[name="firstName"]',
    middleName: 'input[name="middleName"]',
    lastName: 'input[name="lastName"]',
    simpleButton: '.oxd-file-button',
    email: ':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input',
    contactNumber: '.oxd-grid-3 > :nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input',
    vacancyDropdown: '.oxd-select-text',
    fileUpload: 'input[type="file"]',
    saveButton: 'button.oxd-button--secondary',
    // Success / Toast
    successToast: '.oxd-toast-container',
    // Error group__message
    errorMessage: '.oxd-input-group > .oxd-text',
    // Candidate list
    candidateRecord: '.oxd-table-row',
    // Search hints
    searchHints: 'input[placeholder="Type for hints..."]'
}