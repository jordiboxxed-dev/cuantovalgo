import * as React from "react";
import { Progress } from "@/components/ui/progress";

const loadingMessages = [
  "Consultando con los astros... ✨",
  "Calculando tu nivel de facha... 😎",
  "Preguntándole al kioskero de la esquina... 🏪",
  "Contando cuántos alfajores te merecés... 🍪",
  "Midiendo tu valor en milanesas... 🥩",
  "Analizando tu historial de memes... 😂",
  "Convirtiendo tus datos a Fernet... 🥃",
  "Alineando tus chakras con el precio del dólar... 💸",
];

export const LoadingScreen = () => {
  const [progress, setProgress] = React.useState(0);
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? 95 : prev + 5));
    }, 150);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
      <div className="animate-bounce text-6xl mb-8">🤔</div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 h-16 flex items-center justify-center">
        {message}
      </h2>
      <Progress value={progress} className="w-full h-4 bg-white/30 [&>div]:bg-gradient-to-r [&>div]:from-neon-yellow [&>div]:to-mint-green" />
    </div>
  );
};