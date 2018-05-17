var util = require('../../utils/util.js');
var app = getApp(); // 获取app.js里面的数据

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {}, // 给一个初始值
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  /**
   * 获取电影列表
   */
  getMovieListData: function(url,settedKey, categoryTitle) {
    var that = this;
    wx.request({
        url: url,
        method: "GET",
        header:{
          "Content-Type":"application/xml"
        },
        success: function(res){
          that.processDoubanData(res.data, settedKey, categoryTitle);
          // console.log(res.data);
        },
        fail: function(error){
          console.log(error);
        },
        complete: function(){
        }
      });
  },
/**
 * 获取电影信息
 */
  processDoubanData: function(moviesDouban,settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title : title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  },
  /**
   * 点击 更多 按钮
   */
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  /**
   * 搜索页面点击前后页面切换
   */
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  /**
   * 搜索按钮
   */
  onBindConfirm: function(event) {
    var text = event.detail.value; // 获取输入内容
    // console.log(text);
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","");
  },
  // onBindBlur: function(event) {
  //   console.log("onBindBlur");
  // },
  /**
   * 取消搜索按钮
   */
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}, // 搜索结果置空
    })
  },
  /**
   * 电影详情页
   */
  onMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId,
    })
  },




})