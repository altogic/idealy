import React from 'react';
import SectionTitle from '@/components/SectionTitle';

export default function Theme() {
  return (
    <>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Theme"
          sectionDescription="Customize the interface appearance for your customers."
          big
        />
      </div>
      <div className=" max-w-[472px]">
        <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <SectionTitle sectionTitle="Appearance" />
        </div>
        <div className="flex items-center gap-8 pb-6 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <button type="button" className="flex flex-col items-start gap-4">
            <img src="./light.png" alt="" />
            <span className="text-slate-900 text-base tracking-sm">Light</span>
          </button>
          <button type="button" className="flex flex-col items-start gap-4">
            <img src="./dark.png" alt="" />
            <span className="text-slate-900 text-base tracking-sm">Dark</span>
          </button>
          <button type="button" className="flex flex-col items-start gap-4">
            <img src="./purple.png" alt="" />
            <span className="text-slate-900 text-base tracking-sm">Purple</span>
          </button>
        </div>
      </div>
    </>
  );
}
