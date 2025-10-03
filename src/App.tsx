import { useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { TodoProvider, useTodos } from './TodoContext'

function Content() {
  const { todos } = useTodos()
  const total = useMemo(() => todos.length, [todos])
  const doneCount = useMemo(() => todos.filter((t) => t.done).length, [todos])
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
        <TodoForm />
      </div>

      <div className="card">
        <div className="summary">{`${todoCount} à faire / ${doneCount} faites`}</div>
        <TodoList />
      </div>
    </div>
  )
}

function App() {
  return (
    <TodoProvider>
      <Content />
    </TodoProvider>
  )
}

export default App
