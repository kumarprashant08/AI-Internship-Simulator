import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, BookOpen, Award, BarChart3, Brain, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const steps = [
  { num: "01", title: "Choose Your Domain", desc: "Pick from Web Dev, AI, Cybersecurity, and more." },
  { num: "02", title: "Get Real Tasks", desc: "AI generates industry-level assignments for you." },
  { num: "03", title: "Submit & Get Feedback", desc: "Receive instant AI mentorship on your work." },
  { num: "04", title: "Earn Your Certificate", desc: "Get a performance report showcasing your skills." },
];

const features = [
  { icon: Brain, title: "AI Task Generator", desc: "Real-world internship tasks tailored to your skill level." },
  { icon: Zap, title: "Instant Feedback", desc: "AI mentor provides improvement tips on every submission." },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visualize your skill development over time." },
  { icon: BookOpen, title: "Virtual Workspace", desc: "Experience a simulated workplace environment." },
  { icon: Award, title: "Certificates", desc: "Earn verified certificates upon completion." },
  { icon: Shield, title: "Industry-Ready", desc: "Bridge the gap between college and career." },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-gradient">AI</span> InternSim
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/domains">
              <Button variant="ghost" size="sm">Explore</Button>
            </Link>
            <Link to="/domains">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="bg-hero absolute inset-0 opacity-95" />
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative z-10 container mx-auto px-4 py-28 md:py-40">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="visible"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground"
            >
              🚀 Practice Before You Apply
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-display text-4xl font-bold leading-tight tracking-tight text-primary-foreground md:text-6xl"
            >
              Experience Real Internships{" "}
              <span className="text-gradient">Before Getting One</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/70"
            >
              AI-powered internship simulator that gives you real tasks, instant feedback, and verified certificates. Bridge the gap between learning and experience.
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-8 flex items-center justify-center gap-4">
              <Link to="/domains">
                <Button variant="hero" size="lg" className="text-base px-8">
                  Start Simulation
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="heroOutline" size="lg" className="text-base px-8">
                  How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to <span className="text-gradient">Get Hired</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Our platform simulates real internship environments so you can build skills companies actually want.
            </p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-accent">
                  <f.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              How It <span className="text-gradient">Works</span>
            </h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mb-4 font-display text-5xl font-bold text-gradient">{step.num}</div>
                <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/domains">
              <Button variant="hero" size="lg" className="text-base px-10">
                Start Your Internship Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 AI InternSim — Hackathon Project by Team Vision 1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
