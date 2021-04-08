const FinanceEntries = require('./schemas/financeEntries')

const getAll = async (userId) => {
  const results = await FinanceEntries.find({ owner: userId }).populate({
    path: 'owner',
    select: 'date category -_id'
  })
  return results
}

const getByDate = async (financeEntryDate, userId) => {
  const results = await FinanceEntries.find({ date: financeEntryDate, owner: userId }).populate({
    path: 'owner',
    select: 'date category amount'
  })
  return results
}

const removeFinanceEntry = async (financeEntryId, userId) => {
  const result = await FinanceEntries.findByIdAndRemove({ _id: financeEntryId, owner: userId })
  return result
}

const addFinanceEntry = async (body) => {
  const result = await FinanceEntries.create(body)
  return result
}

const updateFinanceEntry = async (financeEntryId, body, userId) => {
  const result = await FinanceEntries.findByIdAndUpdate(
    { _id: financeEntryId, owner: userId },
    { ...body },
    { new: true }
  )
  return result
}

module.exports = {
  getAll,
  getByDate,
  removeFinanceEntry,
  addFinanceEntry,
  addFinanceEntry,
  updateFinanceEntry
}
