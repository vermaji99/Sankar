const leadService = require('../services/leadService');

const getLeads = async (req, res, next) => {
  try {
    const { 
      search = '', 
      status, 
      sortBy = 'createdAt', 
      order = 'desc', 
      page = 1, 
      limit = 10 
    } = req.query;

    const result = await leadService.getAllLeads({
      search,
      status,
      sortBy,
      order,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.status(200).json({
      success: true,
      data: result.leads,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getLead = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error('Lead not found');
    }
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.params.id);
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await leadService.getStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  getDashboardStats,
};
