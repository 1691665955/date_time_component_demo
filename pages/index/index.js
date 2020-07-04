const app = getApp()

Page({
  data: {
    timeText: "",
    timePlaceholder: "请选择时间",
    dateText: "",
    datePlaceholder: "请选择时间"
  },

  onLoad: function () {

  },

  onReady: function () {
    this.dateTime1 = this.selectComponent("#dateTime1");
    this.dateTime2 = this.selectComponent("#dateTime2");
    this.dateTime1.setTime("2000-01-01 00:00", "2099-12-31 23:59", "2020-07-04 00:00");
    this.dateTime2.setDate(new Date("2000-01-01 00:00:00"), new Date("2099-12-31 23:59:59"), new Date("2020-07-04 00:00:00"))
  },

  dateTimeStartChanged1: function (e) {
    var model = e.detail;
    console.log(model);
    this.setData({
      timeText: model.dateTime
    })
  },

  dateTimeStartChanged2: function (e) {
    var model = e.detail;
    console.log(model);
    this.setData({
      dateText: model.dateTime
    })
  }

})
