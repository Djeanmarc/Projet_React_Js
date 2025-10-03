import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import type { Todo } from './types'

const STORAGE_KEY = 'tp2:tasks'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  function handleAdd(t: Todo) {
    setTodos((s) => [t, ...s])
  }

  function handleDelete(id: string) {
    setTodos((s) => s.filter((t) => t.id !== id))
  }

  function handleToggle(id: string, done: boolean) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done } : t)))
  }

  const total = todos.length
  const doneCount = todos.filter((t) => t.done).length
  const todoCount = total - doneCount

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Todo minimal (React + Vite)</h1>

      <div className="card">
        <TodoForm onAdd={handleAdd} />
      </div>

      <div className="card">
        <div className="summary">{`${todoCount} à faire / ${doneCount} faites`}</div>
        <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
      </div>
    </div>
  )
}

export default App
