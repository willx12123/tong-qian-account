<template>
  <Layout>
    <div class="statistic-container">
      <Tabs class-prefix="statistic-tab-bar"
            :data-source="tabBar"
            :type.sync="type"
      />
      <Tabs class-prefix="time-bar"
            :data-source="timeBar"
            :type.sync="dateType"
      />
      <div class="year-bar" v-for="(yearItem, year) in result" :key="year">
        <h2>{{ year }}年</h2>
        <div class="month-bar" v-for="(monthItem, month) in yearItem"
             :key="month"
        >
          <h3>{{ month }}月</h3>
          <div class="day-bar" v-for="(dayItem, day) in monthItem" :key="day">
            <h4>{{ day }}日</h4>
            <div class="item-bar" v-for="day in dayItem" :key="day.createAt">
              <div class="tag-container">
                <div class="tag"
                     v-for="(tag, index) in day.tags"
                     :key="index"
                >
                  {{ tag }}
                </div>
              </div>
              <div class="money"><span>¥</span>{{ day.amount }}</div>
            </div>
          </div>
        </div>
      </div>
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

    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    get result() {
      const {recordList} = this;
      const hashTable: RecordHashTable = {};
      for (let i = 0; i < recordList.length; i++) {
        const tempDate = new Date(recordList[i].createAt as Date);
        const year = tempDate.getFullYear().toString() || '1970';
        const month = (tempDate.getMonth() + 1).toString() || '1';
        const day = tempDate.getDay().toString() || '1';
        if (!hashTable[year]) {
          hashTable[year] = {};
          hashTable[year][month] = {};
          hashTable[year][month][day] = [recordList[i]];
        } else {
          if (!hashTable[year][month]) {
            hashTable[year][month] = {};
            hashTable[year][month][day] = [recordList[i]];
          } else {
            if (!hashTable[year][month][day]) {
              hashTable[year][month][day] = [recordList[i]];
            } else {
              hashTable[year][month][day].push(recordList[i]);
            }
          }
        }
      }
      console.log(hashTable);
      return hashTable;
    }
  };
</script>

<style lang="scss" scoped>
  .statistic-container {
    width: 100%;
    height: 100%;

    overflow: auto;
  }

  ::v-deep .selected.statistic-tab-bar-item {
    background-color: #FFFFFF;
    border-bottom: 3px solid transparent;
  }

  ::v-deep li.time-bar-item {
    background-color: #FFFFFF;
  }

  .year-bar {
    width: 100%;
    border-top: 1px solid #EFEFEF;
    background-color: #FFFFFF;
    box-shadow: 2px 0 5px #DDDDDD;

    h2 {
      background-color: #DFDFDF;
      padding-left: 16px;
      padding-top: 8px;
      padding-bottom: 8px;
      font-size: 16px;
      color: #222222;
      font-weight: bold;
    }

    .month-bar {
      width: 100%;

      h3 {
        background-color: #EEEEEE;
        padding-left: 16px;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 16px;
        color: #222222;
        font-weight: bold;

        border-bottom: 1px solid #EEEEEE;
      }

      .day-bar {
        width: 100%;

        h4 {
          background-color: #F6F6F6;
          padding-left: 16px;
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 14px;
          font-weight: 400;
          color: #222222;
        }

        .item-bar {
          width: 100%;
          padding: 4px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 14px;
          color: #333333;

          .tag-container {
            display: flex;

            .tag {
              margin-right: 8px;
            }
          }

          .money {
            display: flex;
            align-items: center;

            span {
              margin: 0 3px;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
</style>