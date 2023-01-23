import React, { useState, useEffect } from 'react';
import SectionTitle from '@/components/SectionTitle';
import { THEMES } from 'constants';
import ThemeButton from '@/components/ThemeButton';
import { useSelector, useDispatch } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import localStorageUtil from '@/utils/localStorageUtil';

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    if (company) {
      setSelectedTheme(company.theme);
    }
  }, [selectedTheme, company]);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorageUtil.set('theme', theme);
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        theme
      })
    );
  };

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
          {THEMES?.map((theme) => (
            <ThemeButton
              key={theme.id}
              theme={theme}
              onClick={() => handleThemeChange(theme.value)}
              isSelected={selectedTheme === theme.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}
