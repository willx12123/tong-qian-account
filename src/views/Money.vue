<template>
  <div class="container">
    <Layout>
      <div>
        <div class="tags">
          <div class="current-tags">
            <div class="tag-item" v-for="item in currentTags">
              {{ item }}
            </div>
          </div>
          <div class="new-tag">
            <button>新增标签</button>
          </div>
        </div>
        <div class="notes">
          <label>
            <span class="notes-name">备注</span>
            <input type="text" placeholder="在这里输入备注" />
          </label>
        </div>
        <div class="types">
          <div class="selected">支出</div>
          <div>收入</div>
        </div>
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
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Money',
    data() {
      return {
        currentTags: ['买衣服', '吃饭', '房租', '零食', '打游戏', '买会员']
      };
    }
  };
</script>

<style lang="scss" scoped>
  .tags {
    width: 100%;
    padding: 8px 24px;
    margin: 8px 0;

    .current-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        margin-bottom: 8px;
        margin-right: 12px;
        padding: 3px 12px;
        border-radius: 24px;
        background-color: #DDDDDD;

        font-size: 13px;
        color: #333333;
      }
    }

    .new-tag {
      button {
        color: #666666;
        padding: 0 4px;
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #666666;
      }

      button:focus {
        outline: none;
      }
    }

    .notes {
      width: 100%;
      display: flex;
    }
  }

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

  .types {
    width: 100%;
    display: flex;

    > div {
      height: 56px;
      width: 50%;
      background-color: #C4C4C4;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 20px;
      color: #222222;

      border-bottom: 4px solid transparent;
      transition: 0.3s;
    }

    .selected {
      border-bottom: 4px solid #333333;
    }
  }

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