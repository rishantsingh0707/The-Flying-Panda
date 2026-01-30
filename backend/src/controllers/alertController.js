import Alert from '../models/Alert.js';

export const getAlerts = async (req, res, next) => {
  try {
    const { country, status, page = 1, limit = 50 } = req.query;
    
    const filter = {};
    if (country) filter.country = new RegExp(country, 'i');
    if (status) filter.status = status;

    const alerts = await Alert.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Alert.countDocuments(filter);

    res.status(200).json(alerts);
  } catch (error) {
    next(error);
  }
};

export const createAlert = async (req, res, next) => {
  try {
    const { country, city, visaType } = req.body;

    if (!country || !city || !visaType) {
      return res.status(400).json({
        error: 'Missing required fields: country, city, visaType'
      });
    }

    const alert = await Alert.create({
      country,
      city,
      visaType,
      status: 'Active'
    });

    res.status(201).json(alert);
  } catch (error) {
    next(error);
  }
};

export const updateAlert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, country, city, visaType } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (country) updateData.country = country;
    if (city) updateData.city = city;
    if (visaType) updateData.visaType = visaType;

    const alert = await Alert.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.status(200).json(alert);
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alert = await Alert.findByIdAndDelete(id);

    if (!alert) {
      return res.status(404).json({ error: 'Alert not found' });
    }

    res.status(200).json({ message: 'Alert deleted successfully' });
  } catch (error) {
    next(error);
  }
};

