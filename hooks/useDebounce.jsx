import _ from 'lodash';
import { useEffect } from 'react';

export default function useDebounce(input, callback, ms = 500) {
  useEffect(() => {
    let timer;
    if (!_.isEmpty(input)) {
      timer = setTimeout(() => {
        callback();
      }, ms);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
}
