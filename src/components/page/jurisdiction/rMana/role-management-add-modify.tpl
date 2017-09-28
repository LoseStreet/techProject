<div class="com_right_box">
  <div class="com_right_top_box">
    <router-link :to="{ name: 'roleMana'}" class="com_btn com_back_btn"><span>Return</span></router-link>
  </div>


  <div class="rMana_add_modify_box clearfix">
    <div class="clearfix">
      <dl class="dl_form clearfix">
        <dd class="clearfix roleName_dd">
          <span class="name">Role name:<i class="red">*</i></span>
          <el-input v-model="roleName" placeholder="Please enter Role name"></el-input>
        </dd>
        <dd class="clearfix dd_pwd">
          <span class="name">Describe:</span>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="Please enter describe"
            v-model="describe">
          </el-input>
        </dd>
      </dl>

      <!-- start of sub role-->
      <div class="subRole">
        <div class="add_box clearfix zIndex100">
          <span class="tit">Sub Role Management</span>

          <!-- <span class="com_btn addBtn">Add</span> -->
          <div class="com_select_box">
            <el-select v-model="roleSelect" placeholder="Select the role" class="itemL" @change="changeRoleSelect">
              <el-option
                v-for="item in roleSelectArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="com_tag_box list clearfix">
          <el-tag
            v-for="tag in roleTags"
            :key="tag.name"
            :closable="true"
            @close="closeTags(tag)"
          >
            {{tag.name}}
          </el-tag>
        </div>
      </div>
      <!-- start of sub role-->

    </div>

    <div id="roleManaAddModify" class="com_switch_table_box">
      <h2 class="com_switch_table_tit clearfix" v-show="!isActionAdd">
        <span :class="status === 0 ? 'focus' : '' " class="item" @click="tabTitClick(0)">Role and Permission</span>
        <span :class="status === 1 ? 'focus' : '' " class="item" @click="tabTitClick(1)">User list</span>
      </h2>
      <div class="com_switch_table_con">

        <!-- start of Role and Permission-->
        <div class="com_switch_table_show" v-show="status === 0">
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
                      <p><el-checkbox v-model="subitem.checked" @change="changeMainMenu(subitem.menuId,subitem.checked)"></el-checkbox>{{subitem.menuName}}</p>
                    </div>

                    <div class="tab_cell tab_func">
                      <p v-for="thritem in subitem.thrMenu"><el-checkbox v-model="thritem.checked" @change="changeSubMenu(thritem.menuId,thritem.checked)"></el-checkbox>{{thritem.menuName}}</p>
                    </div>
                  </div>

                </div>

              </template>

              <div v-else class="noInfoTips">Empty~</div>

            </div>
          </div>
        </div>
        <!-- end of Role and Permission-->


        <!-- start of User list-->
        <div class="com_switch_table_show" v-show="status === 1">
          <div class="com_top_oper_box clearfix">
            <span id="rManaAddModifyAddUserBtn" class="itemL com_btn" @click="showTransferFun">add</span>
            <span class="itemL com_btn" @click="batchremoveUser">remove</span>
          </div>

          <div class="com_table_box role_mana_user_list_box">

            <div class="com_table_title clearfix">
              <span class="tab_cell tab_id"><el-checkbox v-model="checkedAll"></el-checkbox>User ID</span>
              <span class="tab_cell tab_name">User name</span>
              <span class="tab_cell tab_position">Position</span>
              <span class="tab_cell tab_permission">Permission</span>
              <span class="tab_cell tab_oper">Operation</span>
            </div>
            <div class="com_table_con clearfix">

              <template v-if="userListInfo && userList.length > 0">
                <div class="tab_row clearfix" v-for="(item, key) in userList">
                  <el-tooltip :content="String(item.userId) | isEmptyVal" placement="top" :open-delay="tooltipDelay">
                    <span class="tab_cell tab_id"><el-checkbox v-model="checkedArr[key].checked"></el-checkbox>{{item.userId | isEmptyVal}}</span>
                  </el-tooltip>

                  <el-tooltip :content="item.userName | isEmptyVal" placement="top" :open-delay="tooltipDelay">
                    <span class="tab_cell tab_name">{{item.userName | isEmptyVal}}</span>
                  </el-tooltip>

                  <el-tooltip :content="item.position | isEmptyVal" placement="top" :open-delay="tooltipDelay">
                    <span class="tab_cell tab_position">{{item.position | isEmptyVal}}</span>
                  </el-tooltip>

                  <el-tooltip :content="item.companyNames | joinDayton" placement="top" :open-delay="tooltipDelay">
                    <span class="tab_cell tab_permission">{{item.companyNames | joinDayton}}</span>
                  </el-tooltip>

                  <span class="tab_cell tab_oper">
                    <a @click="openMsgBox([item.userId])">Remove</a>
                  </span>
                </div>

                <el-pagination
                  v-if="userListInfo && userListInfo.pages > 1"
                  @current-change="handleCurrentChange"
                  :current-page.sync="userListInfo.pageNum"
                  :page-size="userListInfo.pageSize"
                  layout="prev, pager, next, jumper"
                  :total="userListInfo.total">
                </el-pagination>
              </template>

              <div v-else class="noInfoTips">Empty~</div>

            </div>

            <div class="com_pop_box opear_transfer_box" v-if="showTransfer">
              <h2 class="com_pop_tit">Add user</h2>
              <span class="com_pop_close" @click="closeTransfer"></span>
              <template>
                <el-transfer
                  :titles="['User list', 'Selected users']"
                  v-model="userListSelect"
                  :data="userListData">
                </el-transfer>
              </template>

              <div class="btn_wrap">
                <span class="com_btn"  @click="saveUserSelect">Save</span>
                <span class="com_btn" @click="closeTransfer">Cancel</span>
              </div>
            </div>
            <div v-if="showTransfer" class="com_mask"></div>
          </div>

        </div>
        <!-- end of User list -->

      </div>
    </div>

    <div class="btn clearfix"><span class="com_btn reset_com_btn1" @click="saveRole">Save</span></div>

  </div>
</div>
