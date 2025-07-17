import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileSpreadsheet, FileText, Braces } from "lucide-react";

export default function HeaderComponent() {
  const [showSampleData, setShowSampleData] = useState(false);

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="flex flex-col gap-3 p-3 bg-gray-50 border-t border-gray-200 w-full lg:flex-row lg:items-center lg:justify-between">
      {/* Left side buttons - improved responsive text */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-700 bg-transparent w-full sm:w-auto whitespace-nowrap min-w-[200px] sm:min-w-0"
        >
          Update Google Sheet connection
        </Button>
        <Button
          variant="link"
          size="sm"
          className="text-blue-600 p-0 h-auto w-full sm:w-auto text-center whitespace-nowrap min-w-[180px] sm:min-w-0"
        >
          Reload Sample/Template
        </Button>
      </div>
  
      {/* Center checkbox */}
      <div className="flex items-center space-x-2 justify-center lg:justify-center w-full lg:w-auto">
        <Checkbox
          id="show-sample-data"
          checked={showSampleData}
          onCheckedChange={setShowSampleData}
        />
        <label
          htmlFor="show-sample-data"
          className="text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
        >
          Show sample data
        </label>
      </div>
  
      {/* Right side export dropdown */}
      <div className="flex justify-center w-full lg:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full lg:w-auto min-w-[100px]">
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem onClick={() => handleExport("EXCEL")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              EXCEL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("CSV")}>
              <FileText className="mr-2 h-4 w-4" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("JSON")}>
              <Braces className="mr-2 h-4 w-4" />
              JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}