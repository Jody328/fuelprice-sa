import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  return (
    <section className="flex flex-1 flex-col justify-center bg-gray-50 dark:bg-gray-900">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Latest Prices
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-xl">
          <div className="flex flex-1 justify-center space-x-5">
            {/* Latest Prices Section */}
            <div className="bg-radial-[at_25%_25%] from-[#398ab32d] to-[#16212e] to-55% border-1 border-[#4cb9f01f] rounded-xl p-4 flex justify-between space-x-2 items-center mb-6 shadow-lg shadow-[#04040469]">
              <div className="text-left pr-2">
                <div className="text-3xl font-bold text-white">R 20.41</div>
                <div className="text-[#9fc7f9c2] mt-1 text-sm">
                  Petrol Unleaded 95
                </div>
              </div>

              <div className="w-[0.5px] shadow-lg shadow-black bg-[#3c567338] border-l-[0.5px] border-[#10101000] h-15"></div>

              <div className="text-left pl-2">
                <div className="text-3xl font-bold text-white">R 17.81</div>
                <div className="text-[#9fc7f9c2] mt-1 text-sm">Diesel</div>
              </div>
            </div>
            {/* <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <span className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <FontAwesomeIcon icon={faGasPump} size="2x" />
              </span>

              <div>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  $240.94
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unleaded 95
                </p>
              </div>
            </article>

            <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <span className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <FontAwesomeIcon icon={faGasPump} size="2x" />
              </span>

              <div>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  $240.94
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Diesel
                </p>
              </div>
            </article> */}
          </div>
        </div>
      </div>
    </section>
  );
};
