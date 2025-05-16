import Category from "@/app/(admin)/component/category/page";
import Sidebar from "@/app/(admin)/component/sidebar/page";
import React from "react";

import User from "../(admin)/component/users/page";
export default function UserPage() {
    return (
        <div>
            <Sidebar />
            <User />
        </div>
    );
}
