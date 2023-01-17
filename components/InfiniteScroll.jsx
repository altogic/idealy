import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function InfiniteScroll({ items, countInfo, children, endOfList }) {
  const { ref: inViewRef, inView } = useInView();
  const ref = useRef();
  const handleEndOfList = () => {
    if (!_.isNil(items) && _.size(items) < countInfo?.count) {
      endOfList();
    }
  };
  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );
  useEffect(() => {
    if (inView) handleEndOfList();
  }, [inView]);
  return (
    <div id="infinite-scroll">
      {children}
      <div ref={setRefs} />
    </div>
  );
}
