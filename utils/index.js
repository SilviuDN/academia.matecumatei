const mongoose = require('mongoose')

module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isValidIdFormat: id => mongoose.Types.ObjectId.isValid(id),
    handleMongoooseError: err => {
        const errors = []

        if (err instanceof mongoose.Error.ValidationError) {
            Object.values(err.errors).map(elm => errors.push(elm.message))
        } else if (err.code === 11000) {
            errors.push('A user is already registered with this email address or with this pseudonim.')
        }

        return errors
    },
}