import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Sparkles, Zap, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [coursePrompt, setCoursePrompt] = useState("");

  const handleWebScrape = () => {
    navigate("/webscrape");
  };

  const handleStartFromScratch = () => {
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-primary animate-pulse-scale" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            AI Course Creator
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2">
            The Future of Learning
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform any topic into a comprehensive, engaging course with the power of AI
          </p>
        </div>

        {/* Main Input */}
        <Card className="glass-card mb-8 animate-scale-in max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="relative">
              <Input
                placeholder="What course do you want to create?"
                value={coursePrompt}
                onChange={(e) => setCoursePrompt(e.target.value)}
                className="text-lg py-4 pl-6 pr-12 bg-background/50 border-2 border-border/50 focus:border-primary/50"
              />
              <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-slide-up">
          <Card 
            className="glass-card cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-glow"
            onClick={handleWebScrape}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <Globe className="w-12 h-12 mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Web Scrape</h3>
              <p className="text-muted-foreground mb-4">
                Discover and enhance existing courses from across the web
              </p>
              <Button variant="hero" className="w-full group-hover:shadow-glow">
                Start Discovery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="glass-card cursor-pointer group hover:scale-105 transition-all duration-300 hover:shadow-glow"
            onClick={handleStartFromScratch}
          >
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <Zap className="w-12 h-12 mx-auto text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start From Scratch</h3>
              <p className="text-muted-foreground mb-4">
                Create a completely custom course tailored to your vision
              </p>
              <Button variant="hero" className="w-full group-hover:shadow-glow">
                Begin Creation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: "0.5s"}}>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-muted-foreground">
              Advanced AI creates comprehensive course structures and content
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Generate complete courses in minutes, not months
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Multi-Format</h3>
            <p className="text-sm text-muted-foreground">
              Export to PDF, PPT, video scripts, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
