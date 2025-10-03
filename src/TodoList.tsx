import type { Todo } from './types'

type Props = {
  todos: Todo[]
  onDelete: (id: string) => void
  onToggle: (id: string, done: boolean) => void
}

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString()
  } catch {
    return d
  }
}

export default function TodoList({ todos, onDelete, onToggle }: Props) {
  if (todos.length === 0) return <p>Aucune tâche pour le moment.</p>
  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <li key={t.id} className="todo-item">
          <div className="todo-main">
            <input
              type="checkbox"
              checked={!!t.done}
              onChange={(e) => onToggle(t.id, e.target.checked)}
              aria-label={t.done ? `Marquer ${t.title} comme à faire` : `Marquer ${t.title} comme faite`}
            />
            <div>
              <div className={`todo-title ${t.done ? 'done' : ''}`}>{t.title}</div>
              {t.description && <div className="todo-desc">{t.description}</div>}
              <div className="todo-meta">{t.dueDate ? `Échéance: ${formatDate(t.dueDate)}` : ''}</div>
            </div>
          </div>
          <div className="todo-actions">
            <button onClick={() => onDelete(t.id)} aria-label={`Supprimer ${t.title}`}>
              Supprimer
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
