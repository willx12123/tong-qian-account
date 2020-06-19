<template>
  <div class="number-pad">
    <div class="current-money">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>*</button>
      <button id="ok">OK</button>
      <button>0</button>
      <button>.</button>
      <button>%</button>
      <button>/</button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NumberPad'
  };
</script>

<style lang="scss" scoped>
  .number-pad {
    .current-money {
      width: 100%;
      padding: 12px 24px;

      font-size: 32px;
      font-weight: bold;
      font-family: "Courier New", monospace;
      text-align: right;
    }

    .buttons {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(5, 20%);
      grid-template-rows: repeat(4, 64px);

      button {
        background-color: transparent;
        border: none;
        font-size: 16px;
        border-radius: 0;
      }

      $bg-color: #F2F2F2;

      button:nth-child(1) {
        background-color: $bg-color;
      }

      button:nth-child(2),
      button:nth-child(6) {
        background-color: darken($bg-color, 4%);
      }

      button:nth-child(3),
      button:nth-child(7),
      button:nth-child(11) {
        background-color: darken($bg-color, 8%);
      }

      button:nth-child(4),
      button:nth-child(8),
      button:nth-child(12),
      button:nth-child(16) {
        background-color: darken($bg-color, 12%);
      }

      button:nth-child(5),
      button:nth-child(9),
      button:nth-child(13),
      button:nth-child(17) {
        background-color: darken($bg-color, 16%);
      }

      button:nth-child(10),
      button:nth-child(14),
      button:nth-child(18) {
        background-color: darken($bg-color, 20%);
      }

      button:nth-child(15) {
        background-color: darken($bg-color, 28%);
      }

      button:nth-child(19) {
        background-color: darken($bg-color, 24%);
      }

      #ok {
        grid-column-start: 5;
        grid-column-end: 6;
        grid-row-start: 3;
        grid-row-end: 5;
      }
    }
  }
</style>