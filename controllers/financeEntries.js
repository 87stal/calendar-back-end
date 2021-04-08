const FinanceEntries = require('../model/financeEntries')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await FinanceEntries.getAll(userId)
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts
      }
    })
  } catch (e) {
    next(e)
  }
}

const getByDate = async (req, res, next) => {
  try {
    const userId = req.user.id
    const date = req.params.financeEntryDate
    const entry = await FinanceEntries.getByDate(date, userId)
    if (entry) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          entry, userId
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

const addFinanceEntry = async (req, res, next) => {
  try {
    const userId = req.user.id
    const entry = await FinanceEntries.addFinanceEntry({ ...req.body, owner: userId })
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        entry
      }
    })
  } catch (e) {
    next(e)
  }
}

const removeFinanceEntry = async (req, res, next) => {
  try {
    const userId = req.user.id
    const entry = await FinanceEntries.removeFinanceEntry(req.params.financeEntryId, userId)
    if (entry) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted'
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateFinanceEntry = async (req, res, next) => {
  try {
    const userId = req.user.id
    const entry = await FinanceEntries.updateFinanceEntry(req.params.financeEntryId, req.body, userId)
    if (entry) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          entry
        }
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found'
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getByDate,
  addFinanceEntry,
  removeFinanceEntry,
  updateFinanceEntry
}
