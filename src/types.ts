export interface Todo {
  id: string
  title: string
  description?: string
  dueDate?: string // ISO date (YYYY-MM-DD)
  done?: boolean
  createdAt: string
}
