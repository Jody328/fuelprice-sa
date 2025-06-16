import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

type FuelCardProps = {
  fuelType: string;
  price: number;
  priceDifference: string;
  lastChange: string;
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
      className="rounded-2xl bg-gradient-to-br from-[#1f2f4d71] to-[#121b2c] p-4 w-full shadow-md transition-all hover:shadow-blue-800/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-xs text-slate-400 uppercase mb-1">{fuelType}</div>

      <motion.div className="text-3xl font-bold text-white">
        R {displayPrice.toFixed(2)}
      </motion.div>

      <div className="text-xs text-slate-500 mt-2">
        Last change: {lastChange ?? "N/A"}
      </div>

      <div className="mt-2 text-sm text-gray-300 bg-gray-800/50 rounded-md px-2 py-0.5 inline-block">
        {parseFloat(priceDifference) > 0
          ? `▲ +${priceDifference}`
          : parseFloat(priceDifference) < 0
          ? `▼ ${priceDifference}`
          : "– 0.00"}
      </div>
    </motion.div>
  );
}
