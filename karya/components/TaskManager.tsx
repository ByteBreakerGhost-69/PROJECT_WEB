'use client';

import { useEffect, useState, DragEvent } from 'react';
import { useTranslations } from 'next-intl';

type ColumnKey = 'todo' | 'doing' | 'done';

interface Task {
  id: string;
  text: string;
  column: ColumnKey;
}

const STORAGE_KEY = 'karya_tasks_v1';
const COLUMNS: ColumnKey[] = ['todo', 'doing', 'done'];

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export default function TaskManager() {
  const t = useTranslations('hero');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draft, setDraft] = useState('');
  const [dragId, setDragId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadTasks());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveTasks(tasks);
  }, [tasks, hydrated]);

  function addTask() {
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), text, column: 'todo' }]);
    setDraft('');
  }

  function moveTask(id: string, column: ColumnKey) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, column } : task)));
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function onDrop(e: DragEvent<HTMLDivElement>, column: ColumnKey) {
    e.preventDefault();
    if (dragId) moveTask(dragId, column);
    setDragId(null);
  }

  return (
    <div className="w-full rounded-2xl border border-charcoal/10 bg-white/60 p-4 shadow-sm backdrop-blur-sm md:p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t('taskPlaceholder')}
          aria-label={t('taskPlaceholder')}
          className="flex-1 rounded-lg border border-charcoal/15 bg-cream px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
        />
        <button
          type="submit"
          className="ink-spread rounded-lg bg-terracotta px-4 py-2 text-sm font-semibold text-cream transition"
        >
          +
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COLUMNS.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, col)}
            className="min-h-[120px] rounded-xl bg-sage/10 p-2"
          >
            <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide15 text-charcoal/60">
              {t(`columns.${col}`)}
            </p>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((task) => task.column === col)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDragId(task.id)}
                    tabIndex={0}
                    className="group cursor-grab rounded-lg border border-charcoal/10 bg-cream px-3 py-2 text-sm shadow-sm active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span>{task.text}</span>
                      <button
                        type="button"
                        aria-label="Hapus task"
                        onClick={() => removeTask(task.id)}
                        className="text-charcoal/30 opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
