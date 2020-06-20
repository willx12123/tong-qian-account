<template>
  <Layout>
    <div class="label-container">
      <ol>
        <li v-for="item in tagsList" :key="item">
          <span>{{ item }}</span>
          <Icon name="right" />
        </li>
      </ol>
      <div class="add-label">
        <button @click="createTag">新建标签</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import { tagsListModel } from '@/model';

  const localTagsList = tagsListModel.fetch();

  @Component
  export default class Labels extends Vue {
    tagsList = tagsListModel.data;

    createTag() {
      const name = window.prompt('请输入新的标签名');
      if (name) {
        try {
          tagsListModel.create(name);
        } catch (e) {
          if (e.message === 'duplicated') {
            alert('请勿添加重复标签');
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .label-container {
    width: 100%;
    height: 100%;
    background-color: #EEEEEE;

    ol > li {
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