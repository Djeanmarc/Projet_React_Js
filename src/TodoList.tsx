import React from 'react'
import type { Todo } from './types'
import { useTodos } from './TodoContext'

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
  }
}
const TodoItem = React.memo(function TodoItem({
  t,
  onDelete,
  onToggle,
}: {
  t: Todo
  onDelete: (id: string) => void
  onToggle: (id: string, done: boolean) => void
}) {
  const checkboxId = `chk-${t.id}`
  return (
    <li className="todo-item">
      <div className="todo-main">
        <input
          id={checkboxId}
          type="checkbox"
          checked={!!t.done}
          onChange={(e) => onToggle(t.id, e.target.checked)}
        />
        <label htmlFor={checkboxId} className="todo-content">
          <div className={`todo-title ${t.done ? 'done' : ''}`}>{t.title}</div>
          {t.description && <div className="todo-desc">{t.description}</div>}
          <div className="todo-meta">{t.dueDate ? `Échéance: ${formatDate(t.dueDate)}` : ''}</div>
        </label>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => {
            const ok = window.confirm(`Supprimer la tâche "${t.title}" ?`)
            if (ok) onDelete(t.id)
          }}
          aria-label={`Supprimer ${t.title}`}>
          Supprimer
        </button>
      </div>
    </li>
  )
})

export default function TodoList() {
  const { todos, removeTodo, toggleTodo } = useTodos()
  if (todos.length === 0) return <p>Aucune tâche pour le moment.</p>
  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((t) => (
        <TodoItem key={t.id} t={t} onDelete={removeTodo} onToggle={toggleTodo} />
      ))}
    </ul>
  )
}
