// pages/index.tsx

import Image from "next/image";
import Link from "next/link";
import Sidebar from "./(admin)/component/sidebar/page";
import LoginPage from "./(admin)/component/login/page";




export default function Home() {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/Image/banner-bg.jpg")' }}>
 <LoginPage />      
    </div>
  );
}
