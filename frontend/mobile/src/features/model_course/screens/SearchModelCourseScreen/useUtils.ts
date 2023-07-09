// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import type { SearchModelCourseFormInput } from '../../components/SearchModelCourseForm/types';

export const useUtils = () => {
  const [searchParams, setSearchParams] = useState<SearchModelCourseFormInput>({
    freeKeyword: '',
  });

  const handleSubmitSearch = (searchParams: SearchModelCourseFormInput) => {
    setSearchParams(searchParams);
  };

  return {
    searchParams,
    handleSubmitSearch,
  };
};
