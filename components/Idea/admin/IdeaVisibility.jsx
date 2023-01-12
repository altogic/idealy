import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '@/redux/file/fileSlice';
import Image from '@/components/Image';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import IdeaAdminTab from './IdeaAdminTab';
import IdeaSwitch from './IdeaSwitch';
import Button from '@/components/Button';

export default function IdeaVisibility({ updateIdea }) {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const coverImage = useSelector((state) => state.file.fileLink);
  const loading = useSelector((state) => state.file.loading);
  const [file, setFile] = useState();
  const [showOnRoadMap, setShowOnRoadMap] = useState();
  const [isPrivate, setIsPrivate] = useState();
  const handleAddCoverImage = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      setFile(file);
      dispatch(fileActions.uploadFileRequest({ file, name: `${idea.title}-coverImage` }));
    };
  };
  const removeCoverImage = () => {
    setFile(null);
    dispatch(fileActions.deleteFile(idea.coverImage));
    dispatch(ideaActions.deleteIdeaCoverImage(idea._id));
  };
  useEffect(() => {
    if (coverImage && file) {
      updateIdea({ coverImage });
    }
  }, [coverImage]);
  useEffect(() => {
    if (idea?.showOnRoadMap) {
      setShowOnRoadMap(idea.showOnRoadMap);
      setIsPrivate(idea.isPrivate);
    }
  }, [idea]);
  return (
    <IdeaAdminTab title="Visibility">
      <IdeaSwitch
        checked={isPrivate}
        onChange={() => {
          updateIdea({
            isPrivate: !idea?.isPrivate
          });
          setIsPrivate(!isPrivate);
        }}
        text={`Make ${idea?.isPrivate ? 'Public' : 'Private'}`}
      />
      <IdeaSwitch
        checked={showOnRoadMap}
        onChange={() => {
          updateIdea({
            showOnRoadMap: !idea?.showOnRoadMap
          });
          setShowOnRoadMap(!showOnRoadMap);
        }}
        text="Show on Roadmap"
      />
      <div className="flex justify-between items-center gap-4 py-3">
        <span className="text-slate-600 dark:text-aa-300 purple:text-pt-300 text-sm font-medium">
          Cover Image
        </span>
        <Button
          type="button"
          onClick={handleAddCoverImage}
          loading={loading}
          text="Upload"
          variant="indigo"
        />
      </div>
      {idea?.coverImage && (
        <div className=" w-full">
          <Image
            src={file ? URL.createObjectURL(file) : idea?.coverImage}
            alt={idea?.title}
            loading={loading}
            onRemove={removeCoverImage}
            removable
            isPreview
          />
        </div>
      )}
    </IdeaAdminTab>
  );
}
