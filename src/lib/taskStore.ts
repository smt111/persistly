import { supabase } from "@/integrations/supabase/client";

export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "in-progress" | "done";
export type Category = "homework" | "study" | "project" | "exam" | "personal" | "other";

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  priority: Priority;
  status: Status;
  category: Category;
  deadline?: string | null;
  created_at: string;
  completed_at?: string | null;
  pinned: boolean;
}

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as Task[];
}

export async function addTask(task: {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category: Category;
  deadline?: string;
}): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: task.title,
      description: task.description || null,
      priority: task.priority,
      status: task.status,
      category: task.category,
      deadline: task.deadline || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  const { error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);
  if (error) throw error;
}

export function getStats(tasks: Task[]) {
  const today = new Date().toDateString();
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "done").length,
    pending: tasks.filter((t) => t.status !== "done").length,
    todayAdded: tasks.filter((t) => new Date(t.created_at).toDateString() === today).length,
  };
}
