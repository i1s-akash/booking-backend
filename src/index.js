require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const slotRouter = require('./routes/slots');
const bookingRouter = require('./routes/booking');
const cors = require('cors')

const app = express();
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.LIVE_FRONTEND_URL],
    credentials: true,
}));
app.use(express.json());
app.use('/api/slots', slotRouter);
app.use('/api/booking', bookingRouter);

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
        console.log(`Server is successfully running on port ${process.env.PORT}`);
    });
}).catch(() => {
    console.log("Database connection failed");
})
