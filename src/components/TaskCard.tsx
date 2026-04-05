import { Task, Priority, Status } from "@/lib/taskStore";
import { Check, Trash2, Pin, Clock } from "lucide-react";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: "🔴 High", className: "bg-destructive/10 text-destructive" },
  medium: { label: "🟡 Medium", className: "bg-warning/10 text-warning" },
  low: { label: "🟢 Low", className: "bg-success/10 text-success" },
};

const statusConfig: Record<Status, { label: string; className: string }> = {
  todo: { label: "To Do", className: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", className: "bg-primary/10 text-primary" },
  done: { label: "Done", className: "bg-success/10 text-success" },
};

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

const TaskCard = ({ task, onToggleComplete, onDelete, onTogglePin, onStatusChange }: TaskCardProps) => {
  const isDone = task.status === "done";
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const isOverdue = deadline && deadline < new Date() && !isDone;

  return (
    <div className={`group rounded-xl border bg-card p-4 shadow-card transition-all hover:shadow-elevated ${isDone ? "opacity-60" : ""} ${task.pinned ? "ring-2 ring-accent" : ""}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isDone ? "border-success bg-success text-success-foreground" : "border-muted-foreground/30 hover:border-primary"}`}
        >
          {isDone && <Check className="h-3 w-3" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</h3>
            {task.pinned && <Pin className="h-3.5 w-3.5 text-accent" />}
          </div>
          {task.description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityConfig[task.priority].className}`}>
              {priorityConfig[task.priority].label}
            </span>
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Status)}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 cursor-pointer ${statusConfig[task.status].className}`}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground capitalize">
              {task.category}
            </span>
            {deadline && (
              <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${isOverdue ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                <Clock className="h-3 w-3" />
                {deadline.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={() => onTogglePin(task.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-accent" title="Pin">
            <Pin className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
