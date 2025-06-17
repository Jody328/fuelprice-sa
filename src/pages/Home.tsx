import { useFuelPriceChanges } from "../hooks/useFuelPrices";
import { Footer } from "../components/Footer";
import { useState } from "react";
import clsx from "clsx";
import FuelCard from "../components/FuelCard";

const COMMON_FUEL_TYPES = ["ULP 95", "Diesel 50", "ULP 93"] as const;
type CommonFuel = (typeof COMMON_FUEL_TYPES)[number];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const Home = () => {
  const { data, loading, error } = useFuelPriceChanges();
  const [regionFilter, setRegionFilter] = useState<"coastal" | "inland">(
    "coastal"
  );

  if (loading)
    return <p className="text-center text-white">Loading fuel prices...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const filtered = data?.filter((d) => d.region === regionFilter) || [];
  const common = COMMON_FUEL_TYPES.map((type) =>
    filtered.find((d) => d.fuel_type === type)
  ).filter(Boolean);
  const others = filtered
    .filter((d) => !COMMON_FUEL_TYPES.includes(d.fuel_type as CommonFuel))
    .sort((a, b) => a.fuel_type.localeCompare(b.fuel_type));

  const combined = [...common, ...others];

  return (
    <section className="flex flex-1 flex-col items-center bg-gray-900 overflow-y-auto">
      <div className="sm:w-full max-w-xl p-4 lg:p-8 lg:min-w-[30%] max-[600px]:min-w-[90%]">
        {combined.length === 0 && (
          <p className="text-center text-gray-400">
            No fuel data available for {regionFilter}
          </p>
        )}

        <div className="flex flex-col bg-radial-[at_25%_25%] from-[#18243b71] to-[#101828] to-55% border-1 border-[#273c635b] rounded-4xl p-2 justify-center">
          <div className="flex flex-row justify-center">
            <h1 className="flex-1 pl-4 max-[700px]:pl-3 text-3xl font-bold text-[var(--color-blue-100)] lg:pl-5 mt-2 lg:flex-[1.2] max-[700px]:text-[1.2rem]">
              Latest Prices
            </h1>
            <div className="flex flex-1 justify-end my-2 min-[701px]:mr-5 sm:mx-3 pr-3">
              <div className="flex gap-2 rounded-full bg-[#2a2f3a] p-1">
                {["coastal", "inland"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setRegionFilter(type as "coastal" | "inland")
                    }
                    className={clsx(
                      "px-4 max-[700px]:px-2 py-1 max-[700px]:py-0.5 rounded-full text-sm font-medium transition-all max-[700px]:text-[0.65rem]",
                      regionFilter === type
                        ? "bg-blue-500 text-white"
                        : "text-gray-400 hover:bg-[#3a3f4a]"
                    )}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 p-5 max-[700px]:p-2">
            {chunkArray(combined, 2).map((pair, idx) => (
              <div
                key={idx}
                className={clsx(
                  "flex sm:flex-row flex-col sm:space-x-6 space-y-6 sm:space-y-0",
                  pair.length === 1 && "sm:justify-items-start lg:max-w-[96%]"
                )}
              >
                {pair.map(
                  (fuel) =>
                    fuel && (
                      <FuelCard
                        key={fuel.id}
                        fuelType={fuel.fuel_type}
                        price={+fuel.current_price}
                        priceDifference={fuel.price_difference}
                        lastChange={fuel.last_change_date}
                      />
                    )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};
