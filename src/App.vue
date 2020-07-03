<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('fetchRecordList');
      this.$store.commit('fetchTagList');
    }
  };
</script>

<style lang="scss">
  @import "~@/assets/style/reset.scss";

  html, body {
    height: 100%;
    width: 100%;
  }
</style>