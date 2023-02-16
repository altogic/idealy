import Link from 'next/link';
import Avatar from './Avatar';

export default function UserCard({ name, profilePicture, email, className, style }) {
  return (
    <div
      className={`user-card absolute hidden items-center justify-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-aa-900 purple:bg-pt-1000 dark:border-aa-600 purple:border-pt-800 ${className}`}
      style={style}>
      <Avatar src={profilePicture} alt={name} />
      <div className="flex flex-col gap-1">
        <h5 className="text-sm text-slate-900 dark:text-aa-100 purple:text-pt-100">{name}</h5>
        <span className="text-xs text-slate-500 dark:text-aa-200 purple:text-pt-200">{email}</span>
      </div>

      <Link href="/users">
        <a className="text-sm inline-flex items-center justify-center gap-2 tracking-sm border rounded-md transition ease-linear duration-200 focus:outline-none h-8 py-2.5 px-4 bg-indigo-700 dark:bg-aa-700 purple:bg-pt-700 text-white dark:text-aa-100 purple:text-pt-100 border-transparent dark:border-aa-600 purple:border-pt-800 hover:bg-indigo-600 dark:hover:bg-aa-500 purple:hover:bg-pt-600">
          <span className="whitespace-nowrap">View Profile</span>
        </a>
      </Link>
    </div>
  );
}
