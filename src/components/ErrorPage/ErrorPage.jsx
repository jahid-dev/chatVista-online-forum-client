

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center mx-auto">
            <section className="bg-gray-100 py-16">
                <div className="container">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-4xl font-semibold text-gray-800">
                            404 - Page Not Found
                        </h2>
                        <h4 className="text-xl font-semibold text-gray-600 mt-4">
                            Oops! That page cannot be found.
                        </h4>
                        <p className="text-gray-600 mt-4">
                            The page you are looking for may have been deleted.
                        </p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 mt-8 text-base font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300"
                        >
                            Go to Home
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
