<template>
  <Layout>
    <div class="label">
      <div>
        <router-link class="item"
                     v-for="item in tagsList"
                     :key="item.id"
                     :to="`/labels/edit/${item.id}`"
        >
          <span>{{ item.name }}</span>
          <Icon name="right" />
        </router-link>
      </div>
      <div class="add-label">
        <DefaultButton @click.native="createTag" button-name="新建标签" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import DefaultButton from '@/components/DefaultButton.vue';

  @Component({
    components: {DefaultButton}
  })
  export default class Labels extends Vue {
    tagsList: TagItem[] = window.tagList;

    createTag() {
      const name = window.prompt('请输入新的标签名');
      if (name) {
        window.createTag(name);
      } else {
        alert('请输入至少一个字符');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .label {
    width: 100%;
    height: 100%;
    background-color: #EEEEEE;

    div > .item {
      width: 100%;
      padding: 8px 24px;
      border-bottom: 1px solid #CFCFCF;
      background-color: #FFFFFF;

      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 15px;
      color: #333333;
    }
  }

  .add-label {
    width: 100%;
    padding: 24px;
    display: flex;
    justify-content: center;

    button {
      padding: 4px 16px;
      border: none;

      font-size: 16px;
      background-color: #878787;
      color: #FFFFFF;
    }
  }
</style>