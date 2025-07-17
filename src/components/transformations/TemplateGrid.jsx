import React from 'react';
import TemplateCard from './TemplateCard';

// Use your real icons or keep the placeholder
const icon = (
  <svg className="w-6 h-6 text-[#4AA181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M8 12h8M8 16h8M8 8h8" strokeWidth="2" />
  </svg>
);

const templates = [
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  {
    title: "List of Investors",
    description: `A list that allows you to load investor lists.
The list is also needed so that in the next step Datatera.ai can follow each link and load the extended investor card!
Fields:
- Information source (hyperlink or file name)
- Name of the investor (e.g., John Wick)
- Link to the investor’s personal page
Example to download:
https://mercury.com/investor-database#investor-table`,
    icon,
  },
  
];

const TemplateGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-2 bg-[#f8fafc] border-b">
    {templates.map((tpl, idx) => (
      <TemplateCard key={idx} {...tpl} />
    ))}
  </div>
);

export default TemplateGrid;