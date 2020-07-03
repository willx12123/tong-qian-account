<template>
  <div class="tags">
    <div @click="select" class="current-tags">
      <div class="tag-item"
           v-for="item in tagList"
           :key="item.id"
           :class="selectedTags.indexOf(item.name) !== -1 ? 'selected' : ''"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="new-tag">
      <button @click="createNewTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';

  @Component({
    computed: {
      tagList() {
        return this.$store.state.tagList;
      }
    }
  })
  export default class Tags extends Vue {
    @Prop({default: []}) readonly selectedTags!: string[];

    select(e: MouseEvent) {
      const button = e.target as HTMLBaseElement;
      if (button.classList.contains('tag-item')) {
        const text = button.textContent!;
        if (button.classList.contains('selected')) {
          const index = this.selectedTags.indexOf(text);
          const newArr = this.selectedTags
            .slice(0, index)
            .concat(this.selectedTags.slice(index + 1));
          this.$emit('update:selectedTags', newArr);
          button.classList.remove('selected');
        } else {
          this.$emit(
            'update:selectedTags',
            [...this.selectedTags, text]
          );
          button.classList.add('selected');
        }
      }
    }

    createNewTag() {
      const name = window.prompt('请输入新标签名');
      if (name) {
        this.$store.commit('createTag', name);
      } else {
        alert('请输入至少一个字符');
      }
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

    background-color: #FFFFFF;

    .current-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;

      $bg-color: #DDDDDD;

      .tag-item {
        margin-bottom: 8px;
        margin-right: 12px;
        padding: 3px 12px;
        border-radius: 24px;
        background-color: $bg-color;

        font-size: 13px;
        color: #333333;
      }

      .tag-item.selected {
        background-color: darken($bg-color, 40%);
        color: #EFEFEF;
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