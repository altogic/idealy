import cx from 'classnames';
import Emoji from './Emoji';

export default function AnnouncementButton({ symbol, label, active, ...props }) {
  return (
    <button
      type="button"
      className={cx('hover:bg-slate-100 font-bold py-1 px-2 rounded', active && 'bg-slate-100')}
      {...props}>
      <Emoji symbol={symbol} label={label} />
    </button>
  );
}
