
import { Book, DollarSign, Briefcase, Smartphone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

type CategoryData = {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  slug: string;
};

const categories: CategoryData[] = [
  {
    title: "Finance",
    description: "Money matters, investments, and cost-saving tips",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
    slug: "finance"
  },
  {
    title: "Education",
    description: "Learning resources and academic advice",
    icon: Book,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    slug: "education"
  },
  {
    title: "Tech",
    description: "Gadgets, apps, and digital solutions",
    icon: Smartphone,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    slug: "tech"
  },
  {
    title: "Business",
    description: "Entrepreneurship and career development",
    icon: Briefcase,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    slug: "business"
  },
  {
    title: "Life",
    description: "Relationships, health, and everyday hacks",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-100",
    slug: "life"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">Explore Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find guides for every area of your life. Just click and learn!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.title}
              to={`/category/${category.slug}`}
              className="block group p-6 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${category.bgColor} ${category.color} group-hover:scale-110 transition-transform`}>
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading">{category.title}</h3>
                  <p className="text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
