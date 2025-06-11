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
    <section className="flex flex-1 flex-col items-center bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="flex justify-center mt-6">
        <div className="flex gap-2 rounded-full bg-[#2a2f3a] p-1">
          {["coastal", "inland"].map((type) => (
            <button
              key={type}
              onClick={() => setRegionFilter(type as "coastal" | "inland")}
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

      <div className="w-full max-w-xl p-4 lg:p-8">
        {combined.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No fuel data available for {regionFilter}
          </p>
        )}

        <div className="space-y-6">
          {chunkArray(combined, 2).map((pair, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0"
            >
              {pair.map(
                (item) =>
                  item && (
                    <motion.div
                      key={`${item.fuel_type}`}
                      className="flex-1 bg-radial-[at_25%_25%] from-[#398ab32d] to-[#16212e] to-55% border-1 border-[#4cb9f01f] rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-[#9fc7f9c2] uppercase tracking-wide text-sm mb-2">
                        {item.fuel_type}
                      </div>
                      <div className="flex items-baseline space-x-4">
                        <div className="text-3xl font-bold text-[var(--color-blue-100)]">
                          R {item.latest_price.toFixed(2)}
                        </div>
                        <div
                          className={`inline-flex items-center space-x-1 py-1 px-2 rounded-sm text-xs font-medium ${
                            item.change_percentage == +(0).toFixed(2)
                              ? "bg-indigo-600 text-white"
                              : item.change_percentage > 0
                              ? "bg-green-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {!item.has_changed ? (
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
                                  item.change_percentage > 0
                                    ? "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                    : "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                }
                              />
                            </svg>
                          )}
                          <span>
                            {item.has_changed
                              ? `${item.change_percentage.toFixed(2)}%`
                              : `${item.change_percentage.toFixed(2)}%`}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        {!item.has_changed
                          ? `Last change: ${item.previous_date}`
                          : `Updated: ${item.latest_date}`}
                      </div>
                    </motion.div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </section>
  );
};
