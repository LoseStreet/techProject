<div class="com_right_box">

  <div class="company_list_box">
    <div class="com_top_oper_box clearfix">
      <el-button class="com_btn" :class="selectStatus === 2 ? 'focus' : ''" @click="changeStatus(2)">已上线</el-button>
      <el-button class="com_btn" :class="selectStatus === 1 ? 'focus' : ''" @click="changeStatus(1)">待审核</el-button>
      <el-button class="com_btn" :class="selectStatus === 7 ? 'focus' : ''" @click="changeStatus(7)">所有</el-button>

      <el-input
        class="searchInput"
        placeholder="请输入企业名称"
        icon="search"
        v-model="keyword"
        :on-icon-click="handleIconClick">
      </el-input>
    </div>

    <div class="com_table_box role_mana_list_box">

      <div class="com_table_title clearfix">
        <span class="tab_cell">企业名称</span>
        <span class="tab_cell">企业地址</span>
        <span class="tab_cell">员工数</span>
        <span class="tab_cell">申请时间</span>
        <span class="tab_cell tab_oper">操作</span>
      </div>

      <div class="com_table_con">

        <template v-if="companyList && companyList.length > 0">
          <div class="tab_row clearfix" v-for="item in companyList">
            <span class="tab_cell">{{ item.name }}</span>
            <span class="tab_cell">{{ item.address }}</span>
            <span class="tab_cell">员工(<i class="staffNum">{{ item.staffNum }}</i>)</span>
            <span class="tab_cell">{{ item.createdTime }}</span>
            <span class="tab_cell tab_oper">
              <i v-if="item.status !== 2" class="check_ok" @click="openMsgBox(item.id, 2)"></i>
              <i v-if="item.status !== 2" class="check_no" @click="openMsgBox(item.id, 4)"></i>
              <i class="check_claim_btn">
                <router-link :to="{ name: 'auditCompany', query: { 'companyId': item.id}}">认领</router-link>
              </i>
            </span>
          </div>

          <!-- <el-pagination
            v-if="companyList && companyList.totalPage > 1"
            @current-change="handleCurrentChange"
            :current-page.sync="companyList.pageNum"
            :page-size="companyList.pageSize"
            layout="prev, pager, next, jumper"
            :total="companyList.totalPage">
          </el-pagination> -->
        </template>

        <div v-else class="noInfoTips">暂无内容~</div>
      </div>

    </div>
  </div>
</div>
