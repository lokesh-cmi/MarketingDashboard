import React from 'react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function CategoryCard({ icon, title, description }: CategoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="text-gray-600">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
