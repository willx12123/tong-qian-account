<template>
  <div class="record-item-container" :class="typeClassName[type]">
    <div class="left-bar">
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class RecordListItem extends Vue {
    @Prop({default: 0}) readonly type!: number; // 0 标示普通；1 是三级；2 是二级；3 是一级
    typeClassName = {
      '0': 'regular',
      '1': 'third',
      '2': 'second',
      '3': 'first'
    };
  }
</script>

<style lang="scss" scoped>
  .record-item-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  $bg-color: #DDDDDD;

  .regular {
    background-color: #FFFFFF;
    font-size: 15px;
    color: #333333;
    padding: 4px 20px;
  }

  .first {
    background-color: darken($bg-color, 16%);;
    font-size: 18px;
    font-weight: bold;
    color: #222222;
    padding: 8px 16px;
  }

  .second {
    background-color: darken($bg-color, 8%);;
    font-size: 16px;
    font-weight: bold;
    color: #222222;
    padding: 4px 16px;
  }

  .third {
    background-color: $bg-color;
    font-size: 15px;
    font-weight: 400;
    color: #222222;
    padding: 4px 20px;
  }
</style>