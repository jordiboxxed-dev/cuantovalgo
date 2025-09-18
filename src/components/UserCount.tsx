import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserCount = () => {
  const [count, setCount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCount = async () => {
      // Pequeña demora para una mejor percepción de carga
      await new Promise(resolve => setTimeout(resolve, 500));

      const { count, error } = await supabase
        .from('app_usage')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error("Error al obtener el conteo de usuarios:", error);
      } else {
        setCount(count);
      }
      setLoading(false);
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
        <Skeleton className="h-4 w-48 bg-white/20" />
      </div>
    );
  }

  // No mostramos nada si el conteo es muy bajo para no parecer impopular
  if (count === null || count < 5) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 text-white/80 font-semibold animate-in fade-in duration-500">
      <Users className="h-5 w-5 text-neon-yellow" />
      <span>¡Ya somos <span className="font-bold text-white text-lg">{count}</span> Valiosos en la comunidad!</span>
    </div>
  );
};