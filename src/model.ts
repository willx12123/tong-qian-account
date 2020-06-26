import createId from '@/lib/idCreator';
import clone from '@/lib/clone';

const localStorageRecordListKeyName = 'recordList';
const localStorageTagsListKeyName = 'tagsList';

export const recordListModel: RecordListModel = {
  data: [] as RecordItem[],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageRecordListKeyName) || '[]'
    );
    return this.data;
  },
  create(record: RecordItem) {
    record.createAt = new Date();
    const newRecord = clone(record);
    this.data.push(newRecord);
    this.save();
  },
  save() {
    window.localStorage.setItem(
      localStorageRecordListKeyName,
      JSON.stringify(this.data)
    );
  }
};

export const tagsListModel: TagsListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(
      window.localStorage.getItem(localStorageTagsListKeyName) || '[]'
    );
    return this.data;
  },
  save() {
    window.localStorage.setItem(
      localStorageTagsListKeyName,
      JSON.stringify(this.data)
    );
  },
  create(name) {
    const id = createId();
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) !== -1) {
      throw new Error('duplicated');
    }
    this.data.push({
      id: id.toString(),
      name
    });
    this.save();
    return name;
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) !== -1) {
      const names = this.data.map((item => item.name));
      if (names.indexOf(name) !== -1) {
        throw new Error('Repeat');
      } else {
        const target = this.data.filter(item => item.id === id)[0];
        target.name = name;
        console.log(target);
        this.save();
      }
    } else {
      throw new Error('NotFound');
    }
  },
  remove(id) {
    this.data = this.data.filter(item => item.id !== id);
    this.save();
  }
};