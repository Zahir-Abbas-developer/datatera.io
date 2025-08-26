import React, { useState } from "react";
import { Button } from "../../components/ui/button";

export default function HeaderComponent() {
  const [activeTab, setActiveTab] = useState("useful-saas");

  return (
    <header className="flex flex-nowrap items-center justify-between gap-2 px-3 py-2 bg-white border-b border-gray-200 overflow-x-auto">
      {/* Navigation Buttons - now with horizontal scrolling if needed */}
      <nav className="flex flex-nowrap items-center gap-2 sm:gap-4 whitespace-nowrap">
        {[
          { label: "Useful SaaS", value: "useful-saas" },
          { label: "History", value: "history" },
          { label: "Exporting", value: "exporting" },
          { label: "Export Logs", value: "export-logs" },
        ].map((tab) => (
          <Button
            key={tab.value}
            variant="link"
            className={`text-xs sm:text-sm md:text-base font-medium px-2 py-1 ${
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

      {/* Right Section - also adjusted for small screens */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap">
          VIEW DEMO
        </Button>
      </div>
    </header>
  );
}