import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type FuelCardProps = {
  fuelType: string;
  price: number;
  priceDifference: string;
  lastChange: string;
};

const formatDate = (isoString: string | null): string => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

export default function FuelCard({
  fuelType,
  price,
  priceDifference,
  lastChange,
}: FuelCardProps) {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    const duration = 1.2;
    const frameRate = 30;
    const totalFrames = duration * frameRate;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const animatedPrice = price * progress;
      setDisplayPrice(parseFloat(animatedPrice.toFixed(2)));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayPrice(price); // Snap to actual at end
      }
    }, 1000 / frameRate);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <motion.div
      key={`${fuelType}`}
      className="sm:basis-1/2 sm:max-w-[50%] w-full bg-linear-to-br from-[#1f2f4d71] to-[#121b2c] to-60% border-1 border-[#273c635b] rounded-xl shadow-sm p-6 hover:shadow-sm"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-[#9fc7f9c2] uppercase tracking-wide text-sm mb-2">
        {fuelType}
      </div>
      <div className="text-3xl font-bold text-[var(--color-blue-100)]">
        R {Number(displayPrice).toFixed(2)}
      </div>
      <div className="flex flex-row items-end">
        <div className="flex-[1.2] text-xs text-gray-400">
          Last change: {formatDate(lastChange)}
        </div>
        <div
          className={`inline-flex items-center space-x-1 py-1 px-2 rounded-sm text-xs font-medium ${
            !priceDifference
              ? "bg-green-600 text-white"
              : priceDifference != "0.00"
              ? "bg-red-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {!priceDifference || priceDifference == "0.00" ? (
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
                  priceDifference && priceDifference != "0.00"
                    ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                }
              />
            </svg>
          )}
          <span>
            {priceDifference && priceDifference != "0.00"
              ? `${priceDifference}`
              : "0.00"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
