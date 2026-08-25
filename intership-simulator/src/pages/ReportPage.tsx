import { useRef } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Award, TrendingUp, Target, Star } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const domainLabels: Record<string, string> = {
  "web-development": "Web Development",
  "artificial-intelligence": "Artificial Intelligence",
  "cybersecurity": "Cybersecurity",
  "ui-ux-design": "UI/UX Design",
  "data-science": "Data Science",
  "mobile-development": "Mobile Development",
};

const skillsData: Record<string, { skill: string; score: number; fullMark: 100 }[]> = {
  "web-development": [
    { skill: "HTML/CSS", score: 92, fullMark: 100 },
    { skill: "JavaScript", score: 78, fullMark: 100 },
    { skill: "React", score: 70, fullMark: 100 },
    { skill: "Node.js", score: 65, fullMark: 100 },
    { skill: "APIs", score: 80, fullMark: 100 },
    { skill: "Testing", score: 55, fullMark: 100 },
  ],
  "artificial-intelligence": [
    { skill: "Python", score: 88, fullMark: 100 },
    { skill: "ML Models", score: 75, fullMark: 100 },
    { skill: "NLP", score: 70, fullMark: 100 },
    { skill: "Data Prep", score: 82, fullMark: 100 },
    { skill: "Deployment", score: 60, fullMark: 100 },
    { skill: "Ethics", score: 90, fullMark: 100 },
  ],
};

const defaultSkills = [
  { skill: "Fundamentals", score: 85, fullMark: 100 },
  { skill: "Problem Solving", score: 72, fullMark: 100 },
  { skill: "Communication", score: 78, fullMark: 100 },
  { skill: "Tools", score: 68, fullMark: 100 },
  { skill: "Teamwork", score: 80, fullMark: 100 },
  { skill: "Research", score: 74, fullMark: 100 },
];

const weeklyProgress = [
  { week: "W1", score: 40 },
  { week: "W2", score: 55 },
  { week: "W3", score: 62 },
  { week: "W4", score: 74 },
  { week: "W5", score: 78 },
  { week: "W6", score: 85 },
];

const taskPerformance = [
  { task: "Task 1", score: 92 },
  { task: "Task 2", score: 78 },
  { task: "Task 3", score: 85 },
  { task: "Task 4", score: 70 },
];

const ReportPage = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const domainName = domainLabels[domainId || ""] || "Internship";
  const skills = skillsData[domainId || ""] || defaultSkills;
  const certRef = useRef<HTMLDivElement>(null);

  const overallScore = Math.round(skills.reduce((a, s) => a + s.score, 0) / skills.length);
  const completedTasks = 2;
  const totalTasks = 4;

  const handleDownloadCertificate = () => {
    const certEl = certRef.current;
    if (!certEl) return;

    // Create a canvas-based certificate for download
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    const grad = ctx.createLinearGradient(0, 0, 1200, 800);
    grad.addColorStop(0, "#1a1f35");
    grad.addColorStop(0.5, "#1e3048");
    grad.addColorStop(1, "#0d4f5c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = "#0fa4b8";
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 720);
    ctx.strokeStyle = "rgba(15,164,184,0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 50, 1100, 700);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Completion", 600, 160);

    // Divider
    const divGrad = ctx.createLinearGradient(300, 190, 900, 190);
    divGrad.addColorStop(0, "transparent");
    divGrad.addColorStop(0.5, "#0fa4b8");
    divGrad.addColorStop(1, "transparent");
    ctx.strokeStyle = divGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 190);
    ctx.lineTo(900, 190);
    ctx.stroke();

    // Body
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "20px 'Inter', sans-serif";
    ctx.fillText("This certifies that", 600, 270);

    ctx.fillStyle = "#0fa4b8";
    ctx.font = "bold 40px 'Space Grotesk', sans-serif";
    ctx.fillText("Intern Participant", 600, 330);

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "20px 'Inter', sans-serif";
    ctx.fillText("has successfully completed the", 600, 400);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px 'Space Grotesk', sans-serif";
    ctx.fillText(`${domainName} Internship Program`, 600, 450);

    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "20px 'Inter', sans-serif";
    ctx.fillText(`Overall Score: ${overallScore}%  •  Tasks Completed: ${completedTasks}/${totalTasks}`, 600, 510);

    // Date
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = "16px 'Inter', sans-serif";
    ctx.fillText(`Issued on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 600, 580);

    // Footer
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px 'Space Grotesk', sans-serif";
    ctx.fillText("AI InternSim", 600, 680);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillText("AI-Powered Virtual Internship Simulator", 600, 710);

    // Download
    const link = document.createElement("a");
    link.download = `${domainName.replace(/\s+/g, "-")}-Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-gradient">AI</span> InternSim
          </Link>
          <Link to={`/dashboard/${domainId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Performance <span className="text-gradient">Report</span>
          </h1>
          <p className="mt-2 text-muted-foreground">{domainName} Internship — Detailed Analytics</p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { label: "Overall Score", value: `${overallScore}%`, icon: Star, color: "text-accent" },
            { label: "Tasks Done", value: `${completedTasks}/${totalTasks}`, icon: Target, color: "text-accent" },
            { label: "Skill Growth", value: "+45%", icon: TrendingUp, color: "text-accent" },
            { label: "Rank", value: "Top 15%", icon: Award, color: "text-accent" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border bg-card shadow-card">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-xl font-bold text-card-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Radar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-lg text-card-foreground">Skill Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skills}>
                      <PolarGrid stroke="hsl(214 32% 91%)" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="hsl(190 95% 39%)"
                        fill="hsl(190 95% 39%)"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Progress */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-lg text-card-foreground">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                      <XAxis dataKey="week" tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0 0% 100%)",
                          border: "1px solid hsl(214 32% 91%)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(190 95% 39%)"
                        strokeWidth={3}
                        dot={{ fill: "hsl(190 95% 39%)", r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Task Performance Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-lg text-card-foreground">Task Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" />
                      <XAxis dataKey="task" tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: "hsl(215 16% 47%)", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0 0% 100%)",
                          border: "1px solid hsl(214 32% 91%)",
                          borderRadius: "8px",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="score" fill="hsl(190 95% 39%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skill Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card className="border-border bg-card shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-lg text-card-foreground">Skill Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((s) => (
                  <div key={s.skill}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{s.skill}</span>
                      <span className="font-semibold text-card-foreground">{s.score}%</span>
                    </div>
                    <Progress value={s.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Certificate Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-border bg-card shadow-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-lg text-card-foreground">Certificate of Completion</CardTitle>
              <Button variant="hero" size="sm" className="gap-2" onClick={handleDownloadCertificate}>
                <Download className="h-4 w-4" /> Download Certificate
              </Button>
            </CardHeader>
            <CardContent>
              <div
                ref={certRef}
                className="relative rounded-xl bg-hero p-8 md:p-12 text-center overflow-hidden"
              >
                {/* Decorative border */}
                <div className="absolute inset-3 rounded-lg border-2 border-accent/30 pointer-events-none" />
                <div className="absolute inset-4 rounded-lg border border-accent/10 pointer-events-none" />

                <div className="relative z-10">
                  <p className="text-accent/80 text-sm tracking-widest uppercase mb-2">Certificate of Completion</p>
                  <div className="w-24 h-0.5 mx-auto bg-accent/40 mb-6" />

                  <p className="text-accent-foreground/60 text-sm mb-1">This certifies that</p>
                  <p className="font-display text-2xl md:text-3xl font-bold text-accent mb-2">Intern Participant</p>
                  <p className="text-accent-foreground/60 text-sm mb-1">has successfully completed the</p>
                  <p className="font-display text-xl md:text-2xl font-bold text-accent-foreground mb-4">
                    {domainName} Internship Program
                  </p>

                  <p className="text-accent-foreground/50 text-sm mb-6">
                    Overall Score: {overallScore}% • Tasks Completed: {completedTasks}/{totalTasks}
                  </p>

                  <div className="w-16 h-0.5 mx-auto bg-accent/30 mb-4" />
                  <p className="text-accent-foreground/40 text-xs">
                    Issued on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>

                  <div className="mt-6">
                    <p className="font-display text-lg font-bold text-accent-foreground">AI InternSim</p>
                    <p className="text-accent-foreground/40 text-xs">AI-Powered Virtual Internship Simulator</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;
