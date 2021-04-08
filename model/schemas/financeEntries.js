const mongoose = require('mongoose')
const { Schema, model, SchemaTypes } = mongoose

const financeEntriesSchema = new Schema(
  {
    date: {
      type: String,
      required: [true, 'Set date'],
    },
      category: {
        type: String,
        required: [true, 'Input email'],
      },
      amount:  {
        type: Number,
        required: [true, 'Input email'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  { versionKey: false, timestamps: true }
)

const FinanceEntries = model('financeEntries', financeEntriesSchema)

module.exports = FinanceEntries
