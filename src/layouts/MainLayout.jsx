import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl text-white font-bold mb-4">Main Content</h2>
        <p className="text-white">
          This is where your main content will be displayed.
        </p>
        {/* Extra height to demonstrate scrolling */}
        <div className="h-[200vh]"></div>
      </main>
    </div>
  );
}

export default MainLayout;
