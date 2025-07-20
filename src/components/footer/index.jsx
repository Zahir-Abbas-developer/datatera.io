import React, { useState } from "react";
import { Button } from "@/components/ui/button";


export default function FooterComponent() {
  const [activeTab, setActiveTab] = useState("useful-saas");


  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-white border-b border-gray-200">
      {/* Navigation Buttons */}
      <nav className="flex flex-wrap items-center gap-3 sm:gap-5">
        {[
          { label: "Useful SaaS", value: "useful-saas" },
          { label: "History", value: "history" },
          { label: "Exporting", value: "exporting" },
          { label: "Export Logs", value: "export-logs" },
        ].map((tab) => (
          <Button
            key={tab.value}
            variant="link"
            className={`text-sm sm:text-base font-medium ${
              activeTab === tab.value
                ? "text-green-600 font-semibold"
                : "text-gray-600 hover:text-green-600"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Button>
        ))}
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm sm:text-base font-semibold">
          VIEW DEMO
        </Button>
      
      </div>
    </header>
  );
}
