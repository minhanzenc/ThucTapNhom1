const XLSX = require("xlsx")
const studentRepo = require('./repositories/StudentRepo')
const mongoose = require('mongoose')
require('dotenv').config()

const parse = (filename) => {
    const excelData = XLSX.readFile(filename, { type: 'string' })
    return Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name], { type: 'string' }),
    }))
}

const a = parse("./danhsachsv_mau1(1).xlsx").map((element) => {
    return element.data.map(async e => {
        return studentRepo.create({
            firstName: e.Ho_lot,
            lastName: e.Ten,
            phone: e.DT_lien_lac,
            email: e.Email,
            classRoom: e.Ma_lop,
        })
    })
})



