import React from 'react';

export default function EditorSideBarButton({ id, name, description, Icon, onClick }) {
  return (
    <li className="rounded-sm px-3 py-2 hover:bg-slate-50 dark:hover:bg-aa-600 purple:hover:bg-pt-700">
      <button
        type="button"
        id={id}
        onClick={onClick}
        className="w-full flex items-center space-x-5">
        <div className=" border border-slate-200 dark:border-aa-400 purple:border-pt-400 p-2 rounded-sm">
          <Icon className="w-5 h-5 icon" />
        </div>
        <div className="text-left">
          <h4 className="text-slate-800 dark:text-aa-200 purple:text-pt-200 text-lg font-semibold tracking-sm">
            {name}
          </h4>
          <p className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-sm tracking-sm">
            {description}
          </p>
        </div>
      </button>
    </li>
  );
}
