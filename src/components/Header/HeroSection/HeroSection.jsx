
const HeroSection = () => {
    return (
        <div
        className="relative bg-cover bg-center h-96 sm:h-80 md:h-96 lg:h-120 xl:h-160"
        style={{ backgroundImage: 'url("https://i.ibb.co/Bt4hDRq/Downloader-La-e-PSso-Yx-Ag-O.png")' }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 text-center">
             Forum Search
          </h1>
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-full bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button className="absolute right-0 top-0 mt-2 mr-3 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
};

export default HeroSection;