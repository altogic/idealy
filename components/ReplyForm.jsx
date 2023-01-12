import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { repliesActions } from '@/redux/replies/repliesSlice';
import { useEffect } from 'react';
import Button from './Button';
import TextArea from './TextArea';

export default function ReplyForm({ setIsReplying, commentId, reply }) {
  const dispatch = useDispatch();
  const ip = useSelector((state) => state.auth.userIp);
  const user = useSelector((state) => state.auth.user);
  const schema = yup.object().shape({
    content: yup.string().required('Content is required')
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  });

  const onSubmit = (data) => {
    if (reply) {
      dispatch(repliesActions.updateReply({ ...data, _id: reply._id }));
      setIsReplying(false);
    } else {
      dispatch(repliesActions.createReply({ ...data, commentId, ip, user: user._id }));
    }
  };

  useEffect(() => {
    if (reply) {
      setValue('content', reply.content);
    }
  }, [reply]);
  return (
    <div className="w-full relative max-h-[14z0px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <div className="flex flex-col gap-5">
          <TextArea
            id="content"
            placeholder="Add a reply"
            register={register('content')}
            error={errors.content}
            rows={5}
          />
          <div className="flex gap-2 self-end absolute bottom-0 p-3">
            <Button
              type="button"
              text="Cancel"
              variant="blank"
              onClick={() => setIsReplying(false)}
              size="sm"
              height={8}
            />
            <Button
              type="submit"
              variant="indigo"
              text={reply ? 'Reply' : 'Edit'}
              size="sm"
              height={8}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
