import useGuestValidation from '@/hooks/useGuestValidation';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import { announcementActions } from '@/redux/announcement/announcementSlice';
import { generateRandomName } from '@/utils/index';
import { Popover, Transition } from '@headlessui/react';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { REACTION_TYPES } from '../constants';
import AnnouncementButton from './AnnouncementButton';
import GuestFormModal from './GuestFormModal';
import { FaceHappy } from './icons';

export default function AnnouncementReaction({ announcementId, reactionCount }) {
  const dispatch = useDispatch();
  const guestAuth = useGuestValidation('announcementReaction');
  const [type, setType] = useState();
  const saveGuestInfo = useSaveGuestInformation();
  const [openGuestForm, setOpenGuestForm] = useState(false);
  const { company } = useSelector((state) => state.company);
  const { user, guestInfo, userIp } = useSelector((state) => state.auth);
  const { error, reactions, isLoading } = useSelector((state) => state.announcement);
  const [reacted, setReacted] = useState([]);
  const [count, setCount] = useState(reactionCount);

  function deleteReaction(type) {
    setCount((prev) => ({
      ...prev,
      [type]: prev[type] - 1
    }));
    setReacted((prev) => prev.filter((r) => r !== type));

    const reactionId = reactions.find(
      (r) => r.type === type && r.announcementId === announcementId
    )._id;
    dispatch(
      announcementActions.deleteAnnouncementReaction({
        announcementId,
        reactionId,
        type
      })
    );
  }

  function handleReact(type) {
    setType(type);
    if (!reacted.includes(type)) {
      if (guestAuth && _.isEmpty(guestInfo)) {
        setOpenGuestForm(true);
      } else {
        setCount((prev) => ({
          ...prev,
          [type]: prev[type] + 1
        }));
        setReacted((prev) => [...prev, type]);
        dispatch(
          announcementActions.createAnnouncementReaction({
            announcementId,
            ...(!user && !guestAuth && { ip: userIp }),
            ...(guestAuth && { guestEmail: guestInfo.email }),
            companyId: company._id,
            userId: user?._id,
            type
          })
        );
        if (!user && !guestAuth && !guestInfo.name) {
          saveGuestInfo({
            name: generateRandomName()
          });
        }
      }
    } else {
      deleteReaction(type);
    }
  }

  const handleGuestFormSubmit = (data) => {
    setOpenGuestForm(false);
    setCount((prev) => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    setReacted((prev) => [...prev, type]);
    dispatch(
      announcementActions.createAnnouncementReaction({
        announcementId,
        ...(!user && !guestAuth && { ip: userIp }),
        ...(guestAuth && { ...data }),
        companyId: company._id,
        userId: user?._id,
        type
      })
    );
  };
  const handleReacted = () => {
    if (user) {
      setReacted(
        reactions
          .filter((r) => r.announcementId === announcementId && r.userId === user._id)
          .map((r) => r.type)
      );
    }
    if (guestAuth) {
      setReacted(
        reactions
          .filter((r) => r.announcementId === announcementId && r.guestEmail === guestInfo.email)
          .map((r) => r.type)
      );
    }
    if (!user && !guestAuth) {
      setReacted(
        reactions
          .filter((r) => r.announcementId === announcementId && r.ip === userIp)
          .map((r) => r.type)
      );
    }
  };

  useEffect(() => {
    if (reactions.length > 0) handleReacted();
  }, [reactions]);

  useEffect(() => {
    setCount(reactionCount);
  }, [reactionCount]);
  return (
    <div className="inline-block relative">
      <Popover>
        {({ open }) => (
          <>
            <div className="flex justify-end">
              <Popover.Button className="flex items-center gap-4">
                <FaceHappy className="w-5 h-5 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
              </Popover.Button>
              {REACTION_TYPES?.map(
                (reaction) =>
                  count?.[reaction?.type] > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReact(reaction.type)}
                      className={cx(
                        'flex items-center justify-center gap-1 p-1',
                        isLoading && 'opacity-50 cursor-wait'
                      )}
                      disabled={isLoading}
                      key={reaction?.type}>
                      <span className="text-xl">{reaction?.symbol}</span>
                      <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200">
                        {count[reaction?.type]}
                      </span>
                    </button>
                  )
              )}
            </div>

            <Transition
              show={open}
              className="absolute mb-4 -left-16 w-full   bottom-full bg-transparent"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0">
              {/* Mark this component as `static` */}
              <Popover.Panel className="py-2 px-3 mt-2 bg-white dark:bg-aa-800 purple:bg-pt-900 rounded-xl shadow-lg outline-none inline-flex gap-4">
                {REACTION_TYPES.map((reaction) => (
                  <AnnouncementButton
                    key={reaction.type}
                    symbol={reaction.symbol}
                    label={reaction.type}
                    onClick={() => handleReact(reaction.type)}
                    active={reacted.includes(reaction.type)}
                    disabled={isLoading}
                  />
                ))}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <GuestFormModal
        title="Please enter your details to react"
        open={openGuestForm}
        onClose={() => setOpenGuestForm(false)}
        error={error}
        onSubmit={handleGuestFormSubmit}
        showLoginLink
        saveLocal
      />
    </div>
  );
}
