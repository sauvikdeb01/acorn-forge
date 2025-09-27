import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface QuestionnaireData {
  courseTopic: string;
  targetAudience: string[];
  courseLevel: string;
  courseDuration: string;
  learningFormat: string[];
  learningGoals: string;
  prerequisites: string[];
  teachingStyle: string;
  customizations: string;
  extraInput: string;
}

const questions = [
  {
    id: "courseTopic",
    title: "What's your course topic?",
    type: "text",
    placeholder: "e.g., Machine Learning Fundamentals, Digital Marketing, Web Development..."
  },
  {
    id: "targetAudience",
    title: "Who is your target audience?",
    type: "checkbox",
    options: ["Complete Beginners", "Students", "Professionals", "Entrepreneurs", "Developers", "Designers", "Marketers", "Other"]
  },
  {
    id: "courseLevel", 
    title: "What's the course difficulty level?",
    type: "radio",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  },
  {
    id: "courseDuration",
    title: "How long should the course be?",
    type: "radio", 
    options: ["1-2 hours", "3-5 hours", "6-10 hours", "10-20 hours", "20+ hours"]
  },
  {
    id: "learningFormat",
    title: "What learning formats do you prefer?",
    type: "checkbox",
    options: ["Video Lessons", "Interactive Quizzes", "Hands-on Projects", "Reading Materials", "Live Sessions", "Assignments"]
  },
  {
    id: "learningGoals",
    title: "What are the main learning goals?",
    type: "textarea",
    placeholder: "Describe what students should be able to do after completing this course..."
  },
  {
    id: "prerequisites",
    title: "What prerequisites should students have?",
    type: "checkbox",
    options: ["No prerequisites", "Basic computer skills", "Programming experience", "Industry knowledge", "Specific software knowledge", "Academic background"]
  },
  {
    id: "teachingStyle",
    title: "What teaching style do you prefer?",
    type: "radio",
    options: ["Formal & Academic", "Casual & Friendly", "Practical & Hands-on", "Theoretical & Deep", "Interactive & Engaging"]
  },
  {
    id: "customizations",
    title: "Any specific customizations?",
    type: "textarea", 
    placeholder: "Special requirements, unique approaches, specific tools to include..."
  }
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({
    courseTopic: "",
    targetAudience: [],
    courseLevel: "",
    courseDuration: "",
    learningFormat: [],
    learningGoals: "",
    prerequisites: [],
    teachingStyle: "",
    customizations: "",
    extraInput: ""
  });
  const [showExtraInput, setShowExtraInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowExtraInput(true);
    }
  };

  const handlePrevious = () => {
    if (showExtraInput) {
      setShowExtraInput(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    navigate("/result");
  };

  const updateData = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const currentQ = questions[currentQuestion];
  const isCurrentAnswered = () => {
    const value = data[currentQ?.id as keyof QuestionnaireData];
    if (Array.isArray(value)) return value.length > 0;
    return value && value.toString().trim() !== "";
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-scale" />
              <h2 className="text-2xl font-bold gradient-text mb-2">Generating your course...</h2>
              <p className="text-muted-foreground">Our AI is crafting the perfect learning experience for you</p>
            </div>
            <div className="space-y-4">
              <Progress value={85} className="progress-glow" />
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

  if (showExtraInput) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card w-full max-w-2xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-center">
              <span className="gradient-text text-3xl">Final Touch</span>
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Any additional requirements or modifications?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="extra">Additional Input (Optional)</Label>
              <Textarea
                id="extra"
                placeholder="Add any specific requirements, examples, or modifications you'd like..."
                value={data.extraInput}
                onChange={(e) => updateData("extraInput", e.target.value)}
                className="mt-2 min-h-[120px]"
              />
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={handleGenerate}
                className="hero-button flex-1"
              >
                Generate Course
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="mb-6" />
          <CardTitle className="text-2xl gradient-text">{currentQ.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Input */}
          {currentQ.type === "text" && (
            <Input
              placeholder={currentQ.placeholder}
              value={data[currentQ.id as keyof QuestionnaireData] as string}
              onChange={(e) => updateData(currentQ.id, e.target.value)}
              className="text-lg"
            />
          )}

          {/* Textarea */}
          {currentQ.type === "textarea" && (
            <Textarea
              placeholder={currentQ.placeholder}
              value={data[currentQ.id as keyof QuestionnaireData] as string}
              onChange={(e) => updateData(currentQ.id, e.target.value)}
              className="min-h-[120px]"
            />
          )}

          {/* Radio Options */}
          {currentQ.type === "radio" && (
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((option) => (
                <label key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name={currentQ.id}
                    value={option}
                    checked={data[currentQ.id as keyof QuestionnaireData] === option}
                    onChange={(e) => updateData(currentQ.id, e.target.value)}
                    className="text-primary"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {/* Checkbox Options */}
          {currentQ.type === "checkbox" && (
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options?.map((option) => (
                <label key={option} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                  <Checkbox
                    checked={(data[currentQ.id as keyof QuestionnaireData] as string[]).includes(option)}
                    onCheckedChange={(checked) => {
                      const current = data[currentQ.id as keyof QuestionnaireData] as string[];
                      if (checked) {
                        updateData(currentQ.id, [...current, option]);
                      } else {
                        updateData(currentQ.id, current.filter(item => item !== option));
                      }
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isCurrentAnswered()}
              className="hero-button flex-1"
            >
              {currentQuestion === questions.length - 1 ? "Final Step" : "Next"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questionnaire;