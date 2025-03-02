import React from 'react';

const SkeletonRecipeCard = () => {
  return (
    <div className="bg-[#191919] rounded-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-700"></div>
      
      <div className="p-4">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        
        {/* Description placeholder */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
        
        {/* Rating and cook time placeholder */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-700 rounded w-20"></div>
          <div className="h-4 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRecipeCard; 