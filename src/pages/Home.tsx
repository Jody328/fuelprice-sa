import { useFuelPriceChanges } from "../hooks/useFuelPrices";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const COMMON_FUEL_TYPES = ["ULP 95", "Diesel 50", "ULP 93"] as const;
type CommonFuel = (typeof COMMON_FUEL_TYPES)[number];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const formatDate = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

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

        <div className="flex flex-col bg-radial-[at_25%_25%] from-[#18243b71] to-[#101828] to-85% border-1 border-[#19263f5b] rounded-4xl shadow-lg p-2 justify-center">
          <div className="flex lg:flex-row max-[600px]:flex-col max-[600px]:justify-center">
            <h1 className="text-3xl font-bold text-[var(--color-blue-100)] lg:pl-5 mt-2 lg:flex-[1.2] max-[600px]:ml-4">
              Fuel Prices
            </h1>
            <div className="flex justify-center my-2 mr-5 sm:mx-3">
              <div className="flex gap-2 rounded-full bg-[#2a2f3a] p-1">
                {["coastal", "inland"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setRegionFilter(type as "coastal" | "inland")
                    }
                    className={clsx(
                      "px-4 py-1 rounded-full text-sm font-medium transition-all",
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
          <div className="space-y-6 p-5">
            {/* {chunkArray(combined, 2).map((pair, idx) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 auto-rows-fr justify-start">
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
            ))} */}
            {chunkArray(combined, 2).map((pair, idx) => (
              <div
                key={idx}
                className={clsx(
                  "flex sm:flex-row flex-col sm:space-x-6 space-y-6 sm:space-y-0",
                  pair.length === 1 && "sm:justify-items-start lg:max-w-[96%]"
                )}
              >
                {pair.map(
                  (item) =>
                    item && (
                      <motion.div
                        key={`${item.fuel_type}`}
                        className="sm:basis-1/2 sm:max-w-[50%] w-full bg-radial-[at_25%_25%] from-[#1f2f4d71] to-[#121b2c] to-75% border-1 border-[#1c2b475b] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="text-[#9fc7f9c2] uppercase tracking-wide text-sm mb-2">
                          {item.fuel_type}
                        </div>
                        <div className="text-3xl font-bold text-[var(--color-blue-100)]">
                          R {Number(item.current_price).toFixed(2)}
                        </div>
                        <div className="flex flex-row items-end">
                          <div className="flex-[1.2] text-xs text-gray-400">
                            Last change: {formatDate(item.last_change_date)}
                          </div>
                          <div
                            className={`inline-flex items-center space-x-1 py-1 px-2 rounded-sm text-xs font-medium ${
                              !item.price_difference
                                ? "bg-green-600 text-white"
                                : item.price_difference != "0.00"
                                ? "bg-red-600 text-white"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            {!item.price_difference ||
                            item.price_difference == "0.00" ? (
                              <span className="font-bold text-[8px]">—</span>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d={
                                    item.price_difference &&
                                    item.price_difference != "0.00"
                                      ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                      : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                  }
                                />
                              </svg>
                            )}
                            <span>
                              {item.price_difference &&
                              item.price_difference != "0.00"
                                ? `${item.price_difference}`
                                : "0.00"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
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
