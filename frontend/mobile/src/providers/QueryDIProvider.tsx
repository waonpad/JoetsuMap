import type { ReactNode } from 'react';

import { useBookmarkedModelCourses } from '@/features/model_course/api/getBookmarkedModelCourses';
import { useBookmarkedTravelSpots } from '@/features/travel_spot/api/getBookmarkedTravelSpots';

// 最初から必要なデータを取得するためのコンポーネント
export const QueryDIProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // useBookmarkedTravelSpots({
  //   config: { suspense: false, useErrorBoundary: false },
  // });
  // useBookmarkedModelCourses({
  //   config: { suspense: false, useErrorBoundary: false },
  // });

  // これではページングされて取得できないものが出る
  // 全て取得するAPIを作る

  return <>{children}</>;
};
