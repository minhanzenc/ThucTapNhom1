const { validateString, validateObjectId } = require("../validation/validation")
function createCategoryDto(reqBody) {
    const input = reqBody
    const errMessages = []
    if (validateString(input.name))
        errMessages.push("trường 'name' chưa hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err} ---`, "") }
    return { data: { name: input.name, img: input.img } }
}

function updateCategoryDto(id, reqBody) {
    const input = reqBody
    const errMessages = []
    if (validateString(input.name))
        errMessages.push("trường 'name' chưa hợp lệ")

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    const data = { id, name: input.name }
    if (input.img !== "")
        data['img'] = input.img
    return { data }
}

function deleteCategoryDto(id) {
    const errMessages = []

    if (validateObjectId(id))
        errMessages.push("Id không hợp lệ")

    if (errMessages.length > 0)
        return { errMessage: errMessages.reduce((total, err) => `${total} ${err}---`, "") }

    return { data: { id } }

}

module.exports = { createCategoryDto, updateCategoryDto, deleteCategoryDto }