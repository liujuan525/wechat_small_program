App({
  globalData: {
    g_isPlayingMusic: false, // 全局 控制音乐播放
    g_currentMusicPostId : null, // 当前音乐播放的id
    // doubanBase: "https://api.douban.com"
    // 豆瓣屏蔽了小程序对它接口的调用，现在暂时通过转发请求处理，转发的URL为下
    doubanBase: "http://t.yushu.im"
  },

})
