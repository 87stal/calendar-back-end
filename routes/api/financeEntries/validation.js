const Joi = require('joi').extend(require('@joi/date'));


const schemaAddFinanceEntry = Joi.object({
  date: Joi.date().format('YYYY-MM-DD').utc().required(),
  category: Joi.string().required(),
  amount: Joi.number().required()
})

const schemaFinanceEntry = Joi.object({
  date: Joi.date(),
  category: Joi.string(),
  amount: Joi.number()
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

module.exports.addFinanceEntry = (req, res, next) => {
  return validate( schemaAddFinanceEntry, req.body, next)
}

module.exports.updateFinanceEntry = (req, res, next) => {
  return validate(schemaFinanceEntry, req.body, next)
}
