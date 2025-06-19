import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <footer className="flex-[0.2] bg-gray-900 w-full">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mt-16 border-t pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24 border-gray-800">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <div className="flex flex-row transition hover:opacity-75 text-gray-400">
              <div>
                <a href="#">Buy me a coffee</a>
              </div>
              <div className="pl-2 ">
                <FontAwesomeIcon
                  icon={faMugHot}
                  color="var(--color-gray-400)"
                />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </footer>
  );
};
