import cn from 'classnames';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Button({
  text,
  icon,
  variant,
  size,
  type,
  height,
  fullWidth,
  disabled,
  loading,
  ...props
}) {
  const override = css`
    display: block;
    margin-inline: 1rem;
  `;
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={cn(
        `inline-flex items-center justify-center gap-2 py-2.5 px-4 tracking-sm border rounded-md transition ease-linear duration-200 focus:outline-none`,
        `text-${size}`,
        height ? `h-${height}` : '',
        fullWidth ? 'w-full' : '',
        loading ? 'opacity-50 cursor-not-allowed' : null,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        variant === 'icon' ? 'border-0 px-0 py-0' : '',
        variant === 'blank'
          ? 'bg-white dark:bg-aa-400 purple:bg-pt-400 text-gray-700 dark:text-aa-100 purple:text-pt-100 border-gray-300 hover:bg-gray-100'
          : '',
        variant === 'blankRed'
          ? 'bg-white dark:bg-aa-900 purple:bg-pt-900 text-red-700 dark:text-aa-200 purple:text-pt-200 border-red-300 dark:border-aa-500 purple:border-pt-500 hover:bg-red-100'
          : '',
        variant === 'red'
          ? 'bg-red-600 dark:bg-red-900 purple:bg-red-900 text-white border-transparent hover:bg-red-700'
          : '',
        variant === 'indigo'
          ? 'bg-indigo-700 dark:bg-aa-700 purple:bg-pt-700 text-white dark:text-aa-100 purple:text-pt-100 border-transparent hover:bg-indigo-600 dark:hover:bg-aa-600 purple:hover:bg-pt-600'
          : ''
      )}
      {...props}
      disabled={loading || disabled}>
      {icon || null}
      {loading ? (
        <ClipLoader color="#fff" loading={loading} size={20} css={override} />
      ) : (
        <span className="whitespace-nowrap">{text}</span>
      )}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['blank', 'blankRed', 'red', 'indigo', 'icon']),
  size: PropTypes.oneOf(['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
};
Button.defaultProps = {
  text: '',
  icon: null,
  variant: 'blank',
  size: 'base',
  type: 'button',
  height: '11',
  fullWidth: false,
  disabled: false
};
