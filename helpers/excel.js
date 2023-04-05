const XLSX = require("xlsx")


const readFile = (data) => {
    const excelData = XLSX.read(data)
    return Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: XLSX.utils.sheet_to_json(excelData.Sheets[name], { type: 'string' }),
    }))[0].data.map(e => {
        return {
            firstName: e.Ho_lot,
            lastName: e.Ten,
            phone: e.DT_lien_lac,
            email: e.Email,
            classRoom: e.Ma_lop,
        }
    })
}

module.exports = { readFile }