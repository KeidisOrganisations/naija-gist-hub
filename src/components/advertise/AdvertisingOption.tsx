
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvertisingOptionProps {
  title: string;
  description: string;
  features: string[];
}

const AdvertisingOption = ({ title, description, features }: AdvertisingOptionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="text-naija-green mr-2 h-5 w-5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant="outline">Learn More</Button>
    </div>
  );
};

export default AdvertisingOption;
