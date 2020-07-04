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

interface StatisticHashTable {
  [key: string]: HashYear
}

interface YearItem {
  [key: string]: MonthItem[]
}

interface HashYear {
  [key: string]: HashMonth
}

interface MonthItem {
  [key: string]: DayItem[]
}

interface HashMonth {
  [key: string]: RecordItem[]
}

interface DayItem {
  [key: string]: RecordItem[]
}