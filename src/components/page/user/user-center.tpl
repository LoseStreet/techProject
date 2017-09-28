<div class="com_right_box reset_com_right_box">

  <div v-if="isShowBack" class="com_right_top_box user_center_box_btn">
    <div class="com_btn com_back_btn" @click="goBack"><span>Return</span></div>
  </div>

  <h2 class="com_h2_title">User Center</h2>

  <div class="uInfo_box">
      <div class="uInfo_top_box clearfix">
          <dl class="dl_form clearfix">
              <dd class="clearfix">
                  <span class="name">User ID:</span>
                  <span class="txt">{{ data.userCode }}</span>
              </dd>
              <dd class="clearfix">
                  <span class="name">Gender:</span>
                  <el-radio-group v-model="gender">
                    <el-radio :label="0">Male</el-radio>
                    <el-radio :label="1">Female</el-radio>
                  </el-radio-group>
              </dd>
              <dd class="clearfix dd_pwd">
                  <span class="name">Password:</span>
                  <span class="txt">********</span>
                  <span class="btn" @click="changePwd">Modify</span>
              </dd>
          </dl>
          <div class="img_info">
              <div class="img">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadImgHost"
                  :show-file-list="false"
                  :data="fileData"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                  :before-upload="beforeAvatarUpload">
                  <img :src="profileImageUrl"/>
                </el-upload>
              </div>
              <div class="info com_tag_box">
                  <span class="name">Permission:</span>
                  <template v-if="authData.length > 0">
                    <span class="item" v-for="item in authData">{{ item.companyName }}</span>
                  </template>

                  <span v-else>Empty</span>
              </div>
          </div>
      </div>
      <dl class="dl_form clearfix">
          <dd class="clearfix">
              <span class="name">User name:</span>
              <span class="txt readonly" >{{ data.userName }}</span>
          </dd>
          <dd class="clearfix dd_tel_mobile_number">
              <span class="name">Phone number:</span>
              <el-input v-model="telephoneNum1" placeholder="Area code" class="txt1" :maxlength="4"></el-input>
              <span class="line1">-</span>
              <el-input v-model="telephoneNum2" placeholder="Phone number" class="txt2" :maxlength="8"></el-input>
          </dd>
          <dd class="clearfix">
              <span class="name">E-mail:</span>
              <el-input v-model="eMail" placeholder="Please enter your e-mail address" :maxlength="30"></el-input>
          </dd>
          <dd class="clearfix dd_tel_mobile_number">
              <span class="name">Telephone number:</span>
              <el-input v-model="phoneNum1" placeholder="Country code" class="txt1" :maxlength="4"></el-input>
              <span class="line1">-</span>
              <el-input v-model="phoneNum2" placeholder="Telephone number" class="txt2" :maxlength="11"></el-input>
          </dd>
          <dd class="clearfix">
              <span class="name">Company code:</span>
              <span class="txt readonly" >{{ data.companyCode }}</span>
          </dd>
          <dd class="clearfix">
              <span class="name">Company name:</span>
              <span class="txt readonly" >{{ data.cCompanyName }}</span>
          </dd>
          <dd class="clearfix">
              <span class="name">Department code:</span>
              <span class="txt readonly" >{{ data.departmentCode }}</span>
          </dd>
          <dd class="clearfix">
              <span class="name">Department name:</span>
              <span class="txt readonly" >{{ data.dName }}</span>
          </dd>
          <dd class="clearfix">
              <span class="name">Team code:</span>
              <span class="txt readonly" >{{ data.teamCode }}</span>
          </dd>
          <dd class="clearfix">
              <span class="name">Team name:</span>
              <span class="txt readonly" >{{ data.tName }}</span>
          </dd>
          <dd class="clearfix dd_textarea">
              <span class="name">Position:</span>
              <span class="txt readonly" >{{ data.position }}</span>
          </dd>
          <dd class="clearfix dd_btn">
              <span class="com_btn reset_com_btn1" @click="updateBtn">Update setting</span>
          </dd>

      </dl>
  </div>

  <el-dialog
    v-if="dialogFormVisible"
    title="RESET PASSWORD"
    :visible.sync="dialogFormVisible"
    size= "tiny">
    <el-form :model="form">
      <el-form-item label="Old Password" :label-width="form.labelWidth">
        <el-input v-model="form.oldPwd" type="password" auto-complete="off" style="width:80%" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="New Password" :label-width="form.labelWidth">
        <el-popover
          placement="right"
          title="Password rule:"
          width="200"
          trigger="focus"
          content="Password length of at least 8 bits, including uppercase and special characters">
          <el-input slot="reference" v-model="form.newPwd1" type="password" auto-complete="off" style="width:80%" placeholder="" :maxlength="20"></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="Enter again" :label-width="form.labelWidth">
        <el-popover
          placement="right"
          title="Password rule:"
          width="200"
          trigger="focus"
          content="Password length of at least 8 bits, including uppercase and special characters">
          <el-input slot="reference" v-model="form.newPwd2" type="password" auto-complete="off" style="width:80%" placeholder="" :maxlength="20"></el-input>
        </el-popover>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="sendForm()">Update setting</el-button>
    </div>
  </el-dialog>

</div>
