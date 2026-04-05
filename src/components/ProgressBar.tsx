interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl bg-card p-5 shadow-card border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">Overall Progress</span>
        <span className="text-sm font-bold text-primary">{completed}/{total} tasks</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full gradient-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground text-right">{pct}% complete</p>
    </div>
  );
};

export default ProgressBar;
