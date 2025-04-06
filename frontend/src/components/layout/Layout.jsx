import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-0">{children}</main>
    </div>
  );
};

export default Layout;
