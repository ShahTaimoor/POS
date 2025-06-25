import AppSidebar from '../AppSidebar';
import Navbar from '../Navbar';

const RootLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar is fixed, so add padding top to compensate */}
      <Navbar />
      
      {/* Sidebar for mobile */}
      <AppSidebar />

      {/* Main content */}
      <main className="mt-16 p-4">{children}</main>
    </div>
  );
};

export default RootLayout;
