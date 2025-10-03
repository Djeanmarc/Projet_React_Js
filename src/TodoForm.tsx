import { useState } from 'react'
import type { Todo } from './types'
import { useTodos } from './TodoContext'

const todayISO = () => new Date().toISOString().slice(0, 10)

export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {},
  )
  const { addTodo } = useTodos()

  function validate() {
    const e: { title?: string; dueDate?: string } = {}
    if (!title || title.trim().length < 3) {
      e.title = 'Le titre est obligatoire (au moins 3 caractères).'
    }
    if (dueDate) {
      // simple lexical compare on YYYY-MM-DD
      if (dueDate < todayISO()) {
        e.dueDate = "L'échéance doit être aujourd'hui ou ultérieure."
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    const todo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      createdAt: new Date().toISOString(),
    }
  addTodo(todo)
    setTitle('')
    setDescription('')
    setDueDate('')
    setErrors({})
  }

  return (
    <form onSubmit={onSubmit} aria-describedby={errors.title ? 'title-error' : undefined}>
      <div className="field">
        <label htmlFor="title">Titre *</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <div id="title-error" className="error" role="alert">
            {errors.title}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="dueDate">Échéance</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-invalid={!!errors.dueDate}
          aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
        />
        {errors.dueDate && (
          <div id="dueDate-error" className="error" role="alert">
            {errors.dueDate}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="actions">
        <button type="submit" disabled={!title.trim()}>
          Ajouter
        </button>
      </div>
    </form>
  )
}
