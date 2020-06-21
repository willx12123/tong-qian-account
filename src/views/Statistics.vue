<template>
  <Layout>
    <div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
      <div>{{ msg }}</div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default class Statistics extends Vue {
    msg = 'hello statistics';
  };
</script>

<style lang="scss" scoped>

</style>