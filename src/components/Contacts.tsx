import React from 'react';
import linksData from '../data/socialLinks.json';

type Social = {
  id: string;
  platform: string;
  icon: string;
  label: string;
  tagline: string;
  url: string;
};

const Card: React.FC<{ item: Social }> = ({ item }) => {
  // Map platform to icon (using emojis for consistency with your design)
  const iconMap: Record<string, string> = {
    Email: '✉️',
    LinkedIn: '💼',
    GitHub: '🚀',
    Twitter: '🐦',
  };

  return (
    <a
      href={item.url}
      target={item.url.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={item.platform}
      className="block group"
    >
      <div className="bg-green-200 border-[3px] border-gray-900 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Icon + Label Card */}
        <div className="flex items-center gap-3 bg-white border-[3px] border-gray-900 rounded-2xl px-5 py-3 w-fit mb-4">
          <span className="text-2xl">{iconMap[item.platform] || item.icon}</span>
          <span className="font-lilita text-lg text-gray-900">{item.label}</span>
        </div>
        
        {/* Tagline */}
        <p className="font-lilita text-base text-gray-900">{item.tagline}</p>
      </div>
    </a>
  );
};

const Contacts: React.FC = () => {
  const items = (linksData as { socialLinks: Social[] }).socialLinks;
  
  return (
    <section className="section bg-transparent py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="px-8 sm:px-6 lg:px-8 mb-12">
          <h2 className="font-lilita text-4xl sm:text-5xl lg:text-6xl text-gray-900">
            Contact
          </h2>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 sm:px-6 lg:px-8">
          {items.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;