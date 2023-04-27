import BaseListBox from '@/components/BaseListBox';
import SearchInput from '@/components/SearchInput';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/Tooltip';
import { Lock, LockOpen, Plus } from '@/components/icons';
import { companyActions } from '@/redux/company/companySlice';
import { ideaActions } from '@/redux/ideas/ideaSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/router';
import useUpdateEffect from '@/hooks/useUpdatedEffect';
import { useEffect, useState, useRef } from 'react';
import AddANewRoadMap from '@/components/AddANewRoadMap';
import _ from 'lodash';

export default function RoadmapFilter({ roadmap, setRoadmap, roadmaps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isGuest, company } = useSelector((state) => state.company);
  const { roadmapIdeas } = useSelector((state) => state.idea);
  const [searchText, setSearchText] = useState();
  const [isCreate, setIsCreate] = useState(false);
  const isFiltered = useRef(false);
  useDebounce(searchText, () => {
    if (router.isReady) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          search: searchText
        }
      });
      dispatch(ideaActions.searchRoadmapIdeas(searchText));
    }
  });

  useUpdateEffect(() => {
    if (!searchText) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: '' }
      });
      dispatch(ideaActions.clearSearch());
    }
  }, [searchText]);

  useEffect(() => {
    const { search } = router.query;
    if (search && router.isReady && !_.isEmpty(roadmapIdeas) && !isFiltered.current) {
      setSearchText(search);
      dispatch(ideaActions.searchRoadmapIdeas(search));
      isFiltered.current = true;
    }
  }, [router.query.search, roadmapIdeas]);
  return (
    <>
      <div className="flex items-center gap-2 flex-1">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center flex-1 gap-4">
          {isGuest ? (
            <RoadmapVisibilityIcon isPublic={!roadmap?.isPublic} />
          ) : (
            <Tooltip>
              <TooltipTrigger
                onClick={() => {
                  dispatch(
                    companyActions.updateCompanySubLists({
                      id: roadmap._id,
                      property: 'roadmaps',
                      update: { isPublic: !roadmap?.isPublic },
                      role: company?.role
                    })
                  );
                  setRoadmap((roadmap) => ({
                    ...roadmap,
                    isPublic: !roadmap?.isPublic
                  }));
                }}>
                <RoadmapVisibilityIcon isPublic={!roadmap?.isPublic} />
              </TooltipTrigger>

              <TooltipContent>
                Make this roadmap {roadmap?.isPublic ? 'private' : 'public'}
              </TooltipContent>
            </Tooltip>
          )}
          <BaseListBox
            value={roadmap}
            label={roadmap?.name}
            field="name"
            options={roadmaps}
            size="xxl"
            onChange={(value) => {
              setRoadmap(value);
              dispatch(ideaActions.setSelectedIdea(value));
              router.push({
                pathname: '/roadmaps',
                query: { roadmap: value._id }
              });
            }}
            type="create">
            <button
              type="button"
              className="inline-flex items-center gap-3 text-slate-400 py-2 whitespace-nowrap"
              onClick={() => setIsCreate(!isCreate)}>
              <Plus className="w-4 h-4 icon" />
              Add a new roadmap
            </button>
          </BaseListBox>
          <SearchInput
            searchText={searchText}
            onSearch={setSearchText}
            onClear={() => {
              setSearchText('');
              router.push({
                pathname: router.pathname,
                query: { ...router.query, search: '' }
              });
            }}
          />
        </div>
      </div>
      <AddANewRoadMap
        show={isCreate}
        onClose={() => setIsCreate(false)}
        cancelOnClick={() => setIsCreate(false)}
        title="Create new roadmap"
        description="Please enter a name for this roadmap."
      />
    </>
  );
}
function RoadmapVisibilityIcon({ isPublic }) {
  return isPublic ? (
    <Lock className="w-7 h-7 icon-red" />
  ) : (
    <LockOpen className="w-7 h-7 icon-green" />
  );
}
