<template>
  <div class="notes">
    <label>
      <span class="notes-name">{{ fieldName }}</span>
      <input type="text" :placeholder="placeholder" :value="value"
             @input="handleNotesChange"
      />
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component
  export default class FormInputItem extends Vue {
    @Prop(String) readonly value: string | undefined;
    @Prop({default: '备注'}) readonly fieldName!: string;
    @Prop({default: '在此处输入'}) readonly placeholder!: string;

    handleNotesChange(e: InputEvent) {
      const input = e.target as HTMLInputElement;
      this.$emit('update:value', input.value);
    }
  };
</script>

<style lang="scss" scoped>
  .notes {
    width: 100%;
    padding: 0 24px;
    background-color: #EEEEEE;

    label {
      display: flex;
      align-items: center;

      .notes-name {
        font-size: 14px;
        color: #333333;
        margin-right: 8px;
      }

      input {
        height: 48px;
        padding: 3px 8px;
        background-color: transparent;
        border: none;

        font-size: 14px;
        color: #333333;

        flex-grow: 1;
      }
    }
  }
</style>