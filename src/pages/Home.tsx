import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../components/Footer";
import { useFuelPriceChanges } from "../hooks/useFuelPrices";

export const Home = () => {
  const { data, loading, error } = useFuelPriceChanges();

  if (loading) return <p>Loading fuel prices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-1 flex-col justify-center bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="flex justify-center max-[700px]:pt-20">
        <span className="rounded-full bg-blue-100 p-13 text-blue-600 dark:bg-[#4b71b126] dark:text-blue-400 shadow-md shadow-[#0000006e] border-1 border-[#4cb9f01f]">
          <FontAwesomeIcon
            icon={faGasPump}
            size="5x"
            color="var(--color-blue-100)"
          />
        </span>
      </div>
      <div className="min-[450px]:p-8 max-[450px]:p-4 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Latest Prices
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <div className="flex flex-1 justify-center min-[450px]:space-x-5">
            <div className="min-[450px]:flex-1 max-[450px]:px-5 bg-radial-[at_25%_25%] from-[#398ab32d] to-[#16212e] to-55% border-1 border-[#4cb9f01f] rounded-xl p-4 flex justify-center mb-6 shadow-lg shadow-[#04040469]">
              <div className="flex-1 flex flex-col text-left justify-center">
                <div className="flex-1.5 text-[#9fc7f9c2] max-[450px]:text-[12px] text-md">
                  Unleaded 95
                </div>
                <div className="flex-1 flex flex-row max-[620px]:flex-col items-baseline max-[450px]:items-start max-[620px]:gap-2">
                  <div className="max-[450px]:flex-0 flex-1 max-[450px]:text-3xl text-4xl font-bold text-[var(--color-blue-100)]">
                    R 20.41
                  </div>
                  <div className="flex-1.5 inline-flex gap-2 rounded-sm p-1 bg-green-700 text-green-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      />
                    </svg>
                    <span className="text-xs font-medium"> 67.81% </span>
                  </div>
                </div>
              </div>

              <div className="flex-0.5 px-3">
                <div className="w-[0.5px] shadow-lg shadow-black bg-[#3c567338] border-l-[0.5px] border-[#10101000] h-18 max-[450px]:h-21"></div>
              </div>

              <div className="flex-1 flex flex-col text-left justify-center">
                <div className="flex-1.5 text-[#9fc7f9c2] max-[450px]:text-[12px] text-md">
                  Diesel
                </div>
                <div className="flex-1 flex flex-row max-[620px]:flex-col items-baseline max-[450px]:items-start max-[620px]:gap-2">
                  <div className="max-[450px]:flex-0 flex-1 max-[450px]:text-3xl text-4xl font-bold text-[var(--color-blue-100)]">
                    R 17.81
                  </div>
                  <div className="flex-1.5 inline-flex gap-2 rounded-sm  p-1 bg-red-700 text-red-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    <span className="text-xs font-medium"> 67.81% </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
