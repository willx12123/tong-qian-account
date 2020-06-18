<template>
  <div class="container">
    <div class="content">
      <slot></slot>
    </div>
    <NavBar />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'LayOut'
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    .content {
      flex-grow: 1;
      overflow: auto;
    }
  }
</style>