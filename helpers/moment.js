const moment = require("moment")

function isValidDate(input) {
    const date = moment(input)
    if (!date.isValid())
        return true
    return false
}

module.exports = {isValidDate}