import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';

const localStorageRecordListKeyName = 'recordList';
const localStorageTagsListKeyName = 'tagsList';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as TagItem[]
  },
  mutations: {
    fetchRecordList(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem(localStorageRecordListKeyName) || '[]'
      ) as RecordItem[];
    },
    saveRecordList(state) {
      window.localStorage.setItem(
        localStorageRecordListKeyName,
        JSON.stringify(state.recordList)
      );
    },
    createRecord(state, record: RecordItem) {
      record.createAt = new Date();
      const newRecord = clone(record);
      if (newRecord.tags.length === 0) {
        newRecord.tags.push('无');
      }
      state.recordList.push(newRecord);
      store.commit('saveRecordList');
    },
    fetchTagList(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem(localStorageTagsListKeyName) || '[]'
      ) as TagItem[];
      if (state.tagList.length === 0) {
        const defaultTags = ['交通', '餐饮', '房租', '买衣服'];
        for (const item of defaultTags) {
          store.commit('createTag', item);
        }
      }
    },
    saveTagList(state) {
      window.localStorage.setItem(
        localStorageTagsListKeyName,
        JSON.stringify(state.tagList)
      );
    },
    createTag(state, name: string) {
      if (name) {
        const id = createId();
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) !== -1) {
          alert('请勿添加重复标签');
          return;
        }
        state.tagList.push({
          id: id.toString(),
          name
        });
        store.commit('saveTagList');
        return name;
      }
    },
    updateTag(state, tag: { id: string, name: string }) {
      const {id, name} = tag;
      if (name === '') {
        alert('不可使用空的标签名');
      } else {
        const names = state.tagList.map((item => item.name));
        if (names.indexOf(name) !== -1) {
          alert('与已有标签重复');
        } else {
          const target = state.tagList.filter(item => item.id === id)[0];
          target.name = name;
          store.commit('saveTagList');
        }
      }
    },
    removeTag(state, id: string) {
      let index: number = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTagList');
    }
  },
  actions: {},
  modules: {}
});

export default store;