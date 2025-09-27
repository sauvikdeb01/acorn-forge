import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Presentation, 
  Video, 
  BookOpen,
  Globe,
  CheckCircle,
  Sparkles
} from "lucide-react";

const exportTypes = [
  { value: "pdf", label: "PDF Document", icon: FileText, description: "Complete course materials in PDF format" },
  { value: "ppt", label: "PowerPoint", icon: Presentation, description: "Interactive presentation slides" },
  { value: "micro", label: "Micro-lessons", icon: BookOpen, description: "Bite-sized learning modules" },
  { value: "video", label: "Video Scripts", icon: Video, description: "Ready-to-record video scripts" }
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese", 
  "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Hindi"
];

const Export = () => {
  const navigate = useNavigate();
  const [exportType, setExportType] = useState("");
  const [language, setLanguage] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    if (!exportType || !language) return;
    
    setIsExporting(true);
    setProgress(0);
    
    // Simulate export progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExporting(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold gradient-text mb-2">Exported Successfully ✅</h2>
              <p className="text-muted-foreground">Your course has been exported and is ready for download</p>
            </div>
            <div className="space-y-4">
              <Button className="hero-button w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Course
              </Button>
              <Button variant="outline" onClick={() => navigate("/result")} className="w-full">
                Back to Course
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                Create New Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isExporting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-scale" />
              <h2 className="text-2xl font-bold gradient-text mb-2">Exporting your course...</h2>
              <p className="text-muted-foreground">Converting to {exportType.toUpperCase()} in {language}</p>
            </div>
            <div className="space-y-4">
              <Progress value={progress} className="progress-glow" />
              <div className="text-sm text-muted-foreground">
                {progress < 25 && "Preparing content..."}
                {progress >= 25 && progress < 50 && "Converting format..."}
                {progress >= 50 && progress < 75 && "Translating content..."}
                {progress >= 75 && progress < 95 && "Finalizing export..."}
                {progress >= 95 && "Almost ready..."}
              </div>
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

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/result")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">Export Options</h1>
            <p className="text-xl text-muted-foreground">
              Choose your preferred format and language for export
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Export Type Selection */}
          <Card className="glass-card animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-primary" />
                Export Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {exportTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:bg-muted/50 ${
                      exportType === type.value ? "ring-2 ring-primary bg-muted/50" : ""
                    }`}
                    onClick={() => setExportType(type.value)}
                  >
                    <div className="flex items-start space-x-3">
                      <type.icon className="w-6 h-6 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">{type.label}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Language Selection */}
          <Card className="glass-card animate-scale-in" style={{animationDelay: "0.1s"}}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Language Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                The entire course will be translated to your selected language
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Export Summary */}
        {exportType && language && (
          <Card className="glass-card mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Export Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <p className="font-semibold">
                    {exportTypes.find(t => t.value === exportType)?.label}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Language:</span>
                  <p className="font-semibold capitalize">{language}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Button */}
        <div className="text-center">
          <Button
            onClick={handleExport}
            disabled={!exportType || !language}
            className="hero-button px-12 py-4 text-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Course
          </Button>
          {(!exportType || !language) && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select both export type and language to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Export;