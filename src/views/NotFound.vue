<template>
  <div class="not-found-container">
    <h1>404 Not Found</h1>
    <div class="back-home">
      <router-link to="/money">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default class NotFound extends Vue {
  };
</script>

<style lang="scss" scoped>
  .not-found-container {
    width: 100vw;
    height: 100vh;
    padding: 40px;

    h1 {
      text-align: center;
    }

    .back-home {
      margin: 0 auto;
      text-align: center;
    }
  }
</style>