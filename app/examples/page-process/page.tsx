'use client';
import React, { useState } from 'react';
import Process1 from './page1';
import Process2 from './page2';
import Process3 from './page3';

export default function ProcessPage() {
    const [activeProcess, setActiveProcess] = useState<number | null>(null);

    const renderContent = () => {
        switch (activeProcess) {
            case 1:
                return <Process1 />;
            case 2:
                return <Process2 />;
            case 3:
                return <Process3 />;
            default:
                return <div>Please select a process to view</div>;
        }
    };

    return (
        <div className="p-4">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setActiveProcess(1)}
                    className={`px-4 py-2 rounded ${
                        activeProcess === 1 ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white hover:bg-blue-600`}
                >
                    Process 1
                </button>
                <button
                    onClick={() => setActiveProcess(2)}
                    className={`px-4 py-2 rounded ${
                        activeProcess === 2 ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white hover:bg-blue-600`}
                >
                    Process 2
                </button>
                <button
                    onClick={() => setActiveProcess(3)}
                    className={`px-4 py-2 rounded ${
                        activeProcess === 3 ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white hover:bg-blue-600`}
                >
                    Process 3
                </button>
            </div>
            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    );
}