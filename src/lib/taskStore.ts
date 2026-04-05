export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "in-progress" | "done";
export type Category = "homework" | "study" | "project" | "exam" | "personal" | "other";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category: Category;
  deadline?: string;
  createdAt: string;
  completedAt?: string;
  pinned?: boolean;
}

const STORAGE_KEY = "persistly_tasks";

export function getTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task: Omit<Task, "id" | "createdAt">): Task {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  tasks.unshift(newTask);
  saveTasks(tasks);
  return newTask;
}

export function updateTask(id: string, updates: Partial<Task>) {
  const tasks = getTasks().map((t) => (t.id === id ? { ...t, ...updates } : t));
  saveTasks(tasks);
}

export function deleteTask(id: string) {
  saveTasks(getTasks().filter((t) => t.id !== id));
}

export function getStats(tasks: Task[]) {
  const today = new Date().toDateString();
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "done").length,
    pending: tasks.filter((t) => t.status !== "done").length,
    todayAdded: tasks.filter((t) => new Date(t.createdAt).toDateString() === today).length,
  };
}
