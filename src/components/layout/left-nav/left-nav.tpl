<div class="com_left_box" id="leftNav">
  <h2 class="comH2Title">
    <i class=logo>一企</i>
    <span>一企科技</span>
  </h2>

   <ul class="dl_left_nav">
     <li @click="focusNav(0)" :class="select == 0 ? 'focusNav' : ''"><router-link :to="{ name: 'company'}">企业</router-link></li>
     <li @click="focusNav(1)" :class="select == 1 ? 'focusNav' : ''"><router-link :to="{ name: 'restaurant'}">餐馆</router-link></li>
   </ul>

</div>
