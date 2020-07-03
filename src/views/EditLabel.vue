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

  import FormInputItem from '@/components/FormInputItem.vue';
  import DefaultButton from '@/components/DefaultButton.vue';

  @Component({
    components: {DefaultButton, FormInputItem}
  })
  export default class EditLabel extends Vue {
    tag?: TagItem = undefined;

    created() {
      const tagList: TagItem[] = this.$store.state.tagList;
      this.tag = tagList.filter(t => t.id === this.$route.params.id)[0];
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    goBack() {
      this.$router.replace('/labels');
    }

    editTag(name: string) {
      if (this.tag) {
        const id = this.tag.id;
        this.$store.commit('updateTag', {id, name});
      }
    }

    removeTag() {
      if (this.tag) {
        this.$store.commit('removeTag', this.tag.id);
      }
      this.$router.replace('/labels');
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