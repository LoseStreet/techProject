<div class="com_right_box">

  <div class="rMana_list_box">
    <div class="com_top_oper_box clearfix">
      <span class="itemL com_top_oper_tit">Query time:</span>
      <div class="itemL clearfix com_time_box">
        <el-date-picker
          class="itemL"
          v-model="dateSelect"
          type="daterange"
          placeholder="Select the date range">
        </el-date-picker>
      </div>

      <div v-if="logList && dataList && dataList.length > 0" class="list_bottom_oper_box"><span id="listExportBtn" class="com_btn reset_com_btn1" @click="downloadUserLogExcel">Export</span></div>

    </div>

    <div class="com_table_box conlog_list_box">
      <div class="com_table_title clearfix">
        <span class="tab_cell tab_id">Log ID</span>
        <span class="tab_cell tab_name">Role name</span>
        <span class="tab_cell tab_code">Company name</span>
        <span class="tab_cell tab_code">DEPT name</span>
        <span class="tab_cell tab_code">Team name</span>
        <span class="tab_cell tab_func">Function</span>
        <span class="tab_cell tab_addr">Client.IP.Address</span>
        <span class="tab_cell tab_time">Process.date</span>
        <span class="tab_cell tab_status">Time</span>
        <span class="tab_cell tab_oper">Operation</span>
      </div>

      <div class="com_table_con clearfix">

        <template v-if="logList && dataList && dataList.length > 0">

          <div class="tab_row clearfix" v-for="item in dataList">
            <el-tooltip :content="String(item.logId) | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_id">{{item.logId | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.userName | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_name">{{item.userName | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.companyCode | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_code">{{item.companyCode | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.departmentCode | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_code">{{item.departmentCode | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.teamCode | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_code">{{item.teamCode | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.function | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_func">{{item.function | isEmptyVal}}</span>
            </el-tooltip>

            <el-tooltip :content="item.clientIpAddress | isEmptyVal" placement="top" :open-delay="tooltipDelay">
              <span class="tab_cell tab_addr">{{item.clientIpAddress | isEmptyVal}}</span>
            </el-tooltip>

            <span class="tab_cell tab_time">{{item.time | isEmptyVal | formatYMD}}</span>

            <span class="tab_cell tab_status">{{item.time | isEmptyVal | formatHMS}}</span>

            <span class="tab_cell tab_oper"><a href=""><router-link :to="{ name: 'conlogDetails', query: { token:item.token}}">Details</router-link></a></span>
          </div>

          <el-pagination
            v-if="logList && dataList && logList.pages > 1"
            @current-change="handleCurrentChange"
            :current-page.sync="logList.pageNum"
            :page-size="logList.pageSize"
            layout="prev, pager, next, jumper"
            :total="logList.total">
          </el-pagination>
        </template>

        <div v-else class="noInfoTips">Empty~</div>

      </div>

    </div>
  </div>

</div>
