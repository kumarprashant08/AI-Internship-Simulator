import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Clock, ArrowLeft, Send, Sparkles, BarChart3 } from "lucide-react";

const domainLabels: Record<string, string> = {
  "web-development": "Web Development",
  "artificial-intelligence": "Artificial Intelligence",
  "cybersecurity": "Cybersecurity",
  "ui-ux-design": "UI/UX Design",
  "data-science": "Data Science",
  "mobile-development": "Mobile Development",
};

const sampleTasks: Record<string, { id: number; title: string; difficulty: string; status: "pending" | "completed" | "in-progress"; description: string }[]> = {
  "web-development": [
    { id: 1, title: "Build a Responsive Landing Page", difficulty: "Beginner", status: "completed", description: "Create a fully responsive landing page using HTML, CSS, and JavaScript. The page should include a hero section, feature cards, and a contact form. Ensure it looks great on mobile, tablet, and desktop." },
    { id: 2, title: "Create a REST API with Express.js", difficulty: "Intermediate", status: "in-progress", description: "Build a RESTful API using Node.js and Express. Implement CRUD operations for a task management system with proper error handling, validation, and middleware." },
    { id: 3, title: "Implement User Authentication", difficulty: "Intermediate", status: "pending", description: "Add JWT-based authentication to a web application. Implement signup, login, logout, and protected routes. Store passwords securely with bcrypt." },
    { id: 4, title: "Build a Real-Time Chat Feature", difficulty: "Advanced", status: "pending", description: "Implement a real-time chat feature using WebSockets. Support multiple chat rooms, message history, and online user indicators." },
  ],
  "artificial-intelligence": [
    { id: 1, title: "Train a Sentiment Classifier", difficulty: "Beginner", status: "completed", description: "Build a sentiment analysis model using a labeled dataset. Preprocess text data, train a classifier, and evaluate its performance with accuracy and F1 score." },
    { id: 2, title: "Build a Recommendation Engine", difficulty: "Intermediate", status: "in-progress", description: "Create a collaborative filtering recommendation system. Use user-item interaction data to suggest relevant items." },
    { id: 3, title: "Deploy an ML Model as an API", difficulty: "Intermediate", status: "pending", description: "Take a trained machine learning model and deploy it as a REST API using Flask or FastAPI. Include input validation and proper response formatting." },
    { id: 4, title: "Implement a Computer Vision Pipeline", difficulty: "Advanced", status: "pending", description: "Build an image classification pipeline using a pre-trained CNN. Include data augmentation, fine-tuning, and inference optimization." },
  ],
};

// Default tasks for domains without specific tasks
const defaultTasks = [
  { id: 1, title: "Complete Onboarding Module", difficulty: "Beginner", status: "completed" as const, description: "Review the onboarding materials and complete the introductory assessment to familiarize yourself with the domain tools and workflows." },
  { id: 2, title: "Research Industry Standards", difficulty: "Beginner", status: "in-progress" as const, description: "Research and document current industry standards, best practices, and common tools used in this domain." },
  { id: 3, title: "Build a Mini Project", difficulty: "Intermediate", status: "pending" as const, description: "Design and implement a small project that demonstrates your understanding of core concepts in this field." },
  { id: 4, title: "Peer Review & Documentation", difficulty: "Intermediate", status: "pending" as const, description: "Document your work thoroughly and prepare a presentation reviewing your approach, challenges, and learnings." },
];

const DashboardPage = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const domainName = domainLabels[domainId || ""] || "Internship";
  const tasks = sampleTasks[domainId || ""] || defaultTasks;
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [submission, setSubmission] = useState("");

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  const activeTask = selectedTask !== null ? tasks.find((t) => t.id === selectedTask) : null;

  const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-accent" />;
    if (status === "in-progress") return <Clock className="h-5 w-5 text-foreground/60" />;
    return <Circle className="h-5 w-5 text-muted-foreground/40" />;
  };

  const difficultyColor = (d: string) => {
    if (d === "Beginner") return "bg-accent/15 text-accent";
    if (d === "Intermediate") return "bg-foreground/10 text-foreground/70";
    return "bg-destructive/15 text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-gradient">AI</span> InternSim
          </Link>
          <div className="flex items-center gap-2">
            <Link to={`/report/${domainId}`}>
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart3 className="h-4 w-4" /> Report
              </Button>
            </Link>
            <Link to="/domains">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" /> Domains
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            {domainName} <span className="text-gradient">Internship</span>
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{tasks.length} tasks done
            </span>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Task List */}
          <div className="lg:col-span-2 space-y-3">
            {tasks.map((task, i) => (
              <motion.button
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedTask(task.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                  selectedTask === task.id
                    ? "border-accent bg-accent/5 shadow-glow"
                    : "border-border bg-card shadow-card hover:shadow-card-hover"
                }`}
              >
                <div className="flex items-start gap-3">
                  {statusIcon(task.status)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold text-card-foreground">{task.title}</h3>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${difficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">{task.status.replace("-", " ")}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Task Detail */}
          <div className="lg:col-span-3">
            {activeTask ? (
              <motion.div
                key={activeTask.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor(activeTask.difficulty)}`}>
                    {activeTask.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">{activeTask.status.replace("-", " ")}</span>
                </div>
                <h2 className="font-display text-xl font-bold text-card-foreground">{activeTask.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeTask.description}</p>

                {activeTask.status !== "completed" && (
                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-card-foreground">Your Submission</label>
                    <textarea
                      value={submission}
                      onChange={(e) => setSubmission(e.target.value)}
                      placeholder="Paste your code, write your solution, or describe your approach..."
                      rows={6}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                    <div className="mt-3 flex gap-3">
                      <Button variant="hero" className="gap-2">
                        <Send className="h-4 w-4" /> Submit
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Sparkles className="h-4 w-4" /> Get AI Hint
                      </Button>
                    </div>
                  </div>
                )}

                {activeTask.status === "completed" && (
                  <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="font-display font-semibold text-sm text-foreground">Task Completed!</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great work! Your submission was reviewed by the AI mentor. You demonstrated solid understanding of the core concepts.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-card/50">
                <p className="text-muted-foreground">Select a task to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
