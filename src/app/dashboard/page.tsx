import Dashboard from "../(admin)/component/dashboard/page";
import Sidebar from "../(admin)/component/sidebar/page";

export default function Home() {
    return (
      <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/Image/banner-bg.jpg")' }}>
        <Sidebar />
        <Dashboard />
        
      </div>
    );
  }