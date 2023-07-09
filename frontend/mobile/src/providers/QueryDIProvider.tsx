import type { ReactNode } from 'react';

import { useBookmarkedModelCourseIds } from '@/features/model_course/api/getBookmarkedModelCourseIds';
import { useBookmarkedTravelSpotIds } from '@/features/travel_spot/api/getBookmaerkedTravelSpotIds';

// 最初から必要なデータを取得するためのコンポーネント
export const QueryDIProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  useBookmarkedTravelSpotIds({
    config: { suspense: false, useErrorBoundary: false },
  });
  useBookmarkedModelCourseIds({
    config: { suspense: false, useErrorBoundary: false },
  });

  return <>{children}</>;
};
