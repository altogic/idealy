import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { generateRandomName } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import useSendMentionNotification from '@/hooks/useSendMentionNotification';
import useNotification from '@/hooks/useNotification';
import Button from './Button';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

export default function ReplyForm({ setIsReplying, commentId, reply, setShowReplies }) {
  const dispatch = useDispatch();
  const { userIp: ip, user, guestInfo } = useSelector((state) => state.auth);
  const { createReplyLoading, updateReplyLoading } = useSelector((state) => state.replies);
  const idea = useSelector((state) => state.idea.selectedIdea);
  const isGuest = useSelector((state) => state.company.isGuest);
  const [inpReply, setInpReply] = useState(false);
  const isLoading = useRef(false);
  const saveGuestInfo = useSaveGuestInformation();
  const schema = yup.object().shape({
    content: yup.string().required('Content is required')
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const sendMentionNotification = useSendMentionNotification('reply');
  const sendNotification = useNotification();
  const onSubmit = (data) => {
    isLoading.current = true;
    const name = generateRandomName();
    if (reply) {
      dispatch(
        repliesActions.updateReply({
          ...data,
          _id: reply._id,
          onSuccess: () => {
            sendMentionNotification({
              content: data.content,
              name: user?.name || guestInfo.name || name,
              title: idea.title,
              ideaId: idea._id
            });
          }
        })
      );
    } else {
      dispatch(
        repliesActions.createReply({
          ...data,
          commentId,
          ...(!user && { ip, name: guestInfo.name || name }),
          user: user?._id,
          onSuccess: () => {
            if ((!user && !guestInfo.name) || isGuest) {
              saveGuestInfo({
                name
              });
            }
            if (idea?.author?._id) {
              sendNotification({
                message: `<b>${
                  user?.name || guestInfo.name || name
                }</b> replied to a comment on <b>${idea.title}</b>`,
                targetUser: idea?.author._id,
                type: 'reply',
                ideaId: idea._id,
                name: !user && !guestInfo.name ? name : ''
              });
              sendMentionNotification({
                content: data.content,
                name: user?.name || guestInfo.name || name,
                title: idea.title,
                ideaId: idea._id
              });
            }
          }
        })
      );
    }
  };

  useEffect(() => {
    if (reply) {
      setInpReply(reply?.content);
    }
  }, [reply]);

  useEffect(() => {
    if (inpReply) {
      setValue('content', inpReply);
    }
  }, [inpReply]);

  useEffect(() => {
    if (isSubmitSuccessful && !updateReplyLoading && reply) {
      setIsReplying(false);
    }
  }, [isSubmitSuccessful, updateReplyLoading]);
  useEffect(() => {
    if (isSubmitSuccessful && !createReplyLoading && !reply) {
      setShowReplies(true);
      reset();
      setInpReply('');
    }
  }, [isSubmitSuccessful, createReplyLoading]);

  useEffect(() => {
    if (!createReplyLoading && !updateReplyLoading) {
      isLoading.current = false;
    }
  }, [createReplyLoading, updateReplyLoading]);

  return (
    <div className="w-full mt-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          'flex flex-col w-full relative z-1 rounded-lg',
          errors.content && 'border-red-900'
        )}>
        <Controller
          control={control}
          name="content"
          render={() => (
            <div className="relative">
              <Editor
                content={inpReply}
                setContent={setInpReply}
                errors={errors.content}
                placeholder="Type a reply"
              />
            </div>
          )}
        />

        <div className="flex gap-2 w-full justify-end p-3">
          <Button
            type="button"
            text="Cancel"
            variant="blank"
            onClick={() => setIsReplying(false)}
            size="sm"
            height="8"
          />
          <Button
            type="submit"
            variant="indigo"
            text="Submit"
            size="sm"
            height="8"
            loading={(reply ? updateReplyLoading : createReplyLoading) && isLoading.current}
          />
        </div>
      </form>

      {errors.content && (
        <span className="inline-block text-sm text-red-600 dark:text-red-500 purple:text-red-500 mt-2">
          {errors.content.message}
        </span>
      )}
    </div>
  );
}
