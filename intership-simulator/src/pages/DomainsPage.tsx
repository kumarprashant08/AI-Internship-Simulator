import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Brain, Shield, Palette, Database, Smartphone } from "lucide-react";

const domains = [
  { id: "web-development", title: "Web Development", icon: Code, desc: "Build modern web applications with React, APIs, and databases.", color: "190 95% 39%" },
  { id: "artificial-intelligence", title: "Artificial Intelligence", icon: Brain, desc: "Work on ML models, data pipelines, and AI-powered features.", color: "260 70% 55%" },
  { id: "cybersecurity", title: "Cybersecurity", icon: Shield, desc: "Analyze threats, secure systems, and perform audits.", color: "340 75% 55%" },
  { id: "ui-ux-design", title: "UI/UX Design", icon: Palette, desc: "Design user interfaces, wireframes, and prototypes.", color: "30 90% 55%" },
  { id: "data-science", title: "Data Science", icon: Database, desc: "Analyze datasets, create visualizations, and build models.", color: "150 60% 40%" },
  { id: "mobile-development", title: "Mobile Development", icon: Smartphone, desc: "Develop cross-platform mobile apps.", color: "220 80% 55%" },
];

const DomainsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-gradient">AI</span> InternSim
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-28 pb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Choose Your <span className="text-gradient">Domain</span>
          </h1>
          <p className="mt-3 text-muted-foreground">Select a field to start your virtual internship simulation.</p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/dashboard/${domain.id}`}
                className="group block rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ background: `linear-gradient(135deg, hsl(${domain.color}), hsl(${domain.color} / 0.7))` }}
                >
                  <domain.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{domain.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{domain.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainsPage;
