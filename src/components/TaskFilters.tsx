import { Search } from "lucide-react";

interface FiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusFilter: (v: string) => void;
  priorityFilter: string;
  onPriorityFilter: (v: string) => void;
  categoryFilter: string;
  onCategoryFilter: (v: string) => void;
}

const TaskFilters = ({
  search, onSearchChange,
  statusFilter, onStatusFilter,
  priorityFilter, onPriorityFilter,
  categoryFilter, onCategoryFilter,
}: FiltersProps) => {
  const selectClass = "rounded-lg border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border bg-card py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <select value={statusFilter} onChange={(e) => onStatusFilter(e.target.value)} className={selectClass}>
        <option value="all">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select value={priorityFilter} onChange={(e) => onPriorityFilter(e.target.value)} className={selectClass}>
        <option value="all">All Priority</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>
      <select value={categoryFilter} onChange={(e) => onCategoryFilter(e.target.value)} className={selectClass}>
        <option value="all">All Categories</option>
        <option value="homework">Homework</option>
        <option value="study">Study</option>
        <option value="project">Project</option>
        <option value="exam">Exam</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default TaskFilters;
