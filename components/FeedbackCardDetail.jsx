import { useState } from 'react';
import ButtonBadge from './ButtonBadge';
import DeleteModal from './DeleteModal';
import { Pen, Trash, Reply, Spam, Danger } from './icons';

export default function FeedbackCardDetail({
  avatar,
  name,
  date,
  firstButton,
  secondButton,
  thirdButton,
  fourthButton,
  fifthButton
}) {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <div className="group">
        <div className="flex items-center gap-2 mb-2">
          <img className="w-6 h-6 rounded-full" src={avatar} alt={name} />
          <span className="text-slate-800 text-base tracking-sm">{name}</span>
        </div>
        <div className="prose prose-p:text-slate-500 prose-p:mb-5 last:prose-p:mb-0 prose-p:text-sm prose-p:leading-5 prose-p:tracking-sm max-w-full mb-6">
          <p>
            Urna, mi pharetra, lobortis felis ut sed nulla. Non ut fermentum proin cursus cursus.
            Sapien, ridiculus suspendisse porttitor sem laoreet neque amet mi. Phasellus enim arcu
            quisque rhoncus a sodales volutpat. In vitae volutpat nibh eget sed dolor molestie est.
            Amet id mattis eu mauris arcu ac viverra feugiat. Et varius semper nunc habitant turpis
            ac eget. Tortor egestas a adipiscing neque quisque velit cras.
          </p>
          <p>
            Urna, mi pharetra, lobortis felis ut sed nulla. Non ut fermentum proin cursus cursus.
            Sapien, ridiculus suspendisse porttitor sem laoreet neque amet mi. Phasellus enim arcu
            quisque rhoncus a sodales volutpat. In vitae volutpat nibh eget sed dolor molestie est.
            Amet id mattis eu mauris arcu ac viverra feugiat. Et varius semper nunc habitant turpis
            ac eget. Tortor egestas a adipiscing neque quisque velit cras.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block text-slate-400 py-1 text-xs tracking-sm">{date}</span>
          {/* opacity-0 group-hover:opacity-100 */}
          <div className="flex items-center gap-3 transition opacity-0 group-hover:opacity-100">
            {/* Edit Button */}
            <ButtonBadge icon={<Pen className="w-3 h-3 text-gray-500" />} name={firstButton} />
            <svg className="h-1.5 w-1.5 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            {/* Reply Button */}
            <ButtonBadge icon={<Reply className="w-3 h-3 text-gray-500" />} name={secondButton} />
            <svg className="h-1.5 w-1.5 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            {/* Spam Button */}
            <ButtonBadge icon={<Spam className="w-3 h-3 text-gray-500" />} name={thirdButton} />
            <svg className="h-1.5 w-1.5 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            {/* Archive Button */}
            <ButtonBadge icon={<Spam className="w-3 h-3 text-gray-500" />} name={fourthButton} />
            <svg className="h-1.5 w-1.5 text-slate-400" fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3} />
            </svg>
            {/* Delete Button */}
            <ButtonBadge
              icon={<Trash className="w-3 h-3 text-gray-500" />}
              name={fifthButton}
              onClick={() => setIsDelete(!isDelete)}
            />
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <DeleteModal
        show={isDelete}
        onClose={() => setIsDelete(!isDelete)}
        cancelOnClick={() => setIsDelete(!isDelete)}
        deleteOnClick={() => setIsDelete(!isDelete)}
        icon={<Danger className="w-6 h-6 text-red-600" />}
        title="Delete post"
        description="Are you sure you want to delete this post? This action cannot be undone."
      />
    </>
  );
}
