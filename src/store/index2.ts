import { recordListModel, tagsListModel } from '@/model';

const store: Sttt = {
  recordList: recordListModel.fetch(),
  updateRecordList() {
    this.recordList = recordListModel.fetch();
  },
  createRecord(record) {
    recordListModel.create(record);
    this.updateRecordList();
  },
  tagList: tagsListModel.fetch(),
  updateTagList() {
    this.tagList = tagsListModel.fetch();
  },
  createTag(name) {
    if (name) {
      try {
        tagsListModel.create(name);
        this.updateTagList();
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
    this.updateTagList();
  },
  updateTag(id, name) {
    try {
      tagsListModel.update(id, name);
      this.updateTagList();
    } catch (e) {
      if (e.message === 'Repeat') {
        alert('与已有标签重复');
      } else if (e.message === 'Empty') {
        alert('请输入至少一个字符');
      }
    }
  }
};

export default store;