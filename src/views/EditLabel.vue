<template>
  <Layout>
    <div class="edit-container">
      <div class="back-bar">
        <Icon name="left" />
        <span>编辑标签</span>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { tagsListModel } from '@/model';

  @Component
  export default class EditLabel extends Vue {
    created() {
      const id = this.$route.params.id;
      tagsListModel.fetch();
      const tagsList = tagsListModel.data;
      const tag = tagsList.filter(t => t.id === id)[0];
      if (tag) {
        console.log(tag);
      } else {
        this.$router.replace('/404');
      }
    }
  }
</script>

<style lang="scss" scoped>

  .edit-container {
    width: 100%;
    height: 100%;
  }

  .back-bar {

  }
</style>