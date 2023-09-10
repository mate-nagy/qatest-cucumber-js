const { Given, Then } = require('@cucumber/cucumber')
const { expect } = require('chai')
const XLSX = require('xlsx')

let workbook, worksheet, worksheetValues

Given('File with name {string} exist', (filename) => {
    workbook = XLSX.readFile('testdata/' + filename)
    worksheet = workbook.Sheets[workbook.SheetNames[0]]
})


Then('The header have next headers', (dataTable) => {
    const expectedValues = dataTable.raw()[0]
    worksheetValues = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    const firstRowValues = worksheetValues[0]
    expectedValues.forEach((value, i) => {
        expect(firstRowValues[i]).to.equal(value)
    })
})


Then('There are more than {int} lines in file', (expected) => {
    const actualLine = worksheetValues.length
    expect(actualLine).greaterThan(expected)
})
