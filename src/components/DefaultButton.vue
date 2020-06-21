<template>
  <button>{{ buttonName }}</button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class DefaultButton extends Vue {
    @Prop({default: '按钮'}) readonly buttonName!: string;
  }
</script>

<style lang="scss" scoped>
  button {
    padding: 4px 16px;
    border: none;

    font-size: 16px;
    background-color: #878787;
    color: #FFFFFF;
  }
</style>