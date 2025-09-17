import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationParams, Category } from "@/lib/valuationData";
import { Utensils, PartyPopper, Car, Dices } from "lucide-react";

interface ValueCalculatorFormProps {
  onCalculate: (params: CalculationParams & { name: string }) => void;
}

const categoryIcons = {
  comida: <Utensils className="h-6 w-6 mr-2" />,
  fiestas: <PartyPopper className="h-6 w-6 mr-2" />,
  transporte: <Car className="h-6 w-6 mr-2" />,
  random: <Dices className="h-6 w-6 mr-2" />,
};

export const ValueCalculatorForm: React.FC<ValueCalculatorFormProps> = ({ onCalculate }) => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(25);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setError("¡Che, elegí una categoría!");
      return;
    }
    setError(null);
    onCalculate({ age, category, name });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 dark:bg-black/80 backdrop-blur-sm border-2 border-white/50 rounded-3xl shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-gray-800 dark:text-white">
          Ingresá tus datos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold">¿Cómo te llamás?</Label>
            <Input
              id="name"
              placeholder="Lionel Messi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg rounded-2xl"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="age" className="text-lg font-semibold flex justify-between">
              <span>¿Cuántos años tenés?</span>
              <span className="text-2xl font-extrabold text-brand-end">{age}</span>
            </Label>
            <Slider
              id="age"
              min={18}
              max={99}
              step={1}
              value={[age]}
              onValueChange={(value) => setAge(value[0])}
              className="[&>span:first-child]:h-3 [&>span:first-child]:bg-gradient-to-r [&>span:first-child]:from-brand-start [&>span:first-child]:to-brand-end"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-lg font-semibold">Elegí una categoría</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              className="grid grid-cols-2 gap-4"
              onValueChange={(value: Category) => setCategory(value)}
            >
              {Object.keys(categoryIcons).map((cat) => (
                <ToggleGroupItem key={cat} value={cat} className="h-16 text-lg rounded-2xl flex items-center justify-center data-[state=on]:bg-brand-end data-[state=on]:text-white">
                  {categoryIcons[cat as Category]}
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {error && <p className="text-sm font-medium text-red-500 text-center pt-2">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full h-16 text-2xl font-bold text-white bg-gradient-to-r from-brand-start to-brand-end hover:scale-105 transition-transform duration-300 rounded-2xl"
          >
            ¡CALCULÁ MI VALOR!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};