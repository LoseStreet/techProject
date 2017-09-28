const $ = require("jquery")

const { Message } = require("element-ui")

// 接口环境
const apiUrl = require("rootPath/config/host")

module.exports = {

  // 验证手机号
  telReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,

  mailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,

  // 密码验证,至少一个大写字母和特殊字符,长度8位以上(包括8位)
  pwdReg: /(?=.*?[A-Z])(?=.*?[~!@#$%……&*|.,。;'"]).{8}/,

   // 登录成功设置返回的参数
   loginOkCallBack: function(arImg, arUCode, arUId, arUName, arTk, listMenu) {
      this.setCookie("arImg", arImg)  // 用户头像
      this.setCookie("arUCode", arUCode) // 用户编号
      this.setCookie("arUId", arUId) // 用户ID
      this.setCookie("arUName", arUName) // 用户昵称
      this.setCookie("arTk", arTk) // 用户Token
      this.setLocalStorage("arListMenu", listMenu) // 权限菜单
   },

   // 消除登录记录的信息
   loginExit: function() {
      this.delCookie("arImg")
      this.delCookie("arUCode")
      this.delCookie("arUId")
      this.delCookie("arUName")
      this.delCookie("arTk")
      this.delLocalStorage("arListMenu")
   },

   // 设置cookie
   setCookie: function(name, value) {
      let getValue = this.getCookie
      if (getValue !== null && getValue !== "") {
        this.delCookie(name)
      }
      let exdate = new Date()
      let expiredays = 60
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/")
  },

    // 获得cookie
    getCookie: function(name) {
      if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(name + "=")
        if (cStart !== -1) {
          cStart = cStart + name.length + 1
          let cEnd = document.cookie.indexOf(";", cStart)
          if (cEnd === -1) cEnd = document.cookie.length
          return unescape(document.cookie.substring(cStart, cEnd))
        }
      }
      return ""
    },

   // 删除cookie
    delCookie: function(name) {
      let exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = this.getCookie(name)
      if (cval !== null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"
      }
    },

  // 设置localStorage
  setLocalStorage(name, value) {
    localStorage.setItem(name, value)
  },

  // 读取localStorage
  getLocalStorage(name, value) {
    const item = localStorage.getItem(name)
    return item
  },

  // 删除localStorage
  delLocalStorage(name) {
    localStorage.removeItem(name)
  },

  /*
  *
  * 获得当前时间
  * hasDetails  如果需求时分秒时  请传入 true
  *
  * */
  getNowFormatDate: function(hasDetails) {
    var date = new Date()
    var seperator1 = "-"
    var seperator2 = ":"
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate
    }


    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    if (hasDetails) {
      currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
    }

    return currentdate
  },

  // 格式化时间方法
  formatDate(now) {
    now = new Date(now)
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    if (month < 10) {
      month = "0" + month
    }
    if (date < 10) {
      date = "0" + date
    }
    if (hour < 10) {
      hour = "0" + hour
    }
    if (minute < 10) {
      minute = "0" + minute
    }
    if (second < 10) {
      second = "0" + second
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  },

  // 格式化时间方法 无 时、分、秒  type为拼接的方式
  formatDate2(now, type) {
    now = new Date(now)
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()
    if (month < 10) {
      month = "0" + month
    }
    if (date < 10) {
      date = "0" + date
    }
    if (type) {
      return year + type + month + type + date
    } else {
      return year + "-" + month + "-" + date
    }
  },

  // 格式化时间方法 只有时，分，秒  type为拼接的方式
  formatHMS(now) {
    now = new Date(now)
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    if (hour < 10) {
      hour = "0" + hour
    }
    if (minute < 10) {
      minute = "0" + minute
    }
    if (second < 10) {
      second = "0" + second
    }
    return hour + ":" + minute
  },

  // 拼装url对象
  getDataToUrl(data) {
    let url = ""
    $.each(data, function(key, val) {
      url += key + "=" + val + "&"
    })
    return url.slice(0, url.length - 1)
  },

  // 格式化金钱
  formatUSD(val) {
      let len = String(val).length
      let arr = []
      let lastIndex = null
      while (len > 0) {
        lastIndex = len
        len -= 3
        arr.unshift(String(val).substring(len, lastIndex))
      }
      val = arr.join(",")

      return `USD ${val}.00`
    },

  // 检测是否登录
  isLogin: function() {
    if (this.getCookie("arTk")) {
      return true
    } else {
      location.href = "/#/"
      return false
    }
  },

  // 判断数据是否为空
  isEmptyVal(val) {
    if (val === undefined || val === "") {
      return "empty"
    } else {
      return val
    }
  },

  // 使用form表单提交数据导出表格
  downloadExcel(params, url) {
    const $form = $("<form>")
    $form.attr("style", "display:block")
    // $form.attr("target", "_blank")
    $form.attr("method", "post")
    $form.attr("action", `${apiUrl.apiUrl}${url}`)

    for (var p in params) {
      var $input = $("<input>")
      $input.attr("type", "hidden")
      $input.attr("name", p)
      $input.attr("value", params[p])
      $form.append($input)
    }
    $("body").append($form)  // 将表单放置在web中
    $form.submit()
  },

  // 判断当前浏览器是否低于IE9
  appVersionIsLessThanIE9() {
    if (this.isIE()) {
      if (parseInt(navigator.userAgent.split(";")[1].replace("MSIE", "")) <= 9) {
        Message({message: "Your IE browser version is too low. In order not to affect the normal use, please download IE10 and above", type: "warning", duration: 3000})
      }
    }
  },

  // 判断是否是IE浏览器
  isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true
    } else {
      return false
    }
  }
}
