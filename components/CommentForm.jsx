import useGuestValidation from '@/hooks/useGuestValidation';
import { commentActions } from '@/redux/comments/commentsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from './Button';
import Editor from './Editor';
import GuestForm from './GuestForm';

export default function CommentForm({ ideaId, company }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.comments.createCommentLoading);
  const user = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState('');
  const guestValidation = useGuestValidation({ company, fieldName: 'commentIdea' });
  const userIp = useSelector((state) => state.auth.userIp);
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
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  });
  const submitComment = (data) => {
    if (comment.trim() === '') {
      return;
    }
    dispatch(
      commentActions.addComment({
        ideaId,
        text: comment,
        user: user?._id,
        profilePicture: user?.profilePicture,
        name: user?.name || data.guestName,
        email: user?.email || data.guestEmail,
        ip: userIp
      })
    );
    setComment('');
  };
  useEffect(() => {
    setComment('');
  }, []);
  return (
    <form onSubmit={handleSubmit(submitComment)}>
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
      <div className="mt-8 text-right">
        <Button
          type="submit"
          text="Add a comment"
          variant="indigo"
          size="sm"
          height="10"
          loading={isLoading}
        />
      </div>
    </form>
  );
}
