<template>
  <div>
    <Layout>
      <div class="money">
        <Tags :selected-tags.sync="record.tags" />
        <Notes field-name="备注"
               placeholder="请在此处输入备注"
               :value.sync="record.notes"
        />
        <Tabs :data-source="tabBar" :type.sync="record.type" />
        <NumberPad @updateNumber="onUpdateNumber" :c-m.sync="money" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tabs from '@/components/Tabs.vue';
  import FormInputItem from '@/components/FormInputItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Notes: FormInputItem, Tags, Tabs, NumberPad}
  })
  export default class Money extends Vue {
    money: string = '0';
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 0,
      amount: 0
    };

    tabBar = recordTypeList;

    // 更新数据时，同时提交记录
    onUpdateNumber() {
      if (this.record.tags.length === 0) {
        let noSelect = window.confirm('您未选择任何标签，是否提交？');
        if (!noSelect) {
          console.log(this.money);
          return;
        }
      }
      this.record.amount = Number.parseFloat(this.money);
      this.$store.commit('createRecord', this.record);
      this.record = {
        tags: [],
        notes: '',
        type: this.record.type,
        amount: 0
      };
      this.money = '0';
      // TODO: Vue 不更新视图，只能先操作 dom
      document.querySelectorAll('.current-tags .tag-item.selected')
        .forEach(item => {
          item.classList.remove('selected');
        });
      window.alert('记录成功');
    }
  };
</script>

<style lang="scss" scoped>
  .money {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
</style>