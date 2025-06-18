export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center bg-gray-900 overflow-y-auto pb-8 max-[420px]:px-5">
      <div
        role="status"
        className="flex justify-center flex-col space-y-8 max-[420px]:space-y-4 max-[420px]:py-8 max-[420px]:mt-12 border-2 divide-y shadow-sm animate-pulse divide-gray-700 border-[#273c635b] rounded-4xl min-w-[35%] min-h-[50%] sm:w-full p-4 lg:p-8 min-[1300px]:max-w-[35%] max-[1290px]:min-w-[95%] mt-20"
      >
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 rounded-full bg-gray-700"></div>
          </div>
          <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
        </div>
        <span className="sr-only">Loading fuel prices...</span>
      </div>
    </div>
  );
}
