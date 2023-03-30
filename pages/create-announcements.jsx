import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import Layout from '@/components/Layout';
import BaseListBox from '@/components/BaseListBox';
import { Plus, X, DotOutline } from '@phosphor-icons/react';
import StatusBadge from '@/components/StatusBadge';

const AnnouncementEditor = dynamic(() => import('@/components/AnnouncementEditor'), {
  ssr: false
});

export default function WriteAStory() {
  const [content, setContent] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const company = useSelector((state) => state.company.company);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const storySchema = new yup.ObjectSchema({
    title: yup.string()
  });

  const {
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(storySchema)
  });

  const handleChange = (e) => {
    if (!isChanged) {
      setIsChanged(true);
    }
    setContent(e);
  };

  return (
    <div>
      <Layout>
        <div className="max-w-screen-xl mx-auto h-[calc(100vh-93px)] w-screen px-9 lg:px-8 pt-8 pb-[72px] flex flex-col items-center ">
          <form className="w-full lg:px-0 grow">
            <Input
              type="text"
              name="story-title"
              className="block text-black w-full px-0 py-8 text-4xl font-medium border-0 placeholder-slate-500 focus:outline-none focus:ring-0 placeholder:text-2xl"
              placeholder="Share with your audience what you are shipping for."
              required
              register={register('title')}
              error={errors.title}
            />
            <div className="flex">
              <BaseListBox
                label={
                  <div className="flex items-center gap-2 border border-slate-300 dark:border-aa-600 purple:border-pt-800 p-2 rounded">
                    <Plus size={16} />
                    <span className="text-slate-500 dark:text-aa-200 purple:text-pt-200 text-base">
                      Categories
                    </span>
                  </div>
                }
                value={categories}
                field="name"
                options={company?.categories}
                size="xxl"
                onChange={setCategories}
                multiple
                type="create"
                hidden="mobile">
                {/* <button
                type="button"
                className="inline-flex items-center gap-3 text-slate-400 py-2"
                onClick={() => setIsCreate(!isCreate)}>
                <Plus className="w-4 h-4 text-slate-500 dark:text-aa-200 purple:text-pt-200" />
                Add a new roadmap
              </button> */}
              </BaseListBox>
              <div className="my-auto">
                {categories.map((category) => (
                  <StatusBadge
                    key={category._id}
                    name={category.name}
                    color={category.color}
                    onClose={() =>
                      setCategories(categories.filter((cat) => cat._id !== category._id))
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 w-11/12">
              <AnnouncementEditor onChange={handleChange} value={content} />
            </div>
          </form>
          <div className="flex justify-end w-full mt-4 border-t border-slate-200 p-2">
            <Button
              text="Publish"
              variant="indigo"
              onClick={() => {
                if (isChanged) {
                  dispatch(
                    createAnnouncement({
                      title: 'title',
                      content: parseHtml(content)
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
