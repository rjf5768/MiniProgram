// cloudfunctions/bookingFunction/index.js

const cloudbase = require('@cloudbase/node-sdk');

// Initialize cloudbase in the cloud function
const app = cloudbase.init({
  env: 'miniprogram1-9gu15nk589aaf4b8',
});

const models = app.models;

exports.main = async (event, context) => {
  // Extract data from the event object
  const { action, data } = event;

  if (action === 'createBooking') {
    // Create a new booking
    const result = await models.booking.create({
      data: {
        date: data.date,
        className: data.className,
        userId: data.userId,
        classId: data.classId,
        time: data.time,
      },
    });

    return result;
  }

  // Handle other actions (e.g., read, update, delete)
};
