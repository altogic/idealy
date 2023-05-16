import useGuestValidation from '@/hooks/useGuestValidation';
import useNotification from '@/hooks/useNotification';
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

export default function CommentForm({ editedComment, setEditComment, setIsFetched, dashboard }) {
  const dispatch = useDispatch();
  const { userIp, guestInfo, user } = useSelector((state) => state.auth);
  const { createCommentLoading: isLoading, updateCommentLoading } = useSelector(
    (state) => state.comments
  );
  const idea = useSelector((state) => state.idea.selectedIdea);
  const feedBackSubmitModal = useSelector((state) => state.general.feedBackSubmitModal);
  const error = useSelector((state) => state.comments.error);
  const isGuest = useSelector((state) => state.company.isGuest);
  const [comment, setComment] = useState('');
  const guestValidation = useGuestValidation('commentIdea');
  const saveGuestInfo = useSaveGuestInformation();
  const sendNotification = useNotification();

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
    privacyPolicyComment: yup.boolean().when([], {
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
    defaultValues: {
      privacyPolicyComment: false
    },
    resolver: yupResolver(schema)
  });
  const sendMentionNotification = useSendMentionNotification('comment');
  const submitComment = (data) => {
    if (comment.trim() === '' || comment.trim() === '<p><br></p>') {
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
          user: user?._id,
          guestName: user?.name || data.guestName,
          guestEmail: user?.email || data.guestEmail,
          onSuccess: () => {
            if (data.guestEmail) {
              saveGuestInfo({
                name: data.guestName,
                email: data.guestEmail
              });
            }
            sendMentionNotification({
              content: comment,
              name: user?.name || data.guestName || guestName,
              title: idea.title,
              ideaId: idea._id
            });
          }
        })
      );
    } else {
      dispatch(
        commentActions.addComment({
          ...data,
          ideaId: idea._id,
          text: comment,
          user: user?._id,
          companyId: idea.company,
          ...(!user && guestValidation && { guestName: data.guestName || guestName }),
          ...(!user && !data.guestEmail && { ip: userIp }),
          onSuccess: () => {
            if (data.guestEmail || isGuest) {
              saveGuestInfo({
                name: data?.guestName,
                email: data?.guestEmail
              });
            }
            if (idea.author?._id) {
              sendNotification({
                message: `<b>${user?.name || data.guestName}</b> commented on <b>${idea.title}</b>`,
                targetUser: idea?.author._id,
                type: 'comment',
                url: `/public-view?feedback=${idea._id}`
              });
              sendMentionNotification({
                content: comment,
                name: user?.name || data.guestName || guestName,
                title: idea.title,
                ideaId: idea._id
              });
            }
          }
        })
      );
      if (setIsFetched) setIsFetched(false);
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
      setValue('privacyPolicyComment', true);
    }
  }, [editedComment]);

  useEffect(() => {
    if (guestInfo?.name) {
      setValue('guestName', guestInfo.name);
      setValue('guestEmail', guestInfo.email);
      setValue('privacyPolicyComment', true);
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
              dashboard={dashboard}
            />
          </div>
        )}
      />
      {guestValidation && (
        <GuestForm register={register} errors={errors} checkBoxName="privacyPolicyComment" />
      )}
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
          disabled={comment.trim() === '' || comment.trim() === '<p><br></p>'}
        />
      </div>
    </form>
  );
}
