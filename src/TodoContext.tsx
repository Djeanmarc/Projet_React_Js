import React, { createContext, useContext, useEffect, useState } from 'react'
import type { Todo } from './types'

const STORAGE_KEY = 'tp2:tasks'

type TodosContextValue = {
  todos: Todo[]
  addTodo: (t: Todo) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string, done: boolean) => void
  updateTodo: (id: string, fields: Partial<Todo>) => void
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined)

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // ignore storage errors
    }
  }, [todos])

  const addTodo = (t: Todo) => setTodos((s) => [t, ...s])
  const removeTodo = (id: string) => setTodos((s) => s.filter((t) => t.id !== id))
  const toggleTodo = (id: string, done: boolean) => setTodos((s) => s.map((t) => (t.id === id ? { ...t, done } : t)))
  const updateTodo = (id: string, fields: Partial<Todo>) => setTodos((s) => s.map((t) => (t.id === id ? { ...t, ...fields } : t)))

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo, updateTodo }}>
      {children}
    </TodosContext.Provider>
  )
}

export function useTodos() {
  const ctx = useContext(TodosContext)
  if (!ctx) throw new Error('useTodos must be used within a TodoProvider')
  return ctx
}

export default TodoProvider
