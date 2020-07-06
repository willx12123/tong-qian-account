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
        <RecordListItem :type="3">
          <div slot="left">
            {{ Object.keys(item1)[0] }}年
          </div>
          <div slot="right" v-if="dateType === 2">
            {{ type===0?'-':'+' }}
            {{
            type===0 ?
            yearMoney[Object.keys(item1)[0]].cost :
            yearMoney[Object.keys(item1)[0]].earn
            }}
          </div>
        </RecordListItem>
        <div class="month-bar"
             v-if="dateType === 1 || dateType === 0"
             v-for="(item2, index2) in Object.values(item1)[0]"
             :key="index2"
        >
          <RecordListItem :type="2">
            <div slot="left">
              {{ Object.keys(item2)[0] }}月
            </div>
            <div slot="right" v-if="dateType === 1">
              {{ type===0?'-':'+' }}
              {{
              type===0 ?
              monthMoney[Object.keys(item1)[0]][Object.keys(item2)[0]].cost :
              monthMoney[Object.keys(item1)[0]][Object.keys(item2)[0]].earn
              }}
            </div>
          </RecordListItem>
          <div class="day-bar"
               v-if="dateType === 0"
               v-for="(item3, index3) in Object.values(item2)[0]"
               :key="index3"
          >
            <RecordListItem type="1">
              <div slot="left">
                {{ isToday(item3) }}日
              </div>
              <div slot="right"></div>
            </RecordListItem>
            <RecordListItem :type="0"
                            v-for="day in Object.values(item3)[0]"
                            :key="day.createAt"
                            v-if="day.type===type"
            >
              <div slot="left" class="tag-container">
                <div class="tag"
                     v-for="(tag, index) in day.tags"
                     :key="index"
                >
                  {{ tag }}
                </div>
              </div>
              <div slot="right" class="money">
                {{ day.type === 0 ? '-':'+' }}
                <span>¥</span>
                {{ day.amount }}
              </div>
            </RecordListItem>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import dayjs from 'dayjs';

  import Tabs from '@/components/Tabs.vue';

  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import RecordListItem from '@/components/Statistics/RecordListItem.vue';

  @Component({
    components: {RecordListItem, Tabs}
  })
  export default class Statistics extends Vue {
    tabBar = recordTypeList;
    timeBar = intervalList;
    type = 0;
    dateType = 0;

    yearMoney: MoneyYear = {};
    monthMoney: MoneyMonth = {};

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
          let monMoney: MoneyType = {
            cost: 0,
            earn: 0
          };
          for (const day of Object.keys(this.result[year][month])) {
            for (let item of this.result[year][month][day]) {
              if (item.type === 0) {
                monMoney.cost += item.amount;
              } else {
                monMoney.earn += item.amount;
              }
            }
            const tempArr = this.result[year][month][day].sort(
              (a, b) =>
                dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
            );
            const mixObj: DayItem = {};
            mixObj[day] = tempArr;
            dayArr.push(mixObj);
          }
          if (!this.monthMoney[year]) {
            this.monthMoney[year] = {};
          }
          this.monthMoney[year][month] = monMoney;
          if (!this.yearMoney[year]) {
            this.yearMoney[year] = {
              cost: 0,
              earn: 0
            };
          }
          this.yearMoney[year].earn += monMoney.earn;
          this.yearMoney[year].cost += monMoney.cost;
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

    .month-bar {
      width: 100%;

      .day-bar {
        width: 100%;

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