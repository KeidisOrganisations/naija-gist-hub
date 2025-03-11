
const StatsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-naija-green mb-2">2M+</p>
            <p className="text-gray-600">Monthly Visitors</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-naija-green mb-2">5M+</p>
            <p className="text-gray-600">Page Views</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-4xl font-bold text-naija-green mb-2">15min</p>
            <p className="text-gray-600">Avg. Time on Site</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
