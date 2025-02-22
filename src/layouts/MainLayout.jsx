import Logo from "../vectors/logo"

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="p-4 flex items-center">
        <Logo />
      </header>
      
      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-white">Dashboard</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">Profile</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">Settings</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-bold mb-4">Main Content</h2>
          <p>
            This is where your main content will be displayed.
          </p>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;