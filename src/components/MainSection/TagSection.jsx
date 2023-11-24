
const tags = ['General', 'Technology', 'Movies', 'Music', 'Gaming', 'Sports'];

const TagSection = () => {
  return (
    <div className="bg-gray-200 py-8 my-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center">Explore by Tags</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded-full transition duration-300 focus:outline-none focus:shadow-outline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSection;