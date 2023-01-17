/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';

export default function ThemeChanger() {
  const [theme, setTheme] = useState('light');

  const switchTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = newTheme;
  };
  return (
    <>
      {/* The current theme is: {theme} */}
      <button
        type="button"
        onClick={() => switchTheme('')}
        className="w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-slate-300 border-2 border-slate-500"
      />
      <button
        type="button"
        onClick={() => switchTheme('dark')}
        className="w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-[#191F27] border-2 border-slate-500"
      />
      <button
        type="button"
        onClick={() => switchTheme('theme-purple')}
        className="w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-[#312E51] border-2 border-slate-500"
      />
    </>
  );
}
