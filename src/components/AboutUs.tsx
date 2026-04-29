import { Users, Code2, Target, Lightbulb } from "lucide-react";
import Navbar from "./Navbar";

const About = () => {
  return (
    <>
        <Navbar />
    <div className="min-h-screen bg-background text-foreground px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about the team behind this project and our journey in
            technology.
          </p>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl border bg-card p-8 shadow-sm mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                Class 11⁰⁴ • AKPS
              </span>
              <h2 className="mt-4 text-3xl font-bold">
                Building for learning, growth, and the future
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                We are students of class <span className="font-semibold text-foreground">11⁰⁴ at AKPS</span>,
                passionate about learning and building modern websites. As part
                of our journey in technology, we created this{" "}
                <span className="font-semibold text-foreground">
                  Task Manager Website
                </span>{" "}
                to help users stay organized and productive.
              </p>
            </div>

            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10">
              <Users className="h-14 w-14 text-primary" />
            </div>
          </div>
        </div>

        {/* Main Info Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Skills */}
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">What We Built With</h3>
            </div>

            <p className="text-muted-foreground leading-7">
              This project reflects our growing skills in web development using
              technologies like{" "}
              <span className="font-semibold text-foreground">React</span>,{" "}
              <span className="font-semibold text-foreground">TypeScript</span>,
              and{" "}
              <span className="font-semibold text-foreground">Tailwind CSS</span>,
              along with a real database system.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["React", "TypeScript", "Tailwind CSS", "Database"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Real World */}
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Why This Project Matters</h3>
            </div>

            <p className="text-muted-foreground leading-7">
              Through this website, we are learning how{" "}
              <span className="font-semibold text-foreground">
                real-world systems
              </span>{" "}
              are designed and built. This is more than just a classroom task —
              it is part of our practical experience in creating useful digital
              solutions.
            </p>
          </div>

          {/* Goal */}
          <div className="rounded-3xl border bg-card p-6 shadow-sm md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Our Goal</h3>
            </div>

            <p className="text-muted-foreground leading-8 text-base">
              Our goal is not just to complete a project, but to{" "}
              <span className="font-semibold text-foreground">
                gain practical experience
              </span>
              ,{" "}
              <span className="font-semibold text-foreground">
                work as a team
              </span>
              , and{" "}
              <span className="font-semibold text-foreground">
                prepare ourselves for future opportunities
              </span>{" "}
              in the tech world.
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-10 rounded-3xl border bg-card p-8 text-center shadow-sm">
          <h4 className="text-2xl font-bold">
            “Learning today, building tomorrow.”
          </h4>
          <p className="mt-3 text-muted-foreground">
            This project is a step forward in our journey as future developers.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};


export default About;