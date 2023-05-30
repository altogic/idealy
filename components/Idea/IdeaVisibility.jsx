import Button from '@/components/Button';
import Image from '@/components/Image';
import useUpdateIdea from '@/hooks/useUpdateIdea';
import { fileActions } from '@/redux/file/fileSlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddANewRoadMap from '../AddANewRoadMap';
import BaseListBox from '../BaseListBox';
import Label from '../Label';
import IdeaSwitch from '../Switch';
import { Plus } from '../icons';

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
  const [openCreateRoadmapModal, setOpenCreateRoadmapModal] = useState(false);
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
      updateIdea({ coverImage, message: `The cover image of <b>${idea.title}</b> changed` }, () => {
        dispatch(fileActions.clearFileLink());
        setFile(null);
      });
    }
  }, [coverImage]);

  useEffect(() => {
    if (idea) {
      const roadmap = company?.roadmaps.find((roadmap) => roadmap._id === idea?.roadmap?._id);
      setShowOnRoadMap(idea?.showOnRoadMap);
      setIsPrivate(idea?.isPrivate);
      setRoadMap(roadmap);
    }
  }, [idea]);

  return (
    <div>
      <IdeaSwitch
        checked={isPrivate}
        onChange={() => {
          updateIdea({
            isPrivate: !idea?.isPrivate,
            message: `The visibility of <b>${idea.title}</b> changed to <b>${
              !idea?.isPrivate ? 'Private' : 'Public'
            }</b>`
          });
          setIsPrivate(!isPrivate);
        }}
        text="Make Private"
      />
      <IdeaSwitch
        checked={showOnRoadMap}
        onChange={() => {
          updateIdea({
            showOnRoadMap: !idea?.showOnRoadMap,
            message: `<b>${idea.title}</b>  <b>${
              !idea?.showOnRoadMap ? 'showed' : 'removed'
            }</b> on roadmap`
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
      {!!company?.roadmaps?.length && (
        <div className="mt-4">
          <Label label="Roadmaps" />{' '}
          <BaseListBox
            value={roadMap}
            label={roadMap?.name}
            onChange={(value) => {
              setRoadMap(value);
              updateIdea({
                roadmap: value._id,
                message: `The roadmap of <b>${idea.title}</b> changed to <b>${value.name}</b>`
              });
            }}
            field="name"
            options={company?.roadmaps}
            size={listBoxSize}
            onReset={() => {
              setRoadMap(null);
              updateIdea({ roadmap: null, message: `The roadmap of <b>${idea.title}</b> removed` });
            }}
          />
        </div>
      )}
      <Button
        variant="text"
        text="Add Roadmap"
        icon={<Plus className="w-4 h-4 icon" />}
        onClick={() => setOpenCreateRoadmapModal(true)}
      />
      <AddANewRoadMap
        show={openCreateRoadmapModal}
        cancelOnClick={() => setOpenCreateRoadmapModal(false)}
        onAdd={(value) => {
          setRoadMap(value);
          updateIdea({
            roadmap: value._id,
            message: `The roadmap of <b>${idea.title}</b> changed to <b>${value.name}</b>`
          });
        }}
      />
    </div>
  );
}
