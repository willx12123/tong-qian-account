<template>
  <Layout>
    <div>
      <Tabs class-prefix="statistic-tab-bar"
            :data-source="tabBar"
            :type.sync="type"
      />
      <Tabs class-prefix="time-bar"
            :data-source="timeBar"
            :type.sync="dateType"
      />
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import Tabs from '@/components/Tabs.vue';

  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    tabBar = recordTypeList;
    timeBar = intervalList;
    type = 0;
    dateType = 0;
  };
</script>

<style lang="scss" scoped>
  ::v-deep .selected.statistic-tab-bar-item {
    background-color: #FFFFFF;
    border-bottom: 3px solid transparent;
  }

  ::v-deep li.time-bar-item {
    background-color: #FFFFFF;
  }
</style>