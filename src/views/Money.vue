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
        <NumberPad @updateNumber="onUpdateNumber" />
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
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 0,
      amount: 0
    };

    tabBar = recordTypeList;

    // 更新数据时，同时提交记录
    onUpdateNumber(number: string) {
      this.record.amount = Number.parseFloat(number);
      this.$store.commit('createRecord', this.record);
      this.record = {
        tags: [],
        notes: '',
        type: 0,
        amount: 0
      };
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