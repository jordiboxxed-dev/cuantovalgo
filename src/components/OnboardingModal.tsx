import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, Utensils, PartyPopper, Mountain } from "lucide-react";
import type { Persona } from "@/lib/valuationData";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (persona: Persona) => void;
}

const personas: { id: Persona; label: string; icon: React.ReactNode }[] = [
  { id: "casero", label: "Netflix, pijama y helado", icon: <Home className="mr-2 h-5 w-5" /> },
  { id: "foodie", label: "Cena gourmet y vinito", icon: <Utensils className="mr-2 h-5 w-5" /> },
  { id: "fiestero", label: "Previa, boliche y after", icon: <PartyPopper className="mr-2 h-5 w-5" /> },
  { id: "aventurero", label: "Escapada a donde sea", icon: <Mountain className="mr-2 h-5 w-5" /> },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-white/90 dark:bg-black/90 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-brand-start">¡Bienvenid@!</DialogTitle>
          <DialogDescription className="text-center text-lg pt-2">
            Para darte un resultado más épico, contanos...
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <h3 className="text-xl font-semibold mb-6">¿Cuál es tu plan ideal para un sábado a la noche?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personas.map((persona) => (
              <Button
                key={persona.id}
                onClick={() => onComplete(persona.id)}
                className="h-16 text-md font-semibold rounded-2xl bg-gray-200 text-gray-800 hover:bg-brand-end hover:text-white transition-all duration-300"
              >
                {persona.icon}
                {persona.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};