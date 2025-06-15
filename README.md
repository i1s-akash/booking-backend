# Booking Backend

# Tech Stack
Node.js, Express.js & MongoDB


# API Endpoints
- `GET /api/slots` - Get api slots for next 7 days.
- `POST /api/bookings` - Create booking by slots selection.
- `GET /api/bookingss/:id` - Get booking for slot by booking id.
- `GET /api/bookings` - Get all bookings (For only admin).


# `Local Devlopment`
- Add .env (Attached in mail named .env.backend)
- yarn install
- yarn dev
- Running on localhost:3000


# Scratch to Booking Backend
- `npm init` - To initiliase repository
- `yarn add express` - Setup for listening on port
- Initiliazed a project via new cluster to get connection string of database
- `yarn add dotenv mongoose` 
- `yarn add once and yarn add nodemon` - After adding nodemon as a dev dependency added these 
- commands to script in package.json
- Setup of config directory
- Setup of index.js to proper estable connection to remote database
- Create some folders such as middlewares, models, routes and utils.
- Designed Slot & Booking model and its relationship
- Designed 2 routes as slot and booking
- It's time to have validators
- yarn add express-validators
- User them as middlewars in fileName.Router().
- Finally testing and restructuring apis.
- Cors & express.json() setup 
- Integration with frontend to communicate with browser request without error.


# Hosting `booking-backend` at Render
-> 