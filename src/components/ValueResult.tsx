import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CalculationResult } from "@/lib/valuationData";
import { RefreshCw, Share2 } from "lucide-react";

interface ValueResultProps {
  result: CalculationResult;
  onReset: () => void;
}

export const ValueResult: React.FC<ValueResultProps> = ({ result, onReset }) => {
  const { quantity, item, totalValue } = result;

  return (
    <Card className="w-full max-w-md mx-auto bg-white/90 dark:bg-black/90 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl text-center p-8 animate-in fade-in zoom-in-95 duration-500">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold text-brand-start">🎉 ¡TU VALOR OFICIAL! 🎉</h2>
        
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">VALÉS EXACTAMENTE:</p>
        
        <div className="my-4">
          <span className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
            {quantity}
          </span>
          <div className="text-4xl font-bold mt-2 flex items-center justify-center gap-3">
            <span>{item.emoji}</span>
            <span>{item.name}</span>
          </div>
        </div>

        <p className="text-lg text-gray-500 dark:text-gray-400">
          💰 ${new Intl.NumberFormat('es-AR').format(totalValue)} en {item.name.toLowerCase()}
        </p>

        <blockquote className="mt-6 text-xl italic text-gray-700 dark:text-gray-200 border-l-4 border-neon-yellow pl-4 text-left">
          "{item.quote}"
        </blockquote>

        <p className="mt-6 text-sm text-gray-400">#CuantoValgo #{quantity}{item.name.replace(/\s/g, '')}</p>

        <div className="mt-8 flex flex-col gap-4">
          <Button className="w-full h-14 text-xl font-bold text-white bg-gradient-to-r from-brand-start to-brand-end hover:scale-105 transition-transform duration-300 rounded-2xl">
            <Share2 className="mr-2 h-6 w-6" />
            COMPARTIR RESULTADO
          </Button>
          <Button onClick={onReset} variant="outline" className="w-full h-12 text-lg rounded-2xl">
            <RefreshCw className="mr-2 h-5 w-5" />
            Calcular otra vez
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};