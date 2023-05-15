import SectionTitle from '@/components/SectionTitle';
import ThemeButton from '@/components/ThemeButton';
import { companyActions } from '@/redux/company/companySlice';
import localStorageUtil from '@/utils/localStorageUtil';
import { THEMES } from 'constants';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Theme() {
  const selectedTheme = useRef();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);
  useEffect(() => {
    if (company?.theme) {
      selectedTheme.current = company.theme;
    }
  }, [selectedTheme, company?.theme]);

  const handleThemeChange = (theme) => {
    selectedTheme.current = theme;
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
      <div className=" max-w-[600px]">
        <div className="pb-4 mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          <SectionTitle sectionTitle="Appearance" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-6 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
          {THEMES?.map((theme) => (
            <ThemeButton
              key={theme.id}
              theme={theme}
              onClick={() => handleThemeChange(theme.value)}
              isSelected={selectedTheme.current === theme.value}
            />
          ))}
        </div>
      </div>
    </>
  );
}
