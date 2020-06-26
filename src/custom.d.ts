interface RecordItem {
  tags: string[]
  notes: string
  type: number
  amount: number
  createAt?: Date
}

interface TagItem {
  id: string
  name: string
}

interface RecordListModel {
  data: RecordItem[]
  fetch: () => RecordItem[]
  save: () => void
  create: (record: RecordItem) => void
}

interface TagsListModel {
  data: TagItem[]
  fetch: () => TagItem[]
  save: () => void
  create: (name: string) => string
  update: (id: string, name: string) => void
  remove: (id: string) => void
}

interface Window {
  tagList: TagItem[]
  createTag: (name: string) => void
}