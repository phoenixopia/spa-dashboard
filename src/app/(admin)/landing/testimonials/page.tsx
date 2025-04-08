import Sidebar from "../../component/sidebar/page";

export default function UserPage() {
    return(
        <div>
            <Sidebar/>
        <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/Image/banner-bg.jpg")' }}>
            <div className="p-6 space-y-4 ml-[260px]">
                <div className="max-w-6xl w-full mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Testi</h2>
                    <div className="flex justify-between items-center mb-6">
                        <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Total Users</h5>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">8</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
     );
}