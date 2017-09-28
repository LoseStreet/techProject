<div class="header">
    <div class="com_box clearfix">
        <span class="lItem logo"><img src="../../../images/common/logo.png" /></span>

        <div v-if="isLogin" id="loginAfterUser" class="login_after clearfix">
            <a href="javascript:void(0);" class="rItem exit" @click="loginout">Sign out<i class="rIcon comSignOutIcon"></i></a>
            <span class="rItem"><i class="comLineIcon"></i></span>
            <router-link :to="{ name: 'user'}" class="rItem headPic"><img :src="arImg" />{{ arName }}</router-link>
        </div>

        <span class="rItem slogan">BOC User Management System</span>
    </div>
</div>
