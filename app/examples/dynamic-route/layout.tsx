"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout() {
    const [value, setValue] = useState('');
    const router = useRouter();

    const handleNavigate = () => {
        alert(value);
        if (value) {
            router.push(`/examples/dynamic-route/${value}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-4 bg-gray-200 fixed top-0 left-0 w-full flex justify-center">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border p-2 rounded-md mr-2"
                    placeholder="Sayı giriniz"
                />
                <button
                    onClick={handleNavigate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Git
                </button>
            </div>

            {/* ✅ Sayfa içeriği (altındaki sayfa bileşeni buraya gelir) */}
            {/* <div className="mt-16 p-4">
                {children}
            </div> */}
        </div>
    );
}
