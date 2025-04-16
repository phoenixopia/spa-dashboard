import Category from "@/app/(admin)/component/category/page";
import Sidebar from "@/app/(admin)/component/sidebar/page";
import React from "react";
import Booking from "@/app/(admin)/component/booking/page";


export default function UserPage() {
    return (
        <div>
            <Sidebar />
            <Booking />
        </div>
    );
}
