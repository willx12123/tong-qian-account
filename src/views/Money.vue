<template>
  <div class="container">
    <Layout>
      <div class="money">
        <Tags :tags-data.sync="tags" @updateSelected="onUpdateSelectedTags" />
        <Notes @updateValue="onUpdateNotes" />
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
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  interface Record {
    tags: string[]
    notes: string
    type: number
    amount: number
  }

  @Component({
    components: {Notes, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    tags: string[] = ['吃饭', '房租', '零食', '买书'];
    record: Record = {
      tags: [],
      notes: '',
      type: 0,
      amount: 0
    };

    onUpdateSelectedTags(selectedTags: string[]) {
      this.record.tags = selectedTags;
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes;
    }

    onUpdateNumber(number: string) {
      this.record.amount = Number.parseFloat(number);
      console.log(this.record);
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