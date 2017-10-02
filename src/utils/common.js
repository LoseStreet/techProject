const $ = require("jquery")

const { Message } = require("element-ui")

module.exports = {

  // 验证手机号
  telReg: /^0?1[3|4|5|7|8][0-9]\d{8}$/,

  mailReg: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,

  // 密码验证,至少一个大写字母和特殊字符,长度8位以上(包括8位)
  pwdReg: /(?=.*?[A-Z])(?=.*?[~!@#$%……&*|.,。;'"]).{8}/,

   // 登录成功设置返回的参数
   loginOkCallBack: function(token, password, avatarUrl, isAdmin, isOwner, isMember, id) {
      this.setCookie("gotoken", token)
      this.setCookie("gopassword", password)
      this.setCookie("goavatarUrl", avatarUrl) // 头像
      this.setCookie("goisAdmin", isAdmin) // 用户昵称
      this.setCookie("goisOwner", isOwner) // 是否业主
      this.setCookie("goisMember", isMember) // 是否企业成员
      this.setCookie("goid", id) // 用户id
   },

   // 消除登录记录的信息
   loginExit: function() {
      this.delCookie("gotoken")
      this.delCookie("gopassword")
      this.delCookie("goavatarUrl")
      this.delCookie("goisAdmin")
      this.delCookie("goisOwner")
      this.delCookie("goisMember")
      this.delCookie("goid")
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
      return "空"
    } else {
      return val
    }
  }
}
