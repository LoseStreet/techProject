<div class="com_right_box">
  <div class="com_table_box reset_com_table_box reset_com_table_height">
    <div class="com_table_title clearfix">
      <span class="tab_cell tab_appl">Application</span>
      <span class="tab_cell tab_func">Function</span>
    </div>

    <div class="com_table_con clearfix uMana_add_modify_table_con">

      <template v-if="menuData && menuData.length > 0">

        <div class="" v-for="item in menuData" >

          <div class="tab_row clearfix" v-for="subitem in item.subMenu">

            <div class="tab_cell tab_appl clearfix">
              <p>{{subitem.menuName}}</p>
            </div>

            <div class="tab_cell tab_func clearfix">
              <p v-for="thritem in subitem.thrMenu">{{thritem.menuName}}</p>
            </div>

          </div>

        </div>

      </template>

      <div v-else class="noInfoTips">Empty~</div>

    </div>
  </div>

</div>
