import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CalculationResult } from "@/lib/valuationData";
import { RefreshCw, Share2, Loader2, Award } from "lucide-react";
import { toPng } from 'html-to-image';
import { showError, showSuccess } from "@/utils/toast";
import { QRCodeGenerator } from "./QRCode";

interface ValueCertificateProps {
  result: CalculationResult;
  onReset: () => void;
  userName: string;
}

export const ValueCertificate: React.FC<ValueCertificateProps> = ({ result, onReset, userName }) => {
  const { quantity, item, totalValue, title, stats } = result;
  const certificateRef = React.useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const appUrl = window.location.href;
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 7);

  const handleShare = async () => {
    if (!certificateRef.current) {
      showError("No se pudo generar el certificado para compartir.");
      return;
    }

    setIsSharing(true);
    try {
      const dataUrl = await toPng(certificateRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#f3f4f6', // Light gray background for better contrast
      });

      const shareText = `¡Mirá mi valor oficial! Soy ${title} y valgo ${quantity} ${item.name} ${item.emoji}. ¡Calculá el tuyo!`;
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'certificado-cuanto-valgo.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: '¿Cuánto Valgo? - Certificado Oficial',
          text: shareText,
          url: appUrl,
          files: [file],
        });
        showSuccess("¡Certificado compartido!");
      } else {
        const link = document.createElement('a');
        link.download = 'certificado-cuanto-valgo.png';
        link.href = dataUrl;
        link.click();
        showSuccess("¡Certificado descargado! Listo para compartir.");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        showError("Hubo un problema al intentar compartir. ¡Probá de nuevo!");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
      <Card 
        ref={certificateRef}
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl border-4 border-gray-300 dark:border-gray-600 p-6 font-serif"
      >
        <div className="text-center border-b-2 border-gray-400 pb-4">
          <h2 className="text-2xl font-bold tracking-wider">CERTIFICADO DE VALOR OFICIAL</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">República de las Cosas que Importan</p>
        </div>
        
        <div className="py-4 text-center">
          <p className="text-lg">Por la presente se certifica que</p>
          <h3 className="text-3xl font-bold my-2 text-brand-start">{userName || "Este/a crack"}</h3>
          <p className="text-lg">ha sido oficialmente valuado/a como</p>
          <h4 className="text-2xl font-semibold my-2 text-brand-end">{title}</h4>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg p-4 my-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">EQUIVALENTE A LA CANTIDAD DE</p>
          <div className="my-2 flex items-center justify-center gap-4">
            <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end">
              {quantity}
            </span>
            <div className="text-3xl font-bold text-left">
              <span className="block">{item.emoji}</span>
              <span className="block">{item.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="text-center font-bold mb-2">ESTADÍSTICAS DE PERSONAJE</h5>
          <div className="space-y-1 text-sm">
            {stats.map(stat => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="font-semibold">{stat.label}:</span>
                <span className="font-bold text-brand-end">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <QRCodeGenerator value={appUrl} />
            <p className="mt-1">¡Escaneá y calculá!</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto text-yellow-500" />
            <p className="font-bold">SELLO DE AUTENTICIDAD</p>
          </div>
          <div className="text-right">
            <p>Emitido: {new Date().toLocaleDateString('es-AR')}</p>
            <p>Válido hasta: {validUntil.toLocaleDateString('es-AR')}</p>
            <p className="mt-2 font-mono">ID: {totalValue}-{item.name.slice(0,3).toUpperCase()}</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 flex flex-col gap-4">
        <Button 
          onClick={handleShare} 
          disabled={isSharing}
          className="w-full h-14 text-xl font-bold text-white bg-gradient-to-r from-brand-start to-brand-end hover:scale-105 transition-transform duration-300 rounded-2xl"
        >
          {isSharing ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Share2 className="mr-2 h-6 w-6" />}
          {isSharing ? 'GENERANDO...' : 'COMPARTIR CERTIFICADO'}
        </Button>
        <Button onClick={onReset} variant="outline" className="w-full h-12 text-lg rounded-2xl">
          <RefreshCw className="mr-2 h-5 w-5" />
          Calcular otra vez
        </Button>
      </div>
    </div>
  );
};