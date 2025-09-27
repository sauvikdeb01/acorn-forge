import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Globe, Zap, ArrowLeft } from "lucide-react";

const mockCourses = [
  {
    id: 1,
    title: "Complete Python Programming Bootcamp",
    description: "Learn Python from scratch with hands-on projects and real-world applications",
    provider: "TechEdu",
    rating: 4.8,
    students: "45K+"
  },
  {
    id: 2, 
    title: "Advanced Python for Data Science",
    description: "Master Python libraries like Pandas, NumPy, and Matplotlib for data analysis",
    provider: "DataLearn",
    rating: 4.9,
    students: "32K+"
  },
  {
    id: 3,
    title: "Python Web Development with Django",
    description: "Build dynamic web applications using Django framework and Python",
    provider: "WebMasters",
    rating: 4.7,
    students: "28K+"
  },
  {
    id: 4,
    title: "Machine Learning with Python",
    description: "Implement ML algorithms and build intelligent systems with Python",
    provider: "AIHub",
    rating: 4.8,
    students: "38K+"
  },
  {
    id: 5,
    title: "Python Automation and Scripting",
    description: "Automate repetitive tasks and create powerful scripts with Python",
    provider: "AutoCode",
    rating: 4.6,
    students: "22K+"
  }
];

const WebScrape = () => {
  const navigate = useNavigate();
  const [isScrapingInitial, setIsScrapingInitial] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isDeepScraping, setIsDeepScraping] = useState(false);
  const [progress, setProgress] = useState(0);

  useState(() => {
    // Simulate initial scraping
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsScrapingInitial(false);
          setShowResults(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  });

  const handleDeepScrape = async () => {
    if (!selectedCourse) return;
    
    setIsDeepScraping(true);
    setProgress(0);
    
    // Simulate deep scraping progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          navigate("/result");
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);
  };

  if (isScrapingInitial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Search className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-scale" />
              <h2 className="text-2xl font-bold gradient-text mb-2">Scraping the web for courses...</h2>
              <p className="text-muted-foreground">Finding the best courses for your topic</p>
            </div>
            <div className="space-y-4">
              <Progress value={progress} className="progress-glow" />
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isDeepScraping) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Zap className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-scale" />
              <h2 className="text-2xl font-bold gradient-text mb-2">Deep scraping and course generation in progress...</h2>
              <p className="text-muted-foreground">Creating your personalized course structure</p>
            </div>
            <div className="space-y-4">
              <Progress value={progress} className="progress-glow" />
              <div className="text-sm text-muted-foreground">
                {progress < 30 && "Analyzing course content..."}
                {progress >= 30 && progress < 60 && "Extracting key concepts..."}
                {progress >= 60 && progress < 90 && "Structuring modules..."}
                {progress >= 90 && "Finalizing course..."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">Course Discovery</h1>
            <p className="text-xl text-muted-foreground">
              Found {mockCourses.length} amazing courses! Select one to get started.
            </p>
          </div>
        </div>

        <div className="grid gap-4 mb-8">
          {mockCourses.map((course) => (
            <Card 
              key={course.id}
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedCourse === course.id ? "ring-2 ring-primary shadow-glow" : ""
              }`}
              onClick={() => setSelectedCourse(course.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={selectedCourse === course.id}
                    onChange={() => {}}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          {course.provider}
                        </span>
                        <span>★ {course.rating}</span>
                        <span>{course.students} students</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleDeepScrape}
            disabled={!selectedCourse}
            className="hero-button px-12 py-4 text-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Deep Scrape
          </Button>
          {!selectedCourse && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select a course to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebScrape;