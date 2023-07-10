// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import { useAuth } from '@/lib/auth';

import type { DisplayContentChangeButtonGroupProps, ContentLabel } from './types';

export const useUtils = ({ userId, onPress }: DisplayContentChangeButtonGroupProps) => {
  const { user } = useAuth();

  const [activeButtonLabel, setActiveButtonLabel] = useState<ContentLabel>('modelCourses');

  const handlePressChangeContentButton = (label: ContentLabel) => {
    setActiveButtonLabel(label);
    onPress(label);
  };

  const mergedButtonList = [...buttonList, ...(user?.id === userId ? isAuthUserButtonList : [])];

  return {
    activeButtonLabel,
    mergedButtonList,
    handlePressChangeContentButton,
  };
};

const buttonList: {
  label: string;
  labelCode: ContentLabel;
}[] = [
  {
    label: 'モデルコース',
    labelCode: 'modelCourses',
  },
  {
    label: '旅のしおり',
    labelCode: 'travelBooklets',
  },
];

const isAuthUserButtonList: {
  label: string;
  labelCode: ContentLabel;
}[] = [
  {
    label: 'ブックマークしたコース',
    labelCode: 'bookmarkedModelCourses',
  },
  {
    label: 'ブックマークした観光地',
    labelCode: 'bookmarkedTravelSpots',
  },
];
