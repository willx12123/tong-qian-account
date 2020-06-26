<template>
  <Layout>
    <div class="edit-container">
      <div class="back-bar">
        <Icon name="left" @click.native="goBack" />
        <div>编辑标签</div>
        <div class="right"></div>
      </div>
      <FormInputItem :value="tag.name"
                     field-name="标签名"
                     placeholder="请输入新标签名"
                     @update:value="editTag"
      />
      <div class="delete-btn-container">
        <DefaultButton button-name="删除标签" @click.native="removeTag" />
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
    tag?: { id: string, name: string } = undefined;

    created() {
      const id = this.$route.params.id;
      tagsListModel.fetch();
      const tagsList = tagsListModel.data;
      const tag = tagsList.filter(t => t.id === id)[0];
      if (tag) {
        this.tag = tag;
      } else {
        this.$router.replace('/404');
      }
    }

    goBack() {
      this.$router.replace('/labels');
    }

    editTag(name: string) {
      if (this.tag) {
        try {
          tagsListModel.update(this.tag.id, name);
        } catch (e) {
          if (e.message === 'Repeat') {
            alert('与已有标签重复');
          }
        }
      }
    }

    removeTag() {
      if (this.tag) {
        tagsListModel.remove(this.tag.id);
        this.$router.replace('/labels');
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