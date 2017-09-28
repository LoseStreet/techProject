<div class="com_right_box">

  <div class="rMana_list_box">
    <div class="com_top_oper_box clearfix">
      <router-link :to="{ name: 'roleManaAdd', query: {action: 'add'}}" class="itemL com_btn">add</router-link>
      <span class="itemL com_btn" @click="batchEnabledRoles(0)">enable</span>
      <span class="itemL com_btn" @click="batchdisabledRoles(1)">disable</span>

       <div class="itemR search_box">
        <el-input v-model="searchVal" placeholder="Enter the role name" icon="search" :on-icon-click="handleIconClick"></el-input>
      </div>

      <div class="itemR com_select_box">
        <el-select v-model="roleStatusSel" placeholder="Role state" class="itemL" @change="changeRoleStatus">
          <el-option
            v-for="item in roleStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="com_table_box role_mana_list_box">

      <div class="com_table_title clearfix">
        <span class="tab_cell tab_name"><el-checkbox v-if="checkedArr.length > 0" v-model="checkedAll"></el-checkbox>Role name</span>
        <span class="tab_cell tab_count">User Count</span>
        <span class="tab_cell tab_list">User list</span>
        <span class="tab_cell tab_status">Status</span>
        <span class="tab_cell tab_time">Created Date</span>
        <span class="tab_cell tab_oper">Operation</span>
      </div>

      <div class="com_table_con clearfix">

        <template v-if="roleList && roleList.data && roleList.data.length > 0">
          <div class="tab_row clearfix" v-for="(item, key) in roleList.data">
            <el-tooltip :content="item.roleName | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_name"><el-checkbox v-if="checkedArr.length > 0" v-model="checkedArr[key].checked"></el-checkbox>{{item.roleName | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="String(item.count) | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_count">{{dealCount(item.userNames)}}</span>
            </el-tooltip>

            <el-tooltip :content="item.userNames | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_list">{{item.userNames | isEmptyVal}}</span>
            </el-tooltip>

            <span class="tab_cell tab_status">{{roleStatus1[item.isEnabled]}}</span>
            <span class="tab_cell tab_time">{{item.createTime | isEmptyVal | formatYMD}}</span>
            <span class="tab_cell tab_oper"><router-link :to="{ name: 'roleManaAdd', query: {action: 'modify', roleId: item.roleId}}">Modify</router-link>|<a @click="openMsgBox(item.isEnabled, [item.roleId])" :class="[{ enable: item.isEnabled}]">{{item.isEnabled ? "Disable" : "Enable"}}</a></span>
          </div>

          <el-pagination
            v-if="roleList && roleList.data && roleList.pages > 1"
            @current-change="handleCurrentChange"
            :current-page.sync="roleList.pageNum"
            :page-size="roleList.pageSize"
            layout="prev, pager, next, jumper"
            :total="roleList.total">
          </el-pagination>
        </template>

        <div v-else class="noInfoTips">Empty~</div>
      </div>
    </div>
  </div>
</div>
