Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  onTap: function(event) {
      wx.redirectTo({
        url: '../post/post',
      });
      
      // navigateTo 操作带返回按钮，首页只是隐藏
      // wx.navigateTo({
      //   url: '/pages/post/post',
      // })
  },
  
})