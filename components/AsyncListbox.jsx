import localStorageUtil from '@/utils/localStorageUtil';
import AsyncSelect from 'react-select/async';

export default function AsyncListbox({
  loadOptions,
  onChange,
  placeholder,
  defaultValue,
  formatOptionLabel,
  ...rest
}) {
  const theme = localStorageUtil.get('theme');
  const memberSelectStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      border: '1px solid #e4e4e4',
      borderRadius: '0.375rem'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#CDCECF' : theme === 'theme-purple' ? '#D7D6EA' : '#64748b'
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      height: '100%',
      border: 'none',
      backgroundColor: 'transparent',
      'box-shadow': 'none',
      '&:hover': {
        borderColor: '#e4e4e4'
      },
      '&:focus': {
        borderColor: '#e4e4e4'
      }
    }),
    option: (provided) => ({
      ...provided,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      backgroundColor: theme === 'dark' ? '#202630' : theme === 'theme-purple' ? '#464174' : '#fff',
      color: theme === 'dark' ? '#CDCECF' : theme === 'theme-purple' ? '#D7D6EA' : '#64748b',
      '&:hover': {
        backgroundColor:
          theme === 'dark' ? '#2b3940' : theme === 'theme-purple' ? '#4f4c7a' : '#f4f5f7',
        color: theme === 'dark' ? '#fff' : theme === 'theme-purple' ? '#fff' : '#000'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#202630' : theme === 'theme-purple' ? '#464174' : '#fff',
      maxHeight: '120px',
      overflow: 'auto'
    }),
    input: (provided) => ({
      ...provided,

      width: '100%',
      height: '100%',
      '& input': {
        'min-width': '15rem',
        'background-color': 'transparent',
        border: 'none',
        '&:focus': {
          outline: 'none',
          'box-shadow': 'none'
        }
      }
    })
  };
  return (
    <AsyncSelect
      className="relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-w-[auto] md:min-w-[275px] py-1"
      cacheOptions
      defaultOptions
      value={defaultValue}
      loadOptions={loadOptions}
      placeholder={placeholder}
      isClearable
      onChange={onChange}
      styles={memberSelectStyles}
      formatOptionLabel={formatOptionLabel}
      {...rest}
    />
  );
}
