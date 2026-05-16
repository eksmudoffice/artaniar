import { useEffect, useState } from "react";
import { PropertyService } from "@/services/propertyService";

export function useAvailableAreas() {
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    PropertyService.getAvailableAreas()
      .then((res) => {
        if (cancelled) return;
        setAreas(res);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { areas, loading };
}
