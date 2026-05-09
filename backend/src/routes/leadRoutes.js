const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateLead } = require('../middleware/validationMiddleware');

router.get('/stats', leadController.getDashboardStats);

router.route('/')
  .get(leadController.getLeads)
  .post(validateLead, leadController.createLead);

router.route('/:id')
  .get(leadController.getLead)
  .patch(leadController.updateLead)
  .delete(leadController.deleteLead);

module.exports = router;
