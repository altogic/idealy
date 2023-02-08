import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { generateRandomName } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from './Button';
import TextArea from './TextArea';

export default function ReplyForm({ setIsReplying, commentId, reply, setShowReplies }) {
  const dispatch = useDispatch();
  const ip = useSelector((state) => state.auth.userIp);
  const user = useSelector((state) => state.auth.user);
  const createReplyLoading = useSelector((state) => state.replies.createReplyLoading);
  const updateReplyLoading = useSelector((state) => state.replies.updateReplyLoading);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const [isFormFocus, setIsFormFocus] = useState(false);
  const isLoading = useRef(false);
  const saveGuestInfo = useSaveGuestInformation();
  const schema = yup.object().shape({
    content: yup.string().required('Content is required')
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const onSubmit = (data) => {
    isLoading.current = true;
    const name = generateRandomName();
    if (reply) {
      dispatch(repliesActions.updateReply({ ...data, _id: reply._id }));
    } else {
      dispatch(
        repliesActions.createReply({
          ...data,
          commentId,
          ...(!user && { ip, name: guestInfo.name || name }),
          user: user?._id
        })
      );
    }
    if (!user && !guestInfo.name) {
      saveGuestInfo({
        name
      });
    }
  };

  useEffect(() => {
    if (reply) {
      setValue('content', reply.content);
    }
  }, [reply]);

  useEffect(() => {
    if (isSubmitSuccessful && !updateReplyLoading && reply) {
      setIsReplying(false);
    }
  }, [isSubmitSuccessful, updateReplyLoading]);
  useEffect(() => {
    if (isSubmitSuccessful && !createReplyLoading && !reply) {
      setShowReplies(true);
      reset();
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
        onFocus={() => setIsFormFocus(true)}
        onBlur={() => setIsFormFocus(false)}
        className={cn(
          'flex flex-col w-full relative z-1 rounded-lg border-2',
          'bg-white dark:bg-aa-800 purple:bg-pt-800',
          !isFormFocus && 'border-gray-300 dark:border-aa-600 purple:border-pt-600',
          isFormFocus &&
            !errors.content &&
            'border-indigo-500 dark:border-aa-400 purple:border-pt-400',
          isFormFocus && errors.content && 'border-red-600',
          errors.content && 'border-red-600'
        )}>
        <div className="flex flex-col gap-5">
          <TextArea
            id="content"
            placeholder="Add a reply"
            register={register('content')}
            rows={5}
            error={errors.content}
            inlineSubmit
          />
        </div>
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
