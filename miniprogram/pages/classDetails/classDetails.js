// pages/classDetails/classDetails.js
const app = getApp();

Page({
  data: {
    classData: {},
    selectedDate: '',
    selectedTime: ''
  },

  onLoad: function (options) {
    const id = options.id;
    this.getClassDetails(id);
  },

  getClassDetails: function (id) {
    const db = wx.cloud.database();
    db.collection('classes').doc(id).get().then(res => {
      this.setData({
        classData: res.data
      });
    }).catch(err => {
      console.error(err);
    });
  },

  onDateChange: function (e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },

  onTimeChange: function (e) {
    this.setData({
      selectedTime: e.detail.value
    });
  },

  getUserId: function () {
    return app.globalData.userId || wx.getStorageSync('userId') || 'anonymous';
  },

  onSchedule: function () {
    const { selectedDate, selectedTime, classData } = this.data;

    if (!selectedDate || !selectedTime) {
      wx.showToast({
        title: 'Please select date and time',
        icon: 'none'
      });
      return;
    }

    wx.cloud.callFunction({
      name: 'bookingFunction',
      data: {
        action: 'createBooking',
        data: {
          date: selectedDate,
          time: selectedTime,
          classId: classData._id,
          className: classData.name,
          userId: this.getUserId()
        }
      },
      success: res => {
        wx.showToast({
          title: 'Class scheduled!',
          icon: 'success'
        });
      },
      fail: err => {
        console.error(err);
        wx.showToast({
          title: 'Failed to schedule class',
          icon: 'none'
        });
      }
    });
  }
});
