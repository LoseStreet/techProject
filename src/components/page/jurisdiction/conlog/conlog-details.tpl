<div class="com_right_box">
  <div class="com_right_top_box">

    <router-link :to="{ name: 'conlogList'}" class="com_btn com_back_btn"><span>Return</span></router-link>

    <div class="list_bottom_oper_box"><span id="listExportBtn" class="com_btn reset_com_btn1" @click="downloadUserLogExcel">Export</span></div>

  </div>

  <div class="conlog_details_box">

    <p class="conlog_details_top"><span class="tit">User Name:</span><em class="name" v-if="detailList && detailList[0]">{{detailList[0].userName | isEmptyVal}}</em></p>

    <div class="conlog_details_con">

      <template v-if="detailList && detailList.length > 0">

        <div class="conlog_details_item" v-for="item in detailList">
          <span class="time">{{item.createTime |  formatHMS}}</span>
          <p>{{item.function}}</p>
          <p>remark: {{item.remark | isEmptyVal}}</p>
        </div>

      </template>

      <div v-else class="noInfoTips">Empty~</div>

    </div>

  </div>

</div>
