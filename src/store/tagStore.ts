import createId from '@/lib/idCreator';

const localStorageTagsListKeyName = 'tagsList';
let data: TagItem[] | undefined = undefined;

function fetchTagList(): TagItem[] {
  data = JSON.parse(
    window.localStorage.getItem(localStorageTagsListKeyName) || '[]'
  ) as TagItem[];
  return data;
}

function saveTagList() {
  window.localStorage.setItem(
    localStorageTagsListKeyName,
    JSON.stringify(data)
  );
}

export default {
  tagList: fetchTagList(),
  getTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag(name: string) {
    if (name) {
      const id = createId();
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) !== -1) {
        alert('请勿添加重复标签');
        return;
      }
      this.tagList.push({
        id: id.toString(),
        name
      });
      saveTagList();
      return name;
    }
  },
  removeTag(id: string) {
    if (!data) {
      throw new Error('Not fetch tagList data yet.');
    }
    let index: number = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    saveTagList();
  },
  updateTag(id: string, name: string) {
    if (name === '') {
      alert('不可使用空的标签名');
      return;
    }
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) !== -1) {
      const names = this.tagList.map((item => item.name));
      if (names.indexOf(name) !== -1) {
        alert('与已有标签重复');
      } else {
        const target = this.tagList.filter(item => item.id === id)[0];
        target.name = name;
        saveTagList();
      }
    } else {
      throw new Error('Not found this id');
    }
  }
};