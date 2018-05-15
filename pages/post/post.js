var postData = require('../../data/post-data.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      postList: postData.postList
    });
  },
  // 文章详情页跳转
  onDetail: function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+ postId,
    })
    // console.log(postId);
  },
  /**
   * 轮播图处理
   */
  onSwiperTap: function(event) {
    // currentTarget指的是事件捕获的组件，这里指的是swiper
    // target 指的是当前点击的时间，这里指的是image
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },

})