<div class="login_box">
	<div class="com_con_box">
		<h2 class="com_con_top comH2Title">SIGN IN</h2>
		<div class="com_con_center">

			<dl class="dl_form">
				<dd class="clearfix">
					<span class="name">User Name</span>
					<input v-model="userName" type="text" class="txt" @keyup.enter="toLogin" placeholder="Please enter user name" />
				</dd>
				<dd class="clearfix">
					<span class="name">Password</span>
					<input v-model="password" type="password" class="txt" placeholder="Please enter password" @keyup.enter="toLogin" />
				</dd>
			</dl>
			<div class="other clearfix">
				<span class="remember"><el-checkbox v-model="checked">Remember me</el-checkbox></span>
				<router-link class="forgot" :to="{ name: 'forgotPwd'}" >Forgot your password ?</router-link>
			</div>
		</div>
		<div class="com_con_bottom">
			<span @click="toLogin" class="com_btn reset_com_btn1">Sign in</span>
		</div>
	</div>
</div>
