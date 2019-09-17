const Index = require('joi')

module.exports.validateUser = Index.object().keys({
    email: Index.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Index.string()
        .min(6)
        .required(),
})
