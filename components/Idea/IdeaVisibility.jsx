import Button from '@/components/Button';
import Image from '@/components/Image';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { fileActions } from '@/redux/file/fileSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseListBox from '../BaseListBox';
import Label from '../Label';
import IdeaSwitch from '../Switch';

export default function IdeaVisibility({ listBoxSize }) {
  const dispatch = useDispatch();
  const idea = useSelector((state) => state.idea.selectedIdea);
  const company = useSelector((state) => state.company.company);
  const coverImage = useSelector((state) => state.file.fileLink);
  const loading = useSelector((state) => state.file.isLoading);
  const [file, setFile] = useState();
  const [showOnRoadMap, setShowOnRoadMap] = useState();
  const [isPrivate, setIsPrivate] = useState();
  const [roadMap, setRoadMap] = useState();
  const updateIdea = useUpdateIdea(idea);
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
    if (idea) {
      setShowOnRoadMap(idea.showOnRoadMap);
      setIsPrivate(idea.isPrivate);
      setRoadMap(idea.roadmap);
    }
  }, [idea]);
  return (
    <div>
      <IdeaSwitch
        checked={isPrivate}
        onChange={() => {
          updateIdea({
            isPrivate: !idea?.isPrivate
          });
          setIsPrivate(!isPrivate);
        }}
        text="Make Private"
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
          Roadmap Cover Image
        </span>
        <Button type="button" onClick={handleAddCoverImage} text="Upload" variant="indigo" />
      </div>
      {(idea?.coverImage || file) && (
        <div className="w-full">
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
      <div className="mt-4">
        <Label label="Roadmaps" />{' '}
        <BaseListBox
          value={roadMap}
          label={roadMap?.name}
          onChange={(value) => {
            setRoadMap(value);
            updateIdea({ roadmap: value._id });
          }}
          field="name"
          options={company?.roadmaps}
          size={listBoxSize}
          hidden="mobile"
        />
      </div>
    </div>
  );
}
