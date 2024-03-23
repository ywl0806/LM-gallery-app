import {useQuery} from '@tanstack/react-query';
import {useMemo} from 'react';

import {getFirstPhoto} from '../services/getFirstPhoto';

export const usePhotosRange = () => {
  const {data} = useQuery({
    queryKey: ['firstPhoto'],
    queryFn: () => {
      return getFirstPhoto();
    },
  });

  const range = useMemo(() => {
    const rng = [];

    if (data) {
      const first = new Date(data.photo_created_at);
      const firstMonth = first.getMonth();
      const firstYear = first.getFullYear();

      const last = new Date();
      const lastMonth = last.getMonth();
      const lastYear = last.getFullYear();

      for (let year = lastYear; year >= firstYear; year--) {
        const startMonth = year === firstYear ? firstMonth : 0;
        const endMonth = year === lastYear ? lastMonth : 11;
        for (let month = endMonth; month >= startMonth; month--) {
          rng.push({year, month});
        }
      }
    }

    return rng;
  }, [data]);

  return {range};
};
