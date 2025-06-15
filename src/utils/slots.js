const Slot = require('../models/slot');

const getSlotsForNext7Days = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const bookedSlots = await Slot.find({
        date: { $gte: today, $lt: nextWeek }
    });

    const result = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        const dateStr = day.toISOString().split('T')[0];

        const slotMap = new Map();
        bookedSlots
            .filter(slot => new Date(slot.date).toISOString().split('T')[0] === dateStr)
            .forEach(slot => {
                const key = `${slot.startTime}-${slot.endTime}`;
                if (!slotMap.has(key)) {
                    slotMap.set(key, {
                        _id: slot._id,
                        startTime: slot.startTime,
                        endTime: slot.endTime,
                        isBooked: slot.isBooked
                    });
                }
            });
        const dailySlots = Array.from(slotMap.values());

        result.push({ date: dateStr, slots: dailySlots });
    }

    return result;
};

const createSlotsForNext7Days = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        for (let hour = 9; hour < 17; hour += 2) {
            const startTime = hour.toString().padStart(2, '0') + ':00';
            const endTime = (hour + 2).toString().padStart(2, '0') + ':00';

            const exists = await Slot.findOne({ date, startTime, endTime });
            if (!exists) {
                await Slot.create({ date, startTime, endTime });
            }
        }
    }
};

module.exports = { getSlotsForNext7Days, createSlotsForNext7Days };
