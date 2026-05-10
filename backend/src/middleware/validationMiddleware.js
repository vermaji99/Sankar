const { body, validationResult } = require('express-validator');

const validateLead = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('phone').notEmpty().withMessage('Phone is required').trim(),
  body('source').isIn(['Call', 'WhatsApp', 'Field']).withMessage('Invalid source'),
  body('status').optional().isIn(['Interested', 'NotInterested', 'Converted']).withMessage('Invalid status'),
  body('notes').optional().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLead };
