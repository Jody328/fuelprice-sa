import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faChevronDown,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";

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
      className="sm:basis-1/2 sm:max-w-[50%] w-full bg-linear-to-br from-[#1f2f4d71] to-[#121b2c] to-60%  rounded-xl shadow-sm p-6 hover:shadow-sm"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="text-[#9fc7f9c2] uppercase tracking-wide text-sm mb-2">
            <FontAwesomeIcon icon={faGasPump} className="mr-1.5" />
            {fuelType}
          </div>
          <div className="text-3xl font-bold text-[var(--color-blue-100)]">
            R {Number(displayPrice).toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Last change: {formatDate(lastChange)}
          </div>
        </div>
        <div className="flex text-center text-white border-r-1 border-[#9fc7f9c2] opacity-10 max-[700px]:ml-2">
          <span className="content-center justify-center opacity-0">|</span>
        </div>
        <div className="flex flex-1 flex-col justify-start">
          <div className="flex-1 text-[#9fc7f9c2] uppercase text-center tracking-wide text-sm">
            <FontAwesomeIcon icon={faArrowTrendUp} className="mr-1.5" />
            Trend
          </div>
          <div className="flex flex-1 justify-center text-green-600">
            <FontAwesomeIcon icon={faChevronDown} size="3x" className="p-0" />
          </div>
          <div className="text-center">
            <span className="text-gray-300 font-medium text-xs mr-2">
              {priceDifference && priceDifference != "0.00"
                ? `${priceDifference}`
                : "- 0.00"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
