import React from 'react';

const Home = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Featured Recipes</h3>
          <p>Discover our most popular recipes</p>
        </div>
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Recent Activity</h3>
          <p>See what's cooking in the community</p>
        </div>
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Trending</h3>
          <p>Check out what's hot right now</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 