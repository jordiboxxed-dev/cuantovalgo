import * as React from "react";
import { ValueCalculatorForm } from "@/components/ValueCalculatorForm";
import { ValueCertificate } from "@/components/ValueCertificate";
import { LoadingScreen } from "@/components/LoadingScreen";
import { OnboardingModal } from "@/components/OnboardingModal";
import { calculateValue, type CalculationParams, type CalculationResult, type Persona } from "@/lib/valuationData";
import { Fizz } from "@/components/Fizz";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { UserCount } from "@/components/UserCount";

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [userName, setUserName] = React.useState("");
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [userPersona, setUserPersona] = React.useState<Persona | null>(null);

  React.useEffect(() => {
    const hasOnboarded = localStorage.getItem("hasCompletedOnboarding");
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = async (persona: Persona) => {
    setUserPersona(persona);
    localStorage.setItem("hasCompletedOnboarding", "true");
    setShowOnboarding(false);

    const { error } = await supabase
      .from('app_usage')
      .insert([{ persona: persona }]);

    if (error) {
      console.error('Error logging usage to Supabase:', error.message);
    }
  };

  const handleCalculate = (params: Omit<CalculationParams, 'persona'> & { name: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      const calculatedResult = calculateValue({ ...params, persona: userPersona });
      setResult(calculatedResult);
      setUserName(params.name);
      setIsLoading(false);
    }, 3500);
  };

  const handleReset = () => {
    setResult(null);
    setUserName("");
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }
    if (result) {
      return <ValueCertificate result={result} onReset={handleReset} userName={userName} />;
    }
    return (
      <>
        <header className="mb-8 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            ¿CUÁNTO VALÉS?
          </h1>
          <p className="mt-2 text-xl md:text-2xl text-white/90 font-medium">
            No en plata... ¡En cosas que SÍ importan!
          </p>
        </header>
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
          <ValueCalculatorForm onCalculate={handleCalculate} />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-brand-start to-brand-end text-gray-800 dark:text-white relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
      <main className="w-full flex flex-col items-center justify-center flex-grow text-center">
        {renderContent()}
      </main>
      <div className="w-full py-4">
        <UserCount />
      </div>
      <footer className="w-full pt-4">
        <Fizz />
      </footer>
    </div>
  );
};

export default Index;