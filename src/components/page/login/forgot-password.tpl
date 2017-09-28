<div class="reset_pwd_box">
    <div class="com_con_box">
        <h2 class="com_con_top comH2Title">RESET PASSWORD</h2>
        <div class="com_con_center">

            <dl class="dl_form">
                <dd class="clearfix">
                    <span class="name">User Name</span>
                    <input type="text" v-model="userName" class="txt" placeholder="Please enter user Name" @keyup.enter="send" />
                </dd>
                <dt class="clearfix">
                    <p>The administrator will help you reset the password</p>
                    <p>Already have login and password?  <router-link :to="{ name: 'login'}">Sign in</router-link></p>
                </dt>

            </dl>

        </div>
        <div class="com_con_bottom">
            <span class="com_btn reset_com_btn1" @click="send">Sign in</span>
        </div>
    </div>
</div>
