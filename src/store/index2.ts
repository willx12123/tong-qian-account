import { recordListModel, tagsListModel } from '@/model';

const store: Sttt = {
  recordList: recordListModel.fetch(),
  createRecord(record) {
    recordListModel.create(record);
  },
  tagList: tagsListModel.fetch(),
  createTag(name) {
    if (name) {
      try {
        tagsListModel.create(name);
      } catch (e) {
        if (e.message === 'duplicated') {
          alert('请勿添加重复标签');
        }
      }
    }
  },
  getTag(id) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  removeTag(id) {
    tagsListModel.remove(id);
  },
  updateTag(id, name) {
    try {
      tagsListModel.update(id, name);
    } catch (e) {
      if (e.message === 'Repeat') {
        alert('与已有标签重复');
      }
    }
  }
};

export default store;