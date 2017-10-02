<div class="com_right_box">

  <div class="com_top_oper_box">
    <router-link :to="{ name: 'company'}" class="com_btn com_back_btn"><span>返回</span></router-link>
  </div>

  <div class="com_con_center accept_box">
    <dl class="dl_form">
      <dd class="clearfix">
        <span class="name">接收方手机号</span>
        <el-input v-model="mobile" @keyup.enter="acceptCompany" placeholder="请输入手机号"></el-input>
      </dd>
      <dd class="clearfix">
        <span class="name">短信验证码</span>
        <el-input v-model="code" class="password" @keyup.enter="acceptCompany" placeholder="请输入验证码"></el-input>
        <el-button v-if="!successCodeFlag" class="com_btn reset_com_btn1 passwordBtn" @click="getcode">获取验证码</el-button>
        <el-button v-else class="com_btn reset_com_btn1" type="primary" :disabled="true">重新获取{{countDown}}s</el-button>
      </dd>
    </dl>
  </div>

  <div class="com_con_bottom">
    <el-button @click="acceptCompany" class="com_btn reset_com_btn1 accept_btn">转让</el-button>
  </div>

</div>
