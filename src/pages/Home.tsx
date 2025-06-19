import { Footer } from "../components/Footer";
import clsx from "clsx";
import FuelCard from "../components/FuelCard";
import { Loading } from "../components/Loading";
import { chunkArray } from "../utilities/utils";
import { useFilteredFuelPrices } from "../hooks/useFilteredFuelPrices";

export const Home = () => {
  const { loading, error, regionFilter, setRegionFilter, combined } =
    useFilteredFuelPrices();

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section className="flex flex-1 flex-col items-center bg-gray-900 overflow-y-auto">
      <div className="sm:w-full p-4 lg:p-8 min-[1300px]:max-w-[35%] max-[1290px]:min-w-[95%]">
        {combined.length === 0 && (
          <p className="text-center text-gray-400">
            No fuel data available for {regionFilter}
          </p>
        )}

        <div className="flex flex-col bg-radial-[at_25%_25%] from-[#18243b71] to-[#101828] to-55% border-1 border-[#273c635b] rounded-4xl p-2 justify-center max-[700px]:mt-8 mt-10">
          <div className="flex flex-row justify-center mt-2 items-start">
            <h1 className="flex-1 pl-4 max-[700px]:pl-3 text-3xl font-bold text-[var(--color-blue-100)] lg:pl-5 mt-2 lg:flex-[1.2] max-[700px]:text-[1.7rem] max-[420px]:text-[1.4rem] max-[420px]:pt-1 text-nowrap">
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
                      "px-4 max-[700px]:px-2 py-1 max-[700px]:py-1.2 max-[420px]:py-1 rounded-full text-sm font-medium transition-all max-[700px]:text-[0.95rem] max-[420px]:text-[0.8rem]",
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
