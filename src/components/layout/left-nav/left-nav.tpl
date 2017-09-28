<div class="com_left_box" id="leftNav">
  <h2 class="comH2Title">BANK OF CHINA</h2>
   <!-- <dl class="dl_left_nav">
    <dt class="dt_nav_jurisdiction hasSubNav" @mouseenter="toggle" @mouseleave="toggle">
      <a href="javascript:void(0);">权限管理</a>
      <dl class="dl_left_sub_nav" v-show="showMana">
        <dt class="dt_nav_user_mana" @click.stop="focusNav($event, 0)"><router-link :to="{ name: 'userMana'}">用户管理<i class="comArrowRightIcon"></i></router-link></dt>
        <dt class="dt_nav_role_mana" @click.stop="focusNav($event, 0)"><router-link :to="{ name: 'roleMana'}">角色管理<i class="comArrowRightIcon"></i></router-link></dt>
        <dt class="dt_nav_function_mana" @click.stop="focusNav($event, 0)"><router-link :to="{ name: 'fMana'}">菜单管理<i class="comArrowRightIcon"></i></router-link></dt>
        <dt class="dt_nav_function_mana" @click.stop="focusNav($event, 0)"><router-link :to="{ name: 'fMana.en'}">菜单管理<i class="comArrowRightIcon"></i></router-link></dt>
        <dt class="dt_nav_conlog" @click.stop="focusNav($event, 0)"><router-link :to="{ name: 'conlogList'}">日志列表<i class="comArrowRightIcon"></i></router-link></dt>
      </dl>
    </dt>
  </dl> -->

  <dl class="dl_left_nav" v-if="menuData && menuData.length > 0">

    <dt class="dt_nav_jurisdiction hasSubNav" @mouseenter="toggle" @mouseleave="toggle" v-for="(item, key) in menuData">
      <dl class="dl_left_sub_nav">
        <dt :data-router="item.menuUrl.split(',')[0]" @click.stop="focusNav($event, 0)"><router-link :to="{ name: item.menuUrl.split(',')[0]}">{{item.menuName}}<i class="comArrowRightIcon"></i></router-link></dt>
      </dl>
    </dt>

  </dl>

  <div v-else class="noInfoTips dl_left_nav">Empty</div>

</div>
