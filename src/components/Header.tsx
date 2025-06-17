import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  return (
    <header className="bg-[#111722] flex-[0.05] border-b-1 border-[#0a0d1099] drop-shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-items-start space-x-2">
          <div>
            <FontAwesomeIcon icon={faLeaf} color="white" size={"sm"} />
          </div>
          <div className="md:flex md:items-top md:gap-12">
            <h2 className="font-bold text-white text-[18px]">FuelPrice SA</h2>
          </div>
        </div>
      </div>
    </header>
  );
};
