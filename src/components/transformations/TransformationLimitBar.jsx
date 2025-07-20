import React from 'react';
const TransformationLimitBar = ({ used, total }) => (
  <div className="w-full text-white  px-2 py-2 text-sm font-medium">
    Transformations left in this month: <span className="font-bold">{used}</span> of <span className="font-bold">{total}</span>
  </div>
);
export default TransformationLimitBar; 