<template>
  <div class="container">
    <h1>404 Not Found</h1>
    <div class="back-home">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NotFound'
  };
</script>

<style lang="scss" scoped>
  .container {
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