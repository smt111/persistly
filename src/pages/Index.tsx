import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import ProgressBar from "@/components/ProgressBar";
import TaskCard from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import { getTasks, updateTask, deleteTask as removeTask, getStats, Task, Status } from "@/lib/taskStore";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      toast({ title: "Error loading tasks", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const toggleComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus: Status = task.status === "done" ? "todo" : "done";
    await updateTask(id, { status: newStatus, completed_at: newStatus === "done" ? new Date().toISOString() : null });
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: newStatus, completed_at: newStatus === "done" ? new Date().toISOString() : null } : t));
  };

  const handleDelete = async (id: string) => {
    await removeTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const togglePin = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await updateTask(id, { pinned: !task.pinned });
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, pinned: !t.pinned } : t));
  };

  const changeStatus = async (id: string, status: Status) => {
    await updateTask(id, { status, completed_at: status === "done" ? new Date().toISOString() : null });
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status, completed_at: status === "done" ? new Date().toISOString() : null } : t));
  };

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q) || t.category.includes(q));
    }
    if (statusFilter !== "all") result = result.filter((t) => t.status === statusFilter);
    if (priorityFilter !== "all") result = result.filter((t) => t.priority === priorityFilter);
    if (categoryFilter !== "all") result = result.filter((t) => t.category === categoryFilter);
    return result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [tasks, search, statusFilter, priorityFilter, categoryFilter]);

  const stats = getStats(tasks);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your tasks and stay productive</p>
        </div>
        <StatsCards {...stats} />
        <ProgressBar completed={stats.completed} total={stats.total} />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Your Tasks</h2>
          <TaskFilters
            search={search} onSearchChange={setSearch}
            statusFilter={statusFilter} onStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter} onPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter} onCategoryFilter={setCategoryFilter}
          />
          {loading ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-lg font-medium text-muted-foreground">Loading tasks...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-lg font-medium text-muted-foreground">No tasks found</p>
              <p className="text-sm text-muted-foreground mt-1">Add a task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onDelete={handleDelete}
                  onTogglePin={togglePin}
                  onStatusChange={changeStatus}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
