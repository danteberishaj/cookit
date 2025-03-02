import React, { useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Search Recipes</h2>
      <div className="max-w-2xl mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="w-full px-4 py-2 rounded-lg bg-[#191919] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search results will go here */}
        <div className="bg-[#191919] p-4 rounded-lg">
          <p className="text-gray-400">Enter a search term to find recipes</p>
        </div>
      </div>
    </div>
  );
};

export default Search; 