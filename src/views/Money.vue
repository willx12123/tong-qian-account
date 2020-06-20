<template>
  <div class="container">
    <Layout>
      <div class="money">
        <Tags :tags-data.sync="tags" :selected-tags.sync="record.tags" />
        <Notes :value.sync="record.notes" />
        <Types :type.sync="record.type" />
        <NumberPad @updateNumber="onUpdateNumber" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';

  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import { model } from '@/model';

  const recordList = model.fetch();

  @Component({
    components: {Notes, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags: string[] = ['吃饭', '房租', '零食', '买书'];
    recordList: RecordItem[] = recordList;
    record: RecordItem = {
      tags: [],
      notes: '',
      type: 0,
      amount: 0
    };

    // 更新数据时，同时提交记录
    onUpdateNumber(number: string) {
      this.record.amount = Number.parseFloat(number);
      this.record.createAt = new Date();
      const newRecord = JSON.parse(JSON.stringify(this.record));
      this.recordList.push(newRecord);
      this.record = {
        tags: [],
        notes: '',
        type: 0,
        amount: 0
      };
      console.log(this.recordList);
    }

    @Watch('recordList')
    onRecordListChange() {
      model.save(recordList);
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