<template>
  <div class="notes">
    <label>
      <span class="notes-name">备注</span>
      <input type="text" placeholder="在这里输入备注" />
    </label>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Notes'
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