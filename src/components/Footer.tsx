import DisclaimerModal from "./DisclaimerModal";

export const Footer = () => {
  return (
    <footer className="flex-[0.2] bg-gray-900 w-full">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="mt-16 border-t pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24 border-gray-800">
          <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
            <DisclaimerModal />
          </ul>
        </div>
      </div>
    </footer>
  );
};
