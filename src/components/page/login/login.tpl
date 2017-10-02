<div class="login_box">
	<div class="com_con_box">
		<h2 class="com_con_top comH2Title">登陆</h2>
		<div class="com_con_center">

			<dl class="dl_form">
				<dd class="clearfix">
					<span class="name">手机号</span>
					<el-input v-model="userName" @keyup.enter="toLogin" placeholder="请输入手机号"></el-input>
				</dd>
				<dd class="clearfix">
					<span class="name">验证码</span>
					<el-input v-model="password" class="password" @keyup.enter="toLogin" placeholder="请输入验证码"></el-input>
					<el-button v-if="!successCodeFlag" class="com_btn reset_com_btn1 passwordBtn" @click="getcode">获取验证码</el-button>
					<el-button v-else class="com_btn reset_com_btn1" type="primary" :disabled="true">重新获取{{countDown}}s</el-button>
				</dd>
			</dl>
		</div>
		<div class="com_con_bottom">
			<el-button @click="toLogin" class="com_btn reset_com_btn1">登陆</el-button>
		</div>
	</div>
</div>
