import React from 'react';

const UploadExampleSection = () => (
  <div className="bg-white border-t px-4 py-6 flex flex-col gap-3">
    <div className="font-medium mb-2">
      Option 2. Upload an example of the data you need.
    </div>
    <div className="text-xs text-gray-600 mb-2">
      The example should contain several (two to three) rows of ideal sample data you want to get.
    </div>
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-start">
      <button className="bg-[#e6f4ef] text-[#4AA181] border border-[#4AA181] rounded px-4 py-2 font-medium text-sm text-center sm:w-auto w-full break-words">
        Paste data using copy from Excel, CSV, or Google Sheet
      </button>
      <button className="bg-[#4AA181] text-white rounded px-4 py-2 font-medium text-sm text-center sm:w-auto w-full">
        Upload a file
      </button>
    </div>
  </div>
);

export default UploadExampleSection;
