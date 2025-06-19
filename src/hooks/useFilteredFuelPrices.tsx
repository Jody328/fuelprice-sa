import { useState, useMemo } from "react";
import { useFuelPriceChanges } from "./useFuelPrices";

const COMMON_FUEL_TYPES = ["ULP 95", "Diesel 50", "ULP 93"] as const;
type CommonFuel = (typeof COMMON_FUEL_TYPES)[number];
type Region = "coastal" | "inland";

export const useFilteredFuelPrices = () => {
  const { data, loading, error } = useFuelPriceChanges();
  const [regionFilter, setRegionFilter] = useState<Region>("coastal");

  const filtered = useMemo(
    () => data?.filter((d) => d.region === regionFilter) || [],
    [data, regionFilter]
  );

  const common = useMemo(
    () =>
      COMMON_FUEL_TYPES.map((type) =>
        filtered.find((d) => d.fuel_type === type)
      ).filter(Boolean),
    [filtered]
  );

  const others = useMemo(
    () =>
      filtered
        .filter((d) => !COMMON_FUEL_TYPES.includes(d.fuel_type as CommonFuel))
        .sort((a, b) => a.fuel_type.localeCompare(b.fuel_type)),
    [filtered]
  );

  const combined = useMemo(() => [...common, ...others], [common, others]);

  return {
    loading,
    error,
    regionFilter,
    setRegionFilter,
    combined,
  };
};
