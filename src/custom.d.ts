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

interface TabItem {
  text: string
  value: number
}

interface RecordHashTable {
  [key: string]: YearItem
}

interface YearItem {
  [key: string]: MonthItem
}

interface MonthItem {
  [key: string]: RecordItem[]
}
