const localStorageRecordListKeyName = 'recordList';
const localStorageTagsListKeyName = 'tagsList';

interface TagsListModel {
  data: string[]
  fetch: () => string[]
  save: () => void
  create: (name: string) => string
}

export const recordListModel = {
  fetch(): RecordItem[] {
    return JSON.parse(
      window.localStorage.getItem(localStorageRecordListKeyName) || '[]'
    );
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(
      localStorageRecordListKeyName,
      JSON.stringify(data)
    );
  }
};

export const tagsListModel: TagsListModel = {
  data: [],
  fetch(): string[] {
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
    if (this.data.indexOf(name) !== -1) {
      throw new Error('duplicated');
    }
    this.data.push(name);
    this.save();
    return name;
  }
};