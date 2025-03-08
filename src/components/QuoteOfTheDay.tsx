
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

// Sample quotes
const quotes = [
  {
    text: "Naija no dey carry last. We always find a way to shine!",
    author: "Nigerian Proverb"
  },
  {
    text: "No matter how far the stream flows, it never forgets its source.",
    author: "African Proverb"
  },
  {
    text: "E be like say money call you, you put am for silent.",
    author: "Street Wisdom"
  },
  {
    text: "Time na money, but money no be time. Once time don go, e don go!",
    author: "Naija Wisdom"
  },
  {
    text: "When life give you lemon, add small sugar and water make e sweet.",
    author: "Lagos Hustler"
  },
  {
    text: "Person wey no know where e dey go, any road go carry am go somewhere.",
    author: "Nigerian Philosophy"
  }
];

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(quotes[0]);
  
  useEffect(() => {
    // Get random quote from our list
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="bg-naija-lightGreen p-6 rounded-xl shadow-sm border border-naija-green/20">
      <div className="flex flex-col items-center text-center">
        <Quote className="text-naija-green mb-4" size={32} />
        <p className="text-xl font-medium italic mb-3">"{quote.text}"</p>
        <p className="text-sm text-gray-600">— {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
