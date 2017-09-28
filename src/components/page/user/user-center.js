require("./user-center.scss")

const template = require("./user-center.tpl")

// 引用公用文件
const common = require("srcPath/utils/common")

// 引入api.json文件
const apiPath = require("apiPath/api.json")

const $ = require("jquery")
const { Message, Loading } = require("element-ui")

// 接口环境
const apiUrl = require("../../../../config/host")

let defaultImg = require("../../../images/common/default.jpg") // 默认头像
let fileLoading  // 用于上传图片

module.exports = {
  name: "user-center",

  template,

  data() {
    return {
      data: {}, // 数据
      authData: [],  // 权限列表
      gender: "",  // 性别，0：男（male），1：女（female）
      profileImageUrl: defaultImg,  // profile图片url头像
      uploadImgHost: `${apiUrl.apiUrl}${apiPath.user.uploadImg}`,  // profile图片url头像
      fileHost: defaultImg,  // profile图片url头像
      fileData: {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      },
      telephoneNum1: "",  // 区号
      telephoneNum2: "", // 固定号码
      phoneNum1: "", // 国家编号
      phoneNum2: "", // 手机号
      eMail: "",  // 电子邮箱
      dialogFormVisible: false, // 用于修改密码弹框
      form: {  // 修改密码弹框
        labelWidth: "130px",
        oldPwd: "",
        newPwd1: "",
        newPwd2: ""
      },
      listMenu: [], // 用户权限列表，用于显示左侧菜单
      isShowBack: true  // 是否显示返回的按钮,当没有其它的用户权限列表时,需要隐藏这个按钮
    }
  },

  created() {
    this.listMenu = window.JSON.parse(common.getLocalStorage("arListMenu"))
    if (this.listMenu.length <= 0) {
      this.isShowBack = false
    }
  },

  mounted() {
    document.title = "User Center"
    if (common.isLogin()) {
      // 加载用户资料
      this.load()

      // 用户权限列表
      this.userAuth()

      // 查询密码时效
      this.pwdValidity()
    }
  },

  watch: {},

  route: {},

  methods: {
    // 加载列表数据
    load() {
      // 请求参数
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId")
      }

      // get请求转换参数
      let dataUrl = common.getDataToUrl(data)

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.user.userDetail}?${dataUrl}`
      }).then(response => {
        loadTips.close()
        if (response) {
          const dataInfo = response.data
          // 赋值
          this.data = dataInfo
          this.eMail = dataInfo.email
          this.gender = dataInfo.gender

          // 头像
          const getprofileImageUrl = dataInfo.profileImageUrl
          if (getprofileImageUrl) {
            this.profileImageUrl = apiUrl.apiUrl + getprofileImageUrl
          }

          // 固定电话
          const getTelephone = dataInfo.telephone
          if (getTelephone && getTelephone.indexOf("-") !== -1) {
            this.telephoneNum1 = getTelephone.split("-")[0]
            this.telephoneNum2 = getTelephone.split("-")[1]
          } else {
            this.telephoneNum2 = getTelephone
          }

          // 手机号
          const getPhoneNumber = dataInfo.phoneNumber
          if (getPhoneNumber && getPhoneNumber.indexOf("-") !== -1) {
            this.phoneNum1 = getPhoneNumber.split("-")[0]
            this.phoneNum2 = getPhoneNumber.split("-")[1]
          } else {
            this.phoneNum2 = getPhoneNumber
          }
        }
      })
    },

    // 用户权限
    userAuth() {
      const getUserId = common.getCookie("arUId")
      // 请求参数
      let data = {
        token: common.getCookie("arTk"),
        userId: getUserId
      }

      // get请求转换参数
      let dataUrl = common.getDataToUrl(data)

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.user.userAuthByUser}${getUserId}?${dataUrl}`
      }).then(response => {
        if (response) {
          // 赋值
          this.authData = response.data
        }
      })
    },

    // 上传头像前
    beforeAvatarUpload(file) {
      fileLoading = Loading.service()
      const isJPG = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif"
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error("Upload picture picture can only be JPG / png / gif format!")
        setTimeout(() => {
          fileLoading.close()
        }, 500)
      }
      if (!isLt2M) {
        this.$message.error("Upload picture size can not exceed 2MB!")
        setTimeout(() => {
          fileLoading.close()
        }, 500)
      }
      return isJPG && isLt2M
    },
    // 上传头像成功时
    handleAvatarSuccess(res, file, fileList) {
      let getUrl = file.response.data
      this.profileImageUrl = apiUrl.apiUrl + getUrl
      common.setCookie("arImg", getUrl)
      // 事件广播
      this.$root.$emit("loginData", {isLogin: true}) // data是要传递的数据
      fileLoading.close()
    },
    // 上传头像失败时
    handleAvatarError() {
      fileLoading.close()
    },

    // 更新保存信息设置
    updateBtn() {
      // 获得性别
      let getGender = this.gender
      if (getGender === "") {
        return this.warningInfoTip("Please choose gender")
      }

      // 获得头像
      let getImg = this.profileImageUrl.replace(apiUrl.apiUrl, "")
      // if (getImg === "") {
      //   return this.warningInfoTip("请上传头像")
      // }

      // 是否有电子邮箱
      let getEmail = this.eMail
      if (getEmail === "") {
        return this.warningInfoTip("E-mail cannot be empty")
      } else if (!common.mailReg.test(getEmail)) {
        return this.warningInfoTip("The e-mail format is incorrect")
      }

      // 获得固定电话的区号
      const gettelNum1 = this.telephoneNum1
      if (gettelNum1 === "") {
        return this.warningInfoTip("Please fill out the area code, such as Shenzhen, China: 0755")
      }

      // 获得固定电话的固定号码
      const gettelNum2 = this.telephoneNum2
      if (gettelNum2 === "") {
        return this.warningInfoTip("Please fill in the fixed number")
      }

      // 拼接固定电话结果
      const getTelephone = gettelNum1 + "-" + gettelNum2

      // 获得手机号中的国家编号
      const getPhoneNum1 = this.phoneNum1
      if (getPhoneNum1 === "") {
        return this.warningInfoTip("Please fill in country number, such as China: 86")
      }

      // 获得手机号中的手机号
      const getPhoneNum2 = this.phoneNum2
      if (getPhoneNum2 === "") {
        return this.warningInfoTip("Please fill in the phone number")
      }
      // else if (!common.telReg.test(getPhoneNum2)) {
      //   return this.warningInfoTip("The phone number is in a wrong format")
      // }

      // 拼接手机号结果
      const getPhoneNumber = getPhoneNum1 + "-" + getPhoneNum2

      // 请求参数
      let dataInfo = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        gender: getGender,
        profileImageUrl: getImg,
        email: getEmail,
        telephone: getTelephone,  // 固定电话
        phoneNumber: getPhoneNumber  // 手机号码
      }

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "put",
        url: `${apiPath.user.updateInfo}`,
        data: dataInfo
      }).then(response => {
        loadTips.close()
        if (response) {
          this.successInfoTip("Update completed")
        }
      })
    },

    // 弹出修改密码界面
    changePwd() {
      this.dialogFormVisible = true
    },

    // 修改密码方法
    sendForm() {
      let getOldPwd = this.form.oldPwd
      if (getOldPwd === "") {
        return this.warningInfoTip("The original password can not be empty")
      }

      let getNewPwd1 = this.form.newPwd1
      if (getNewPwd1 === "") {
        return this.warningInfoTip("The new password can not be empty")
      } else if (getOldPwd === getNewPwd1) {
        return this.warningInfoTip("The old and new passwords are identical. Please re-enter the new password")
      } else if (!common.pwdReg.test(getNewPwd1)) {
        return this.warningInfoTip("Password length of at least 8 bits, including uppercase and special characters")
      }

      let getNewPwd2 = this.form.newPwd2
      if (getNewPwd2 === "") {
        return this.warningInfoTip("Please enter the new password again")
      } else if (getNewPwd2 !== getNewPwd1) {
        return this.warningInfoTip("Two passwords are inconsistent")
      }

      if (getOldPwd === getNewPwd2) {
         return this.warningInfoTip("The new and old passwords are the same. Please re-enter the new password")
       }

      const loadTips = Loading.service()
      this.$ajax({
        method: "put",
        url: `${apiPath.user.updatePwd}`,
        data: {
          token: common.getCookie("arTk"),
          userId: common.getCookie("arUId"),
          password: getOldPwd,
          newPassword: getNewPwd1,
          againPassword: getNewPwd2
        }
      }).then(response => {
        loadTips.close()
        if (response) {
          this.form.oldPwd = ""
          this.form.newPwd1 = ""
          this.form.newPwd2 = ""
          this.dialogFormVisible = false
          this.successInfoTip("Successfully modified")
        }
      })
    },

    // 查询密码时效
    pwdValidity() {
      // 请求参数
      let data = {
        token: common.getCookie("arTk"),
        userId: common.getCookie("arUId"),
        userName: common.getCookie("arUName")
      }

      // get请求转换参数
      let dataUrl = common.getDataToUrl(data)

      // 加载提示
      const loadTips = Loading.service()
      this.$ajax({
        method: "get",
        url: `${apiPath.user.pwdValidity}?${dataUrl}`
      }).then(response => {
        if (response) {
          let getDateCount = response.data.dateCount
          if (getDateCount <= 3) {
            let showData = getDateCount <= 3 && getDateCount >= 0 ? getDateCount : 0
            this.$confirm("Your login information is left for " + showData + " days. Please update your password.More than 60 days without updates,you will not be able to log in", "Tips:", {
              confirmButtonText: "Update Password",
              cancelButtonText: "Cancel",
              type: "warning"
            }).then(() => {
             this.changePwd()
            }).catch(() => {})
          }
        }
      })
    },

    // 警告
    warningInfoTip(info) {
      Message({
        type: "warning",
        message: info
      })
      return false
    },

    // 成功
    successInfoTip(info) {
      Message({
        type: "success",
        message: info
      })
      return false
    },

    // 返回前一页
    goBack() {
      this.$router.go(-1)
    }
  }

}
