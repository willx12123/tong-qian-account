<template>
  <div class="types">
    <ul class="tabs">
      <li v-for="item in dataSource"
          :key="item.value"
          :class="{[classPrefix + '-item']: classPrefix, selected: type === item.value}"
          @click="select(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Tabs extends Vue {
    @Prop({required: true, type: Array}) dataSource!: TabItem[];
    @Prop({default: 0}) readonly type!: number; // 0表示支出，1表示收入
    @Prop(String) readonly classPrefix?: string;

    select(item: TabItem) {
      this.$emit('update:type', item.value);
    }
  }
</script>

<style lang="scss" scoped>
  .tabs {
    width: 100%;
    display: flex;
    box-shadow: 2px 0 3px #C4C4C4;

    > li {
      height: 44px;
      width: 50%;
      background-color: #C4C4C4;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 16px;
      color: #222222;

      border: none;
      border-bottom: 3px solid transparent;
      border-top: 3px solid transparent;
    }

    .selected {
      border-bottom: 3px solid #333333;
    }
  }
</style>