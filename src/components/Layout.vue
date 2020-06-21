<template>
  <div :style="`height: ${height}px`" class="box-container">
    <div :style="`height: ${height - 49}px`" class="content">
      <slot></slot>
    </div>
    <NavBar />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  @Component
  export default class Layout extends Vue {
    height = 0;

    mounted() {
      this.height = document.body.clientHeight;
    }
  };
</script>

<style lang="scss" scoped>
  .box-container {
    width: 100%;

    .content {
      overflow: auto;
    }
  }
</style>