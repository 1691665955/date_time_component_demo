// components/dateTimeComponent/dateTimeComponent.js
var util = require("./utils/util.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      //picker显示的样式
      type: String,
      value: ''
    },
    mode: {
      //'time'代表传入时间为字符串类型
      //'date'代表传入时间为Date类型
      type: String,
      value: 'time'
    },
    format: {
      //时间字符串格式
      //目前只支持'YYYY-MM-DD hh:mm:ss'和'YYYY-MM-DD hh:mm'
      type: String,
      value: 'YYYY-MM-DD hh:mm:ss'
    },
    text: {
      //picker显示的内容
      type: String,
      value: null
    },
    placeholder: {
      //没有选中时间时的placeholder
      type: String,
      value: '请选择时间'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    range: [],
    value: [],
    startTime: null,
    endTime: null,
    currentTime: null,
    startDate: null,
    endDate: null,
    currentDate: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * startTime 时间选择器开始时间
     * endTime 时间选择器结束时间
     * currentTime 时间选择器选中时间
     */
    setTime: function(startTime, endTime, currentTime) {
      var range = util.getDateTimeRangeByTime(this.data.format, startTime, endTime, currentTime);
      var value = util.getValueByTime(range, currentTime);
      this.setData({
        startTime: startTime,
        endTime: endTime,
        currentTime: currentTime,
        range: range,
        value: value
      })
    },
    /**
     * startDate 时间选择器开始时间
     * endDate 时间选择器结束时间
     * currentDate 时间选择器选中时间
     */
    setDate: function(startDate, endDate, currentDate) {
      var range = util.getDateTimeRangeByDate(this.data.format, startDate, endDate, currentDate);
      var value = util.getValueByDate(range, currentDate);
      this.setData({
        startDate: startDate,
        endDate: endDate,
        currentDate: currentDate,
        range: range,
        value: value
      })
    },
    _bindChange: function(e) {
      var range = this.data.range;
      var value = e.detail.value;
      var model = {};
      for (var i = 0; i < value.length; i++) {
        switch (i) {
          case 0:
            model.year = Number(range[0][value[0]]);
            break;
          case 1:
            model.month = Number(range[1][value[1]]);
            break;
          case 2:
            model.day = Number(range[2][value[2]]);
            break;
          case 3:
            model.hour = Number(range[3][value[3]]);
            break;
          case 4:
            model.minute = Number(range[4][value[4]]);
            break;
          case 5:
            model.second = Number(range[5][value[5]]);
            break;
        }
      }
      if (value.length == 6) {
        model.dateTime = `${model.year}-${util.formatNumber(model.month)}-${util.formatNumber(model.day)} ${util.formatNumber(model.hour)}:${util.formatNumber(model.minute)}:${util.formatNumber(model.second)}`;
        model.date = new Date(model.dateTime.replace(/-/g, '/'));
      } else if (value.length == 5) {
        model.dateTime = `${model.year}-${util.formatNumber(model.month)}-${util.formatNumber(model.day)} ${util.formatNumber(model.hour)}:${util.formatNumber(model.minute)}`;
        model.date = new Date(model.dateTime.replace(/-/g, '/'));
      }
      this.triggerEvent('dateTimeChanged', model);
    },
    _bindcolumnchange: function(e) {
      var value = this.data.range[e.detail.column][e.detail.value];
      if (this.data.mode == "time") {
        var currentTime = this.data.currentTime;
        if (currentTime == null) {
          var currentDate = new Date();
          if (this.data.format == "YYYY-MM-DD hh:mm:ss") {
            currentTime = `${currentDate.getFullYear()}-${util.formatNumber(currentDate.getMonth() + 1)}-${util.formatNumber(currentDate.getDate())} ${util.formatNumber(currentDate.getHours())}:${util.formatNumber(currentDate.getMinutes())}:${util.formatNumber(currentDate.getSeconds())}`;
          } else {
            currentTime = `${currentDate.getFullYear()}-${util.formatNumber(currentDate.getMonth() + 1)}-${util.formatNumber(currentDate.getDate())} ${util.formatNumber(currentDate.getHours())}:${util.formatNumber(currentDate.getMinutes())}`;
          }
        }
        switch (e.detail.column) {
          case 0:
            currentTime = value + currentTime.substring(4);
            break;
          case 1:
            var days = util.getDaysForMonth(Number(currentTime.substring(0, 4)), Number(value));
            if (Number(currentTime.substring(8, 10)) > days) {
              currentTime = currentTime.substring(0, 5) + value + currentTime.substring(7, 8) + days + currentTime.substring(10);
            } else {
              currentTime = currentTime.substring(0, 5) + value + currentTime.substring(7);
            }
            break;
          case 2:
            currentTime = currentTime.substring(0, 8) + value + currentTime.substring(10);
            break;
          case 3:
            currentTime = currentTime.substring(0, 11) + value + currentTime.substring(13);
            break;
          case 4:
            currentTime = currentTime.substring(0, 14) + value + currentTime.substring(16);
            break;
          case 5:
            currentTime = currentTime.substring(0, 17) + value;
            break;
        }
        var range = util.getDateTimeRangeByTime(this.data.format, this.data.startTime, this.data.endTime, currentTime);
        var value = util.getValueByTime(range, currentTime);
        this.setData({
          currentTime: currentTime,
          range: range,
          value: value
        })
      } else if (this.data.mode == "date") {
        var value = this.data.range[e.detail.column][e.detail.value];
        var currentDate = this.data.currentDate;
        if (currentDate == null) {
          currentDate = new Date()
        } else {
          currentDate = new Date(this.data.currentDate.getTime());
        }
        switch (e.detail.column) {
          case 0:
            currentDate.setFullYear(Number(value));
            break;
          case 1:
            var days = util.getDaysForMonth(currentDate.getFullYear(), Number(value));
            if (currentDate.getDate() > days) {
              currentDate.setDate(days);
            }
            currentDate.setMonth(Number(value) - 1);
            break;
          case 2:
            currentDate.setDate(Number(value));
            break;
          case 3:
            currentDate.setHours(Number(value));
            break;
          case 4:
            currentDate.setMinutes(Number(value));
            break;
          case 5:
            currentDate.setSeconds(Number(value));
            break;
        }
        var range = util.getDateTimeRangeByDate(this.data.format, this.data.startDate, this.data.endDate, currentDate);
        var value = util.getValueByDate(range, currentDate);
        this.setData({
          currentDate: currentDate,
          range: range,
          value: value
        })
      }
    }
  }
})