<template>
  <div class="container">
    <Layout>
      <div class="money">
        <Tags />
        <Notes />
        <Types />
        <NumberPad />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  export default {
    name: 'Money',
    components: {Tags, Notes, Types, NumberPad}
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