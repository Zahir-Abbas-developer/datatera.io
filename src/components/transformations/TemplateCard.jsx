import React from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ title, description, icon }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/transformation-table')} 
      className="bg-white border border-gray-200 rounded-xl p-2 flex flex-col gap-2 shadow-sm min-h-[180px] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#e6f4ef]">
          {icon}
        </div>
        <span className="font-semibold text-lg text-gray-900">{title}</span>
      </div>
      <div className="text-xs text-gray-600 leading-snug whitespace-pre-line">{description}</div>
    </div>
  );
};

export default TemplateCard;