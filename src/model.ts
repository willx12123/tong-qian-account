const localStorageRecordListKeyName = 'recordList';
const localStorageTagsListKeyName = 'tagsList';

interface TagData {
  id: string
  name: string
}

interface TagsListModel {
  data: TagData[]
  fetch: () => TagData[]
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
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) !== -1) {
      throw new Error('duplicated');
    }
    this.data.push({
      id: name,
      name
    });
    this.save();
    return name;
  }
};