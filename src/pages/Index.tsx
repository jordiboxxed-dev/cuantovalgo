import * as React from "react";
import { ValueCalculatorForm } from "@/components/ValueCalculatorForm";
import { ValueResult } from "@/components/ValueResult";
import { calculateValue, type CalculationParams, type CalculationResult } from "@/lib/valuationData";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [result, setResult] = React.useState<CalculationResult | null>(null);

  const handleCalculate = (params: CalculationParams) => {
    const calculatedResult = calculateValue(params);
    setResult(calculatedResult);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-brand-start to-brand-end text-gray-800 dark:text-white">
      <main className="w-full flex flex-col items-center justify-center flex-grow text-center">
        {!result ? (
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
        ) : (
          <ValueResult result={result} onReset={handleReset} />
        )}
      </main>
      <footer className="w-full pt-8">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Index;