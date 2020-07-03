import clone from '@/lib/clone';

const localStorageRecordListKeyName = 'recordList';

let data: RecordItem[] | undefined = undefined;

function fetchRecordList(): RecordItem[] {
  data = JSON.parse(
    window.localStorage.getItem(localStorageRecordListKeyName) || '[]'
  ) as RecordItem[];
  return data;
}

function saveRecordList() {
  window.localStorage.setItem(
    localStorageRecordListKeyName,
    JSON.stringify(data)
  );
}

export default {
  recordList: fetchRecordList(),
  createRecord(record: RecordItem) {
    record.createAt = new Date();
    const newRecord = clone(record);
    this.recordList.push(newRecord);
    saveRecordList();
  }
};