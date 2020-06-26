<template>
  <div>
    <Layout>
      <div class="money">
        <Tags :selected-tags.sync="record.tags" />
        <Notes field-name="备注"
               placeholder="请在此处输入备注"
               :value.sync="record.notes"
        />
        <Types :type.sync="record.type" />
        <NumberPad @updateNumber="onUpdateNumber" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormInputItem from '@/components/FormInputItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import { recordListModel } from '@/model';

  recordListModel.fetch();

  @Component({
    components: {Notes: FormInputItem, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    recordList: RecordItem[] = recordListModel.data;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 0,
      amount: 0
    };

    // 更新数据时，同时提交记录
    onUpdateNumber(number: string) {
      this.record.amount = Number.parseFloat(number);
      recordListModel.create(this.record);
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
      console.log(this.recordList);
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