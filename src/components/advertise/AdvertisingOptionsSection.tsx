
import AdvertisingOption from "./AdvertisingOption";

const AdvertisingOptionsSection = () => {
  const options = [
    {
      title: "Banner Ads",
      description: "Premium placement across our most popular pages with high visibility",
      features: [
        "Header & sidebar placements",
        "Desktop & mobile responsive",
        "Performance tracking"
      ]
    },
    {
      title: "Sponsored Content",
      description: "Native articles written by our team that feature your product or service",
      features: [
        "Custom article creation",
        "Homepage feature",
        "Social media promotion"
      ]
    },
    {
      title: "Newsletter Ads",
      description: "Reach our engaged subscriber base directly in their inbox",
      features: [
        "100k+ subscribers",
        "High open rates",
        "Targeted segments available"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Advertising Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <AdvertisingOption 
              key={index}
              title={option.title}
              description={option.description}
              features={option.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisingOptionsSection;
