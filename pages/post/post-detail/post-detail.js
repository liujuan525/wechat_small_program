var postsData = require('../../../data/post-data.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var globalData = app.globalData;
    var postId = options.id;
    // 将postId存放到data中，便于其他方法调用
    this.data.postCurrentId = postId;

    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });
    // console.log(postData);

    // 收藏行为
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      // 存在，获取当前postId下的collected值
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } 
    else {
      // 不存在，存储当前postId下的collected值为false
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    // 如果全局音乐播放为true
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic:true
      })
    }

    // 音乐播放器上的按钮与图片上的音乐按钮同步
    this.setMusicMonitor();
    
  },

  /**
   * 音乐播放器与文章音乐播放按钮同步
   */
  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true,
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.postCurrentId;
    })
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false,
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },

  /**
   * 收藏文章
   */
  onCollectionTap: function (event) {
    // this.getPostsCollectedAsy(); // 异步方法
    this.getPostsCollectedSyc(); // 同步方法
  },

  /**
   * 异步方法收藏文章
   */
  getPostsCollectedAsy: function() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        // 当前postId
        var postsCollected = res.data;
        var postId = that.data.postCurrentId;
        var postCollected = postsCollected[postId];
        postCollected = !postCollected;
        postsCollected[postId] = postCollected;
        that.ShowToast(postCollected,postsCollected);
        // that.showModal(postCollected, postsCollected);
      },
    });
  },

  /**
   * 同步方法收藏文章
   */
  getPostsCollectedSyc: function() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postId = this.data.postCurrentId;
    var postCollected = postsCollected[postId];
    postCollected = !postCollected;
    postsCollected[postId] = postCollected;
    this.ShowToast(postCollected,postsCollected);
    // this.showModal(postCollected, postsCollected);
  },

  /**
   * ShowToast 微信小程序的方法
   */
  ShowToast: function (postCollected, postsCollected){
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' :'取消成功',
      duration: 1000,
      icon: "success"
    });
  },

  /**
   * showModal 微信小程序的方法
   */
  showModal: function (postCollected, postsCollected){
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章',
      showCancel:"true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText:"确认",
      confirmColor:"#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          });       

        }else if (res.cancel) {
          console.log('用户点击取消');
        }
      },
    });
  },

  /**
   * 分享文章 -> 未做完
   */
  onShareTap: function (event) {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.tapIndex 数组元素的序号，从0开始
        // res.cancel 用户是不是点击了取消按钮
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消? '+res.cancel+'现在无法实现分享功能',
        })
      },
    });
  },

  /**
   * 音乐播放
   */
  onMusicTap: function(event) {
    var postId = this.data.postCurrentId; // 当前文章id
    var postData = postsData.postList[postId]; // 当前文章信息
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio(); // 暂停
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      });
      this.setData({
        isPlayingMusic:true
      });   
    }
  },

})