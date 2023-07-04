// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import type { ContentLabel } from '../../components/DisplayContentChangeButtonGroup/types';

export const useUtils = () => {
  const [displayContent, setDisplayContent] = useState<ContentLabel>('modelCourses');

  const changeDisplayContent = (contentLabel: ContentLabel) => {
    setDisplayContent(contentLabel);
  };

  return {
    displayContent,
    changeDisplayContent,
  };
};
