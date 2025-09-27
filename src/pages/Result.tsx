import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  Users, 
  Target, 
  CheckCircle,
  Download,
  MessageSquare,
  ArrowLeft
} from "lucide-react";

const courseOutline = {
  title: "Complete AI & Machine Learning Mastery",
  description: "Transform from beginner to AI expert with this comprehensive, project-based course",
  duration: "12 weeks",
  level: "Beginner to Advanced",
  students: "Perfect for aspiring data scientists, developers, and tech enthusiasts",
  modules: [
    {
      id: 1,
      title: "Foundations of AI & Machine Learning",
      duration: "Week 1-2",
      lessons: [
        "Introduction to Artificial Intelligence",
        "History and Evolution of ML",
        "Types of Machine Learning",
        "Setting up Development Environment"
      ],
      quiz: "Fundamentals Assessment (20 questions)"
    },
    {
      id: 2,
      title: "Python for Data Science",
      duration: "Week 3-4", 
      lessons: [
        "Python Basics for ML",
        "NumPy and Pandas Mastery",
        "Data Visualization with Matplotlib",
        "Hands-on: Data Analysis Project"
      ],
      quiz: "Python Skills Test (15 questions)"
    },
    {
      id: 3,
      title: "Supervised Learning Algorithms",
      duration: "Week 5-7",
      lessons: [
        "Linear and Logistic Regression",
        "Decision Trees and Random Forests",
        "Support Vector Machines",
        "Model Evaluation and Validation",
        "Project: Predictive Analytics"
      ],
      quiz: "Supervised Learning Challenge (25 questions)"
    },
    {
      id: 4,
      title: "Unsupervised Learning & Neural Networks",
      duration: "Week 8-10",
      lessons: [
        "Clustering Algorithms",
        "Principal Component Analysis",
        "Introduction to Neural Networks",
        "Deep Learning Fundamentals",
        "Project: Recommendation System"
      ],
      quiz: "Advanced Concepts Quiz (30 questions)"
    },
    {
      id: 5,
      title: "Real-World Applications & Deployment",
      duration: "Week 11-12",
      lessons: [
        "MLOps and Model Deployment",
        "Working with APIs and Cloud Services", 
        "Ethics in AI and ML",
        "Career Guidance and Portfolio Building",
        "Capstone Project Presentation"
      ],
      quiz: "Final Comprehensive Assessment (40 questions)"
    }
  ],
  learningGoals: [
    "Build and deploy machine learning models",
    "Master Python for data science",
    "Understand deep learning fundamentals", 
    "Create a professional ML portfolio",
    "Apply ML to real-world problems"
  ]
};

const Result = () => {
  const navigate = useNavigate();
  const [modificationPrompt, setModificationPrompt] = useState("");
  const [isModifying, setIsModifying] = useState(false);

  const handleModify = async () => {
    if (!modificationPrompt.trim()) return;
    
    setIsModifying(true);
    // Simulate modification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsModifying(false);
    setModificationPrompt("");
  };

  const handleExport = () => {
    navigate("/export");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button 
            onClick={handleExport}
            className="hero-button"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Course Header */}
        <Card className="glass-card mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl gradient-text mb-2">
                  {courseOutline.title}
                </CardTitle>
                <p className="text-xl text-muted-foreground mb-4">
                  {courseOutline.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    {courseOutline.duration}
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-primary" />
                    {courseOutline.level}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    {courseOutline.students}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                AI Generated
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Goals */}
            <Card className="glass-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {courseOutline.learningGoals.map((goal, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                      <span>{goal}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Modules */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold gradient-text">Course Roadmap</h2>
              {courseOutline.modules.map((module, index) => (
                <Card key={module.id} className="glass-card animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-primary" />
                          Module {module.id}: {module.title}
                        </CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {module.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Lessons
                        </h4>
                        <ul className="space-y-2 ml-6">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {module.quiz}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <Card className="glass-card animate-scale-in">
              <CardHeader>
                <CardTitle>Course Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Modules</span>
                  <span className="font-semibold">{courseOutline.modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Lessons</span>
                  <span className="font-semibold">
                    {courseOutline.modules.reduce((acc, module) => acc + module.lessons.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assessments</span>
                  <span className="font-semibold">{courseOutline.modules.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{courseOutline.duration}</span>
                </div>
              </CardContent>
            </Card>

            {/* Modification Panel */}
            <Card className="glass-card animate-scale-in" style={{animationDelay: "0.2s"}}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Modify Course
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="e.g., Add more beginner lessons, Change tone to friendly, etc."
                  value={modificationPrompt}
                  onChange={(e) => setModificationPrompt(e.target.value)}
                  disabled={isModifying}
                />
                <Button 
                  onClick={handleModify}
                  disabled={!modificationPrompt.trim() || isModifying}
                  className="w-full hero-button"
                >
                  {isModifying ? "Modifying..." : "Apply Changes"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;