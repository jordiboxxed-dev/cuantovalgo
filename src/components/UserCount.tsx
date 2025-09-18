import * as React from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const UserCount = () => {
  const [count, setCount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchCount = React.useCallback(async () => {
    const { count, error } = await supabase
      .from('app_usage')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error("Error al obtener el conteo de usuarios:", error);
      setCount(null);
    } else {
      setCount(count);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    // Carga inicial
    fetchCount();

    // Escuchar cambios en tiempo real
    const channel = supabase
      .channel('app_usage_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'app_usage' },
        () => {
          // Cuando hay un nuevo usuario, actualizamos el contador
          setCount(currentCount => (currentCount || 0) + 1);
        }
      )
      .subscribe();

    // Limpiar la suscripción al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
        <Skeleton className="h-4 w-48 bg-white/20" />
      </div>
    );
  }

  if (count === null) {
    return null;
  }

  const communityName = count === 1 ? "Valioso" : "Valiosos";
  const verb = count === 1 ? "Hay" : "Somos";

  return (
    <div className="flex items-center justify-center gap-2 text-white/80 font-semibold animate-in fade-in duration-500">
      <Users className="h-5 w-5 text-neon-yellow" />
      <span>¡Ya {verb} <span className="font-bold text-white text-lg">{count}</span> {communityName} en la comunidad!</span>
    </div>
  );
};