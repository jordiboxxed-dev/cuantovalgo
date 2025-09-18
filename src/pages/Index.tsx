import * as React from "react";
import { ValueCalculatorForm } from "@/components/ValueCalculatorForm";
import { ValueResult } from "@/components/ValueResult";
import { LoadingScreen } from "@/components/LoadingScreen";
import { OnboardingModal } from "@/components/OnboardingModal";
import { calculateValue, type CalculationParams, type CalculationResult, type Persona } from "@/lib/valuationData";
import { MadeWithDyad } from "@/components/made-with-dyad";

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

  const handleOnboardingComplete = (persona: Persona) => {
    setUserPersona(persona);
    localStorage.setItem("hasCompletedOnboarding", "true");
    setShowOnboarding(false);
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
      return <ValueResult result={result} onReset={handleReset} userName={userName} />;
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-brand-start to-brand-end text-gray-800 dark:text-white">
      <OnboardingModal isOpen={showOnboarding} onComplete={handleOnboardingComplete} />
      <main className="w-full flex flex-col items-center justify-center flex-grow text-center">
        {renderContent()}
      </main>
      <footer className="w-full pt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;