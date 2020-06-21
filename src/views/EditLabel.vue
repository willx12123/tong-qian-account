<template>
  <Layout>
    <div class="edit-container">
      <div class="back-bar">
        <Icon name="left" />
        <div>编辑标签</div>
        <div class="right"></div>
      </div>
      <FormInputItem field-name="标签名" placeholder="请输入新标签名" />
      <div class="delete-btn-container">
        <DefaultButton button-name="删除标签" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';

  import { tagsListModel } from '@/model';
  import FormInputItem from '@/components/FormInputItem.vue';
  import DefaultButton from '@/components/DefaultButton.vue';

  @Component({
    components: {DefaultButton, FormInputItem}
  })
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
    width: 100%;
    padding: 8px 24px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #222222;

    div {
      font-size: 15px;
    }

    .right {
      width: 1em;
      height: 1em;
    }
  }

  .delete-btn-container {
    width: 100%;
    margin: 32px 0;

    display: flex;
    justify-content: center;
  }
</style>