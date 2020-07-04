/**
 * 根据时间字符串获取日期时间的范围
 * @param {String} format 
 * @param {String} startTime 
 * @param {String} endTime 
 * @param {String} currentTime 
 */
function getDateTimeRangeByTime(format, startTime, endTime, currentTime) {
  if (format == null) {
    format = "YYYY-MM-DD hh:mm:ss";
  }
  if (startTime == null) {
    startTime = "1970-01-01 08:00:00"
  }
  if (endTime == null) {
    endTime = "2049-12-31 23:59:59"
  }
  if (currentTime == null) {
    var date = new Date();
    currentTime = `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
  }
  var range = [];
  switch (format) {
    case "YYYY-MM-DD hh:mm:ss":
      var startTimeArray = [startTime.substring(0, 4), startTime.substring(5, 7), startTime.substring(8, 10), startTime.substring(11, 13), startTime.substring(14, 16), startTime.substring(17, 19)];
      var endTimeArray = [endTime.substring(0, 4), endTime.substring(5, 7), endTime.substring(8, 10), endTime.substring(11, 13), endTime.substring(14, 16), endTime.substring(17, 19)];
      var currentTimeArray = [currentTime.substring(0, 4), currentTime.substring(5, 7), currentTime.substring(8, 10), currentTime.substring(11, 13), currentTime.substring(14, 16), currentTime.substring(17, 19)];
      range = [getYearRange(startTimeArray, endTimeArray), getMonthRange(startTimeArray, endTimeArray, currentTimeArray), getDayRange(startTimeArray, endTimeArray, currentTimeArray), getHourRange(startTimeArray, endTimeArray, currentTimeArray), getMinuteRange(startTimeArray, endTimeArray, currentTimeArray), getSecondRange(startTimeArray, endTimeArray, currentTimeArray)];
      break;
    case "YYYY-MM-DD hh:mm":
      var startTimeArray = [startTime.substring(0, 4), startTime.substring(5, 7), startTime.substring(8, 10), startTime.substring(11, 13), startTime.substring(14, 16)];
      var endTimeArray = [endTime.substring(0, 4), endTime.substring(5, 7), endTime.substring(8, 10), endTime.substring(11, 13), endTime.substring(14, 16)];
      var currentTimeArray = [currentTime.substring(0, 4), currentTime.substring(5, 7), currentTime.substring(8, 10), currentTime.substring(11, 13), currentTime.substring(14, 16)];
      range = [getYearRange(startTimeArray, endTimeArray), getMonthRange(startTimeArray, endTimeArray, currentTimeArray), getDayRange(startTimeArray, endTimeArray, currentTimeArray), getHourRange(startTimeArray, endTimeArray, currentTimeArray), getMinuteRange(startTimeArray, endTimeArray, currentTimeArray)];
      break;
    default:
      break;
  }
  return range;
}

/**
 * 根据时间字符串获取当前选择的值
 * @param {Array} range 
 * @param {String} currentTime 
 */
function getValueByTime(range, currentTime) {
  if (currentTime == null) {
    var date = new Date();
    currentTime = `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`;
  }
  var value = [];
  var currentTimeArray;
  switch (range.length) {
    case 6:
      currentTimeArray = [currentTime.substring(0, 4), currentTime.substring(5, 7), currentTime.substring(8, 10), currentTime.substring(11, 13), currentTime.substring(14, 16), currentTime.substring(17, 19)];
      break;
    case 5:
      var currentTimeArray = [currentTime.substring(0, 4), currentTime.substring(5, 7), currentTime.substring(8, 10), currentTime.substring(11, 13), currentTime.substring(14, 16)];
      break;
    default:
      break;
  }
  for (var i = 0; i < range.length; i++) {
    var subRange = range[i];
    var item = Number(currentTimeArray[i]);
    for (var j = 0; j < subRange.length; j++) {
      if (Number(subRange[j]) == item) {
        value.push(j);
        break;
      }
    }
  }
  return value;
}

/**
 * 根据Date获取日期时间的范围
 * @param {String} format 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {Date} currentDate 
 */
function getDateTimeRangeByDate(format, startDate, endDate, currentDate) {
  if (format == null) {
    format = "YYYY-MM-DD hh:mm:ss";
  }
  if (startDate == null) {
    startDate = new Date("1970-01-01 08:00:00".replace(/-/g, '/'));
  }
  if (endDate == null) {
    endDate = new Date("2049-12-31 23:59:59".replace(/-/g, '/'));
  }
  if (currentDate == null) {
    currentDate = new Date();
  }
  switch(format) {
    case "YYYY-MM-DD hh:mm:ss":
      var startTime = `${startDate.getFullYear()}-${formatNumber(startDate.getMonth() + 1)}-${formatNumber(startDate.getDate())} ${formatNumber(startDate.getHours())}:${formatNumber(startDate.getMinutes())}:${formatNumber(startDate.getSeconds())}`;
      var endTime = `${endDate.getFullYear()}-${formatNumber(endDate.getMonth() + 1)}-${formatNumber(endDate.getDate())} ${formatNumber(endDate.getHours())}:${formatNumber(endDate.getMinutes())}:${formatNumber(endDate.getSeconds())}`;
      var currentTime = `${currentDate.getFullYear()}-${formatNumber(currentDate.getMonth() + 1)}-${formatNumber(currentDate.getDate())} ${formatNumber(currentDate.getHours())}:${formatNumber(currentDate.getMinutes())}:${formatNumber(currentDate.getSeconds())}`;
      return getDateTimeRangeByTime(format, startTime, endTime, currentTime);
      break;
    case "YYYY-MM-DD hh:mm":
      var startTime = `${startDate.getFullYear()}-${formatNumber(startDate.getMonth() + 1)}-${formatNumber(startDate.getDate())} ${formatNumber(startDate.getHours())}:${formatNumber(startDate.getMinutes())}`;
      var endTime = `${endDate.getFullYear()}-${formatNumber(endDate.getMonth() + 1)}-${formatNumber(endDate.getDate())} ${formatNumber(endDate.getHours())}:${formatNumber(endDate.getMinutes())}`;
      var currentTime = `${currentDate.getFullYear()}-${formatNumber(currentDate.getMonth() + 1)}-${formatNumber(currentDate.getDate())} ${formatNumber(currentDate.getHours())}:${formatNumber(currentDate.getMinutes())}`;
      return getDateTimeRangeByTime(format, startTime, endTime, currentTime);
      break;
    default:
      break;
  }
}

/**
 * //根据Date获取当前选择值
 * @param {Array} range 
 * @param {Date} currentDate 
 */
function getValueByDate(range, currentDate) {
  if (currentDate == null) {
    currentDate = new Date();
  }
  var currentTime = `${currentDate.getFullYear()}-${formatNumber(currentDate.getMonth() + 1)}-${formatNumber(currentDate.getDate())} ${formatNumber(currentDate.getHours())}:${formatNumber(currentDate.getMinutes())}:${formatNumber(currentDate.getSeconds())}`;
  return getValueByTime(range, currentTime);
}

/**
 * 获取年份范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 */
function getYearRange(startTimeArray, endTimeArray) {
  return getRangeWithStartAndEnd(Number(startTimeArray[0]),Number(endTimeArray[0]));
}

/**
 * 获取月份范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 * @param {Array} currentTimeArray 
 */
function getMonthRange(startTimeArray, endTimeArray, currentTimeArray) {
  if (startTimeArray[0] < currentTimeArray[0]) {
    if (endTimeArray[0] == currentTimeArray[0]) {
      return getRangeWithStartAndEnd(1, Number(endTimeArray[1]));
    } else if (endTimeArray[0] > currentTimeArray[0]) {
      return getRangeWithStartAndEnd(1, 12);
    }
  } else if (startTimeArray[0] == currentTimeArray[0]) {
    if (endTimeArray[0] == currentTimeArray[0]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[1]), Number(endTimeArray[1]));
    } else if (endTimeArray[0] > currentTimeArray[0]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[1]), 12);
    }
  }
}

/**
 * 获取日的范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 * @param {Array} currentTimeArray 
 */
function getDayRange(startTimeArray, endTimeArray, currentTimeArray) {
  if (startTimeArray[0] == currentTimeArray[0] && startTimeArray[1] == currentTimeArray[1]) {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[2]), Number(endTimeArray[2]));
    } else {
      return getRangeWithStartAndEnd(Number(startTimeArray[2]), getDaysForMonth(Number(currentTimeArray[0]), Number(currentTimeArray[1])));
    }
  } else {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1]) {
      return getRangeWithStartAndEnd(1, Number(endTimeArray[2]));
    } else {
      return getRangeWithStartAndEnd(1, getDaysForMonth(Number(currentTimeArray[0]), Number(currentTimeArray[1])));
    }
  }
}

/**
 * 获取小时的范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 * @param {Array} currentTimeArray 
 */
function getHourRange(startTimeArray, endTimeArray, currentTimeArray) {
  if (startTimeArray[0] == currentTimeArray[0] && startTimeArray[1] == currentTimeArray[1] && startTimeArray[2] == currentTimeArray[2]) {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[2]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[3]), Number(endTimeArray[3]));
    } else {
      return getRangeWithStartAndEnd(Number(startTimeArray[3]), 23);
    }
  } else {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[2]) {
      return getRangeWithStartAndEnd(0, Number(endTimeArray[3]));
    } else {
      return getRangeWithStartAndEnd(0, 23);
    }
  }
}

/**
 * 获取分钟的范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 * @param {Array} currentTimeArray 
 */
function getMinuteRange(startTimeArray, endTimeArray, currentTimeArray) {
  if (startTimeArray[0] == currentTimeArray[0] && startTimeArray[1] == currentTimeArray[1] && startTimeArray[2] == currentTimeArray[2] && startTimeArray[3] == currentTimeArray[3]) {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[2] && endTimeArray[3] == currentTimeArray[3]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[4]), Number(endTimeArray[4]));
    } else {
      return getRangeWithStartAndEnd(Number(startTimeArray[4]), 59);
    }
  } else {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[2] && endTimeArray[3] == currentTimeArray[3]) {
      return getRangeWithStartAndEnd(0, Number(endTimeArray[4]));
    } else {
      return getRangeWithStartAndEnd(0, 59);
    }
  }
}

/**
 * 获取秒的范围
 * @param {Array} startTimeArray 
 * @param {Array} endTimeArray 
 * @param {Array} currentTimeArray 
 */
function getSecondRange(startTimeArray, endTimeArray, currentTimeArray) {
  if (startTimeArray[0] == currentTimeArray[0] && startTimeArray[1] == currentTimeArray[1] && startTimeArray[2] == currentTimeArray[2] && startTimeArray[3] == currentTimeArray[3] && startTimeArray[4] == currentTimeArray[4]) {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[3] && endTimeArray[3] == currentTimeArray[2] && endTimeArray[4] == currentTimeArray[4]) {
      return getRangeWithStartAndEnd(Number(startTimeArray[5]), Number(endTimeArray[5]));
    } else {
      return getRangeWithStartAndEnd(Number(startTimeArray[5]), 59);
    }
  } else {
    if (endTimeArray[0] == currentTimeArray[0] && endTimeArray[1] == currentTimeArray[1] && endTimeArray[2] == currentTimeArray[3] && endTimeArray[3] == currentTimeArray[2] && endTimeArray[4] == currentTimeArray[4]) {
      return getRangeWithStartAndEnd(0, Number(endTimeArray[5]));
    } else {
      return getRangeWithStartAndEnd(0, 59);
    }
  }
}

/**
 * 根据起始参数获取范围
 * @param {Number} start 
 * @param {Number} end 
 */
function getRangeWithStartAndEnd(start, end) {
  var range = [];
  for (var i = start; i <= end; i++) {
    range.push(formatNumber(i));
  }
  return range;
}

/**
 * 根据年月获取月份中天数
 * @param {Number} year 
 * @param {Number} month 
 */
function getDaysForMonth(year, month) {
  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    return 31;
  } else if (month == 4 || month == 6 || month == 9 || month == 11) {
    return 30;
  } else if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return 29;
  }
  return 28;
}

/**
 * 格式化数字
 * @param {Number} number 
 */
function formatNumber(number) {
  if (number < 10) {
    return '0' + number;
  }
  return '' + number
}

module.exports = {
  getDateTimeRangeByTime: getDateTimeRangeByTime,
  getValueByTime: getValueByTime,
  getDateTimeRangeByDate: getDateTimeRangeByDate,
  getValueByDate: getValueByDate,
  getDaysForMonth: getDaysForMonth,
  formatNumber: formatNumber
}