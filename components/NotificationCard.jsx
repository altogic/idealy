export default function NotificationCard({ text, date }) {
  return (
    <div className="flex flex-col px-8 py-6 transition hover:bg-slate-50">
      <p className="text-slate-700 mb-2 text-base tracking-sm">{text}</p>
      <span className="text-slate-500 text-sm tracking-sm">{date}</span>
    </div>
  );
}
