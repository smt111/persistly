import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { addTask, Priority, Category } from "@/lib/taskStore";
import { useToast } from "@/hooks/use-toast";

const steps = ["Title & Description", "Category & Priority", "Deadline"];

const AddTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("homework");
  const [priority, setPriority] = useState<Priority>("medium");
  const [deadline, setDeadline] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canNext = step === 0 ? title.trim().length > 0 : true;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await addTask({ title, description, category, priority, deadline: deadline || undefined, status: "todo" });
      toast({ title: "Task added!", description: `"${title}" has been created.` });
      navigate("/");
    } catch (err) {
      toast({ title: "Error creating task", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full rounded-lg border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const priorityOptions: { value: Priority; label: string; emoji: string }[] = [
    { value: "high", label: "High", emoji: "🔴" },
    { value: "medium", label: "Medium", emoji: "🟡" },
    { value: "low", label: "Low", emoji: "🟢" },
  ];
  const categories: Category[] = ["homework", "study", "project", "exam", "personal", "other"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-xl px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Add New Task</h1>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${i <= step ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`h-0.5 w-8 ${i < step ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-card space-y-4">
          {step === 0 && (
            <>
              <label className="text-sm font-medium text-foreground">Title *</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Finish math homework" className={inputClass} autoFocus />
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details..." rows={3} className={inputClass} />
            </>
          )}
          {step === 1 && (
            <>
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((c) => (
                  <button key={c} onClick={() => setCategory(c)} className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${category === c ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                    {c}
                  </button>
                ))}
              </div>
              <label className="text-sm font-medium text-foreground mt-4 block">Priority</label>
              <div className="flex gap-2">
                {priorityOptions.map(({ value, label, emoji }) => (
                  <button key={value} onClick={() => setPriority(value)} className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${priority === value ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
                    {emoji} {label}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <label className="text-sm font-medium text-foreground">Deadline (optional)</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass} />
            </>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={() => step > 0 ? setStep(step - 1) : navigate("/")} className="rounded-lg border px-6 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            {step === 0 ? "Cancel" : "Back"}
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} disabled={!canNext} className="rounded-lg gradient-primary px-6 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-40 transition-opacity">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="rounded-lg gradient-primary px-6 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-40">
              {submitting ? "Creating..." : "Create Task"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddTask;
