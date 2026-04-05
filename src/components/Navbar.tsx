import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Persistly" className="h-9 w-9" />
          <span className="text-xl font-bold text-foreground">Persistly</span>
        </Link>
        <div className="flex items-center gap-1">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/add", label: "Add Task" },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive(path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
