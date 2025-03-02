import React from 'react';

const Featured = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Featured Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#191919] rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-4">
            <h3 className="text-xl mb-2">Homemade Pizza</h3>
            <p className="text-gray-400 mb-2">Classic Italian pizza with a crispy crust</p>
            <div className="flex items-center text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span className="mx-2">•</span>
              <span>45 mins</span>
            </div>
          </div>
        </div>
        <div className="bg-[#191919] rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-4">
            <h3 className="text-xl mb-2">Chicken Curry</h3>
            <p className="text-gray-400 mb-2">Spicy Indian-style curry with tender chicken</p>
            <div className="flex items-center text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span className="mx-2">•</span>
              <span>60 mins</span>
            </div>
          </div>
        </div>
        <div className="bg-[#191919] rounded-lg overflow-hidden">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-4">
            <h3 className="text-xl mb-2">Chocolate Cake</h3>
            <p className="text-gray-400 mb-2">Rich and moist chocolate dessert</p>
            <div className="flex items-center text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span className="mx-2">•</span>
              <span>90 mins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured; 