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
      <div class="year-bar" v-for="(item1, index1) in sortArr" :key="index1">
        <h2>{{ Object.keys(item1)[0] }}年</h2>
        <div class="month-bar"
             v-for="(item2, index2) in Object.values(item1)[0]"
             :key="index2"
        >
          <h3>{{ Object.keys(item2)[0] }}月</h3>
          <div class="day-bar"
               v-for="(item3, index3) in Object.values(item2)[0]"
               :key="index3"
          >
            <h4>{{ isToday(item3) }}日</h4>
            <div class="item-bar"
                 v-for="day in Object.values(item3)[0]"
                 :key="day.createAt"
                 v-if="day.type===type"
            >
              <div class="tag-container">
                <div class="tag"
                     v-for="(tag, index) in day.tags"
                     :key="index"
                >
                  {{ tag }}
                </div>
              </div>
              <div class="money">
                {{ day.type === 0 ? '-':'+' }}
                <span>¥</span>
                {{ day.amount }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';
  import dayjs from 'dayjs';

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

    sortArr: any = this.sortByDay;

    get recordList(): RecordItem[] {
      return this.$store.state.recordList;
    }

    get result() {
      const {recordList} = this;
      const hashTable: StatisticHashTable = {};
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
      return hashTable;
    }

    isToday(day: DayItem): string {
      let newDay: string;
      let dateDay = dayjs(Object.values(day)[0][0].createAt);
      if (dateDay.isSame(new Date(), 'day')) {
        newDay = '今';
      } else if (dateDay.isBefore(new Date(), 'day')) {
        newDay = '昨';
      } else {
        newDay = Object.keys(day)[0];
      }
      return newDay;
    }

    get sortByDay() {
      let yearArr: YearItem[] = [];
      let monthArr: MonthItem[] = [];
      let dayArr: DayItem[] = [];
      for (const year of Object.keys(this.result)) {
        for (const month of Object.keys(this.result[year])) {
          for (const day of Object.keys(this.result[year][month])) {
            const tempArr = this.result[year][month][day].sort(
              (a, b) =>
                dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
            );
            const mixObj: DayItem = {};
            mixObj[day] = tempArr;
            dayArr.push(mixObj);
          }
          dayArr.sort(
            (a, b) =>
              Number.parseInt(Object.keys(b)[0]) -
              Number.parseInt(Object.keys(a)[0])
          );
          const mixObj: MonthItem = {};
          mixObj[month] = dayArr;
          monthArr.push(mixObj);
        }
        monthArr.sort(
          (a, b) =>
            Number.parseInt(Object.keys(b)[0]) -
            Number.parseInt(Object.keys(a)[0])
        );
        const mixObj: YearItem = {};
        mixObj[year] = monthArr;
        yearArr.push(mixObj);
      }
      return yearArr.sort(
        (a, b) =>
          Number.parseInt(Object.keys(b)[0]) -
          Number.parseInt(Object.keys(a)[0])
      );
    }

    get sortByMonth() {
      return [];
    }

    get sortByYear() {
      return [];
    }

    @Watch('dateType')
    changeSort() {
      if (this.dateType === 0) {
        this.sortArr = this.sortByDay;
      } else if (this.dateType === 1) {
        this.sortArr = this.sortByMonth;
      } else if (this.dateType === 2) {
        this.sortArr = this.sortByYear;
      }
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
    $bg-color: #DDDDDD;

    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 2px 0 5px #DDDDDD;

    h2 {
      background-color: darken($bg-color, 16%);
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
        background-color: darken($bg-color, 8%);
        padding-left: 16px;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 16px;
        color: #222222;
        font-weight: bold;
      }

      .day-bar {
        width: 100%;

        h4 {
          background-color: $bg-color;
          padding-left: 16px;
          padding-top: 4px;
          padding-bottom: 4px;
          font-size: 15px;
          font-weight: 400;
          color: #222222;
        }

        .item-bar {
          width: 100%;
          padding: 4px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          font-size: 15px;
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
              font-weight: 200;
            }
          }
        }
      }
    }
  }
</style>