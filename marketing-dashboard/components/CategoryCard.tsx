import React from 'react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({ icon, title, description, isActive = false, onClick }: CategoryCardProps) {
  return (
    <div 
      className={`border rounded-lg p-6 hover:shadow-md transition-all cursor-pointer ${
        isActive 
          ? 'bg-blue-50 border-blue-500 border-2' 
          : 'bg-white border-gray-200'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
          {icon}
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-1 ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
