<template>
  <div class="types">
    <div :class="type===0 && 'selected'"
         @click="selectType(0)"
    >
      支出
    </div>
    <div :class="type===1 && 'selected'"
         @click="selectType(1)"
    >
      收入
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop(Number) readonly type: number | undefined; // 0表示支出，1表示收入
    selectType(type: number) {
      this.$emit('update:type', type);
    }
  }
</script>

<style lang="scss" scoped>
  .types {
    width: 100%;
    display: flex;

    > div {
      height: 44px;
      width: 50%;
      background-color: #C4C4C4;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 16px;
      color: #222222;

      border-bottom: 3px solid transparent;
      border-top: 3px solid transparent;
    }

    .selected {
      border-bottom: 3px solid #333333;
    }
  }
</style>