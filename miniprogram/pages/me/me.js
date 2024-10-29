// pages/me/me.js
Page({
  data: {
    bookings: []
  },

  onLoad: function () {
    this.getUserBookings();
  },

  onShow: function () {
    this.getUserBookings();
  },

  // pages/me/me.js

getUserBookings: function () {
  const db = wx.cloud.database();
  db.collection('bookings').where({
    userId: this.getUserId()
  }).get().then(res => {
    this.setData({
      bookings: res.data
    });
  }).catch(err => {
    console.error(err);
  });
},

  getUserId: function () {
    // Implement logic to get user ID
    return wx.getStorageSync('userId') || 'anonymous';
  }
});
