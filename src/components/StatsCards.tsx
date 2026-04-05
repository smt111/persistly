import { CheckCircle2, Clock, ListTodo, Plus } from "lucide-react";

interface StatsProps {
  total: number;
  completed: number;
  pending: number;
  todayAdded: number;
}

const StatsCards = ({ total, completed, pending, todayAdded }: StatsProps) => {
  const cards = [
    { label: "Total Tasks", value: total, icon: ListTodo, className: "gradient-primary text-primary-foreground" },
    { label: "Completed", value: completed, icon: CheckCircle2, className: "bg-success text-success-foreground" },
    { label: "Pending", value: pending, icon: Clock, className: "gradient-gold text-secondary-foreground" },
    { label: "Added Today", value: todayAdded, icon: Plus, className: "bg-card text-foreground border" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, className }) => (
        <div key={label} className={`rounded-xl p-5 shadow-card ${className}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{label}</p>
              <p className="mt-1 text-3xl font-bold">{value}</p>
            </div>
            <Icon className="h-8 w-8 opacity-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
