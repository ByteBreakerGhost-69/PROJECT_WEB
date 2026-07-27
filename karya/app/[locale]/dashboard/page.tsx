'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/lib/i18n/navigation';
import { getCurrentUser, clearSession } from '@/lib/local-auth';

interface Task {
  id: string;
  text: string;
  column: 'todo' | 'doing' | 'done';
}

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.replace('/');
      return;
    }
    setName(user.name);

    try {
      const raw = localStorage.getItem('karya_tasks_v1');
      setTasks(raw ? JSON.parse(raw) : []);
    } catch {
      setTasks([]);
    }
  }, [router]);

  const done = tasks.filter((task) => task.column === 'done').length;
  const readingProgress = Math.min(100, done * 20 + 15); // placeholder heuristic

  function handleLogout() {
    clearSession();
    router.replace('/');
  }

  if (!name) return null;

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-charcoal">
          {t('welcome')}, {name}
        </h1>
        <button onClick={handleLogout} className="hand-underline text-sm font-semibold text-charcoal">
          {tNav('logout')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-charcoal/10 bg-white/60 p-6">
          <p className="mb-2 text-sm font-semibold text-charcoal/60">
            {t('readingProgress')}
          </p>
          <div className="h-3 w-full rounded-full bg-sage/20">
            <div
              className="h-3 rounded-full bg-sage transition-all"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal/10 bg-white/60 p-6">
          <p className="mb-3 text-sm font-semibold text-charcoal/60">{t('savedTasks')}</p>
          <ul className="flex flex-col gap-2">
            {tasks.length === 0 && (
              <li className="text-sm text-charcoal/40">Belum ada task tersimpan.</li>
            )}
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between text-sm">
                <span>{task.text}</span>
                <span className="rounded-full bg-sage/15 px-2 py-0.5 text-xs text-sage-700">
                  {task.column}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
