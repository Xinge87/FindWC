var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    latitude: "",
    longitude: "",
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      iconPath: "/resources/my_marker.png"
    }],
    addressList: []
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext("myMap")
  },
  onLoad: function (e) {
    qqmapsdk = new QQMapWX({
      key: '7ENBZ-7BYH6-HX5SB-EXRFW-3IHLK-3QBBS'
    });
    var that = this
    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
  onShow: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '厕所',  //搜索关键词
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].address,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/resources/my_marker.png", //图标路径
            width: 20,
            height: 20
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks,
          addressList: mks
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  openLocation: function (e) {
    console.log(e)
    const value = e.detail.value
    console.log(value)

    wx.openLocation({
      longitude: Number(value.longitude),
      latitude: Number(value.latitude),
      name: value.name,
      address: value.address
    })
  }

})
