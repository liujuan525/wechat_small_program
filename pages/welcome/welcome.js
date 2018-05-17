Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onTap: function(event) {
    // switchTab只能跳转到带有选项卡的页面，不能跳转到不带选项卡的页面
    wx.switchTab({
      url: '../post/post',
    })
    // redirectTo navigateTo 都不可以跳转到带选项卡的页面
      // wx.redirectTo({
      //   url: '../post/post',
      // });
      
      // navigateTo 操作带返回按钮，首页只是隐藏
      // wx.navigateTo({
      //   url: '/pages/post/post',
      // })
  },
  
})