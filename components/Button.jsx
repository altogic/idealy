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
        `inline-flex items-center justify-center gap-2 py-2.5 px-4 tracking-sm border rounded-md transition focus:outline-none`,
        size === 'sm' ? 'text-sm' : '',
        size === 'base' ? 'text-base' : '',
        height === '44' ? 'h-11' : '',
        fullWidth ? 'w-full' : '',
        loading ? 'opacity-50 cursor-not-allowed' : null,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        variant === 'icon' ? 'border-0 px-0 py-0' : '',
        variant === 'blank' ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100' : '',
        variant === 'blankRed' ? 'bg-white text-red-700 border-red-300 hover:bg-red-100' : '',
        variant === 'red' ? 'bg-red-600 text-white border-transparent hover:bg-red-700' : '',
        variant === 'indigo'
          ? 'bg-indigo-700 dark:bg-aa-700 purple:bg-pt-700 dark:border-pt-600 purple:border-pt-400 text-white border-transparent hover:bg-indigo-600'
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
  size: PropTypes.oneOf(['sm', 'base']),
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
  height: '44',
  fullWidth: false,
  disabled: false
};
