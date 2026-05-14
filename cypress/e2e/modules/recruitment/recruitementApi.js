export const recruitmentApi = {
    createCandidate(candidateData) {
        return cy.request({
            method: 'POST',
            url: '/api/v2/recruitment/candidates',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                firstName: candidateData.firstName,
                middleName: candidateData.middleName || '',
                lastName: candidateData.lastName,
                email: candidateData.email,
                contactNumber: candidateData.contactNumber || null,
                keywords: candidateData.keywords || null,
                comment: candidateData.comment || null,
                vacancyId: candidateData.vacancyId || 1,   // Software Engineer is 1
                dateOfApplication: new Date().toISOString().split('T')[0],
                consentToKeepData: false
            }
        })
    },

    uploadAttachment(candidateId, fileName, base64Content) {
        return cy.request({
            method: 'POST',
            url: '/api/v2/recruitment/candidate/attachments',
            failOnStatusCode: false, // necessary here
            headers: {
                'Content-Type': 'application/pdf',
            },
            body: {
                candidateId: candidateId,
                attachment: {
                    name: fileName,
                    size: Math.floor(base64Content.length * 0.75), // rough size
                    base64: base64Content
                }
            }
        })
    }
}