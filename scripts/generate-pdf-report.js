const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')

async function generatePDFReport() {
    const htmlReportPath = path.resolve(__dirname, '../cypress/reports/mochawesome/index.html')
    const pdfReportPath = path.resolve(__dirname, '../cypress/reports/mochawesome/cypress-test-report.pdf')

    if (!fs.existsSync(htmlReportPath)) {
        console.error('❌ HTML report not found!')
        return
    }

    console.log('Generating PDF report...')

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()

    await page.goto(`file://${htmlReportPath}`, { waitUntil: 'networkidle0' })

    await page.waitForTimeout(1500)

    await page.pdf({
        path: pdfReportPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20px',
            bottom: '40px',
            left: '20px',
            right: '20px'
        }
    })

    console.log('✅ PDF Report generated successfully!')
    await browser.close()
}

generatePDFReport()