import useGuestValidation from '@/hooks/useGuestValidation';
import useSaveGuestInformation from '@/hooks/useSaveGuestInformation';
import useSendMentionNotification from '@/hooks/useSendMentionNotification';
import { commentActions } from '@/redux/comments/commentsSlice';
import { generateRandomName } from '@/utils/index';
import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from './Button';
import GuestForm from './GuestForm';

const Editor = dynamic(() => import('./Editor'), { ssr: false });

export default function CommentForm({ ideaId, editedComment, setEditComment, setIsFetched }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comments.createCommentLoading);
  const updateCommentLoading = useSelector((state) => state.comments.updateCommentLoading);
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState('');
  const guestValidation = useGuestValidation('commentIdea');
  const userIp = useSelector((state) => state.auth.userIp);
  const guestInfo = useSelector((state) => state.auth.guestInfo);
  const feedBackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  const error = useSelector((state) => state.comments.error);
  const saveGuestInfo = useSaveGuestInformation();

  const schema = yup.object().shape({
    text: yup.string(),
    guestName: yup.string().when([], {
      is: () => guestValidation && !user,
      then: yup.string().required('Name is required')
    }),
    guestEmail: yup
      .string()
      .email("That doesn't look like an email address")
      .when([], {
        is: () => guestValidation && !user,
        then: yup.string().required('Email is required')
      }),
    privacyPolicy: yup.boolean().when([], {
      is: () => guestValidation && !user,
      then: yup.boolean().oneOf([true], 'Privacy Policy is required')
    })
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    setError,
    control
  } = useForm({
    resolver: yupResolver(schema)
  });
  const sendMentionNotification = useSendMentionNotification('comment');
  const submitComment = (data) => {
    if (comment.trim() === '') {
      return;
    }
    const guestName = generateRandomName();
    if (!user && !guestValidation && !guestInfo.name) {
      saveGuestInfo({
        name: guestName
      });
    }
    if (editedComment) {
      dispatch(
        commentActions.updateComment({
          _id: editedComment._id,
          text: comment,
          guestName: user?.name || data.guestName,
          guestEmail: user?.email || data.guestEmail,
          onSuccess: () => {
            if (data.guestEmail) {
              saveGuestInfo({
                name: data.guestName,
                email: data.guestEmail
              });
            }
            sendMentionNotification(comment);
          }
        })
      );
    } else {
      dispatch(
        commentActions.addComment({
          ...data,
          ideaId,
          text: comment,
          user: user?._id,
          guestName: data.guestName || guestName,
          ...(!user && !data.guestEmail && { ip: userIp }),
          onSuccess: () => {
            if (data.guestEmail) {
              saveGuestInfo({
                name: data.guestName,
                email: data.guestEmail
              });
            }
            sendMentionNotification(comment);
          }
        })
      );
      setIsFetched(true);
      setComment('');
    }
  };
  useEffect(() => {
    setComment('');
  }, []);
  useEffect(() => {
    if (editedComment) {
      setComment(editedComment.text);
      setValue('text', editedComment.text);
      setValue('guestName', editedComment.name);
      setValue('guestEmail', editedComment.email);
      setValue('privacyPolicy', true);
    }
  }, [editedComment]);

  useEffect(() => {
    if (guestInfo) {
      setValue('guestName', guestInfo.name);
      setValue('guestEmail', guestInfo.email);
      setValue('privacyPolicy', true);
    }
  }, [feedBackSubmitModal, guestInfo]);

  useEffect(() => {
    if (!updateCommentLoading && setEditComment && isSubmitSuccessful) {
      setEditComment(false);
      setComment('');
    }
  }, [updateCommentLoading, setEditComment, isSubmitSuccessful]);
  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        if (err.code === 'user_exist') {
          setError('guestEmail', {
            type: 'manual',
            message: err.message
          });
        }
      });
    }
  }, [error]);
  return (
    <form onSubmit={handleSubmit(submitComment)} className="my-4">
      <Controller
        control={control}
        name="text"
        render={() => (
          <div className="relative">
            <Editor
              content={comment}
              setContent={setComment}
              errors={errors.text}
              placeholder="Type a comment"
            />
          </div>
        )}
      />
      {guestValidation && <GuestForm register={register} errors={errors} />}
      <div className={`flex justify-end gap-2 ${editedComment ? 'mt-2' : 'my-8'}`}>
        {editedComment && (
          <Button
            type="button"
            text="Cancel"
            variant="blank"
            size="sm"
            height="10"
            onClick={() => setEditComment(false)}
          />
        )}
        <Button
          type="submit"
          text={editedComment ? 'Update' : 'Add a comment'}
          variant="indigo"
          size="sm"
          height="10"
          loading={editedComment ? updateCommentLoading : isLoading}
        />
      </div>
    </form>
  );
}
