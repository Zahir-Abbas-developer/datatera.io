import React from 'react';
import TransformationLimitBar from './TransformationLimitBar';
import TemplateGrid from './TemplateGrid';
import UploadExampleSection from './UploadExampleSection';
import CreateFromScratchSection from './CreateFromScratchSection';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { ChevronDown } from 'lucide-react';

const CustomAccordionTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <AccordionTrigger
    ref={ref}
    className="flex items-center justify-between w-full px-6 py-4 text-base font-semibold bg-gray-50 hover:bg-gray-100 rounded-t-lg transition-colors border-b border-gray-200 focus:outline-none"
    {...props}
  >
    <span>{children}</span>
    {/* <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-200 accordion-chevron" /> */}
  </AccordionTrigger>
));

const TransformationTemplatesPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-1">
    <div className="w-full bg-gray-100 rounded-xl shadow-lg border">
     
      <Accordion type="multiple" className="w-full px-4 pb-8 space-y-6 py-4">
        <AccordionItem value="templates" className="rounded-lg shadow border bg-white overflow-hidden">
          <CustomAccordionTrigger>Option 1. Choose a Template</CustomAccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white rounded-b-lg">
            <TemplateGrid />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="upload" className="rounded-lg shadow border bg-white overflow-hidden">
          <CustomAccordionTrigger>Option 2. Upload Example</CustomAccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white rounded-b-lg">
            <UploadExampleSection />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="scratch" className="rounded-lg shadow border bg-white overflow-hidden">
          <CustomAccordionTrigger>Option 3. Create From Scratch</CustomAccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white rounded-b-lg">
            <CreateFromScratchSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    <style>{`
      .accordion-chevron[data-state="open"] {
        transform: rotate(180deg);
      }
    `}</style>
  </div>
);

export default TransformationTemplatesPage; 