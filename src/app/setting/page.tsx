import UserSettings from "../(admin)/component/setting/page";
import Setting from "../(admin)/component/setting/page";
import Sidebar from "../(admin)/component/sidebar/page";

export default function UserPage() {
    return(
        <div>
            <Sidebar/>
        <UserSettings/>
        </div>
     );
}