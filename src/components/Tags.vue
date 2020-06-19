<template>
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
</template>

<script lang="ts">
  export default {
    name: 'Tags',
    data() {
      return {
        currentTags: [
          '买衣服',
          '吃饭',
          '房租',
          '零食',
          '打游戏',
          '买会员'
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  .tags {
    width: 100%;
    padding: 8px 24px;
    margin: 8px 0;

    flex-grow: 1;
    overflow: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .current-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;

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
        font-size: 16px;
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
  }
</style>