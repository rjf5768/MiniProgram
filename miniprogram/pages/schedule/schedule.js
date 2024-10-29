// pages/schedule/schedule.js
Page({
  data: {
    classes: []
  },

  onLoad: function () {
    this.getClasses();
  },

  getClasses: function () {
    const db = wx.cloud.database();
    db.collection('classes').get().then(res => {
      this.setData({
        classes: res.data
      });
    }).catch(err => {
      console.error(err);
    });
  },

  goToClassDetails: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/classDetails/classDetails?id=${id}`
    });
  }
});
