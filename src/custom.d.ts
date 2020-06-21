interface RecordItem {
  tags: string[]
  notes: string
  type: number
  amount: number
  createAt?: Date
}

interface TagData {
  id: string
  name: string
}

interface TagsListModel {
  data: TagData[]
  fetch: () => TagData[]
  save: () => void
  create: (name: string) => string
  update: (id: string, name: string) => void
  remove: (id: string) => void
}