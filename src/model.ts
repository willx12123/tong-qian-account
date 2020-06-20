const localStorageKeyName = 'recordList';
export const model = {
  fetch(): RecordItem[] {
    return JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || '[]'
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};