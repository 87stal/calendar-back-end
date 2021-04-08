const express = require('express')
const router = express.Router()
const validate = require('./validation')
const financeEntriesController = require('../../../controllers/financeEntries')
const guard = require('../../../helpers/guard')

router
.get('/', guard, financeEntriesController.getAll)
  .post('/', guard, validate.addFinanceEntry, financeEntriesController.addFinanceEntry)

router
  .get('/:financeEntryDate', guard, financeEntriesController.getByDate)
  .delete('/:financeEntryId', guard, financeEntriesController.removeFinanceEntry)

router.patch(
  '/:financeEntryId',
  guard,
  validate.updateFinanceEntry,
  financeEntriesController.updateFinanceEntry
)

module.exports = router
