const express = require('express');
const { getSlotsForNext7Days, createSlotsForNext7Days } = require('../utils/slots');

const slotRouter = express.Router();

slotRouter.get('/', async (req, res) => {
    try {
        await createSlotsForNext7Days();
        const result = await getSlotsForNext7Days();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch slots.', error });
    }
});

module.exports = slotRouter;



