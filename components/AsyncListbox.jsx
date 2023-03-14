import AsyncSelect from 'react-select/async';

const memberSelectStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    border: '1px solid #e4e4e4',
    borderRadius: '0.375rem'
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    height: '100%',
    border: 'none',
    'box-shadow': 'none',
    '&:hover': {
      borderColor: '#e4e4e4'
    },
    '&:focus': {
      borderColor: '#e4e4e4'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#e4e4e4' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#e4e4e4'
    }
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
    width: '100%',
    height: '100%',
    '& input': {
      color: 'black',
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

export default function AsyncListbox({
  loadOptions,
  onChange,
  placeholder,
  defaultValue,
  formatOptionLabel,
  ...rest
}) {
  return (
    <AsyncSelect
      className="relative flex items-center bg-white dark:bg-aa-700 purple:bg-pt-700 justify-between gap-2 w-full border border-slate-300 dark:border-aa-400 purple:border-pt-400 rounded-lg text-left cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm min-w-[auto] md:min-w-[300px] py-1"
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
