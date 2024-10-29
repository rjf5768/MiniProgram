
// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('Please use WeChat version 2.2.3 or above to use cloud capabilities');
    } else {
      wx.cloud.init({
        env: 'your-cloud-env-id', // Replace with your actual environment ID
        traceUser: true,
      });
    }

    // Optionally, you might call a cloud function here
    // Ensure the function name is correct
    wx.cloud.callFunction({
      name: 'booking',
      data: {
        action: 'test',
      },
      success: res => {
        console.log('Cloud function called successfully:', res);
      },
      fail: err => {
        console.error('Cloud function call failed:', err);
      }
    });
  },
  globalData: {
    userId: null
  }
});
