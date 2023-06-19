import React, { useState } from 'react';

import { View } from 'react-native';

import { SearchModelCourseForm } from '../../components/SearchModelCourseForm';
import { SearchedModelCourseList } from '../../components/SearchedModelCourseList';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator';

import { styles } from './styles';

import type { SearchModelCourseFormInput } from '../../components/SearchModelCourseForm/types';

export const ModelCourseHomeScreen = () => {
  const route = useModelCourseRoute<'ModelCourseHome'>();

  const [searchParams, setSearchParams] = useState<SearchModelCourseFormInput>({
    freeKeyword: '',
  });

  const handleSubmitSearch = (searchParams: SearchModelCourseFormInput) => {
    setSearchParams(searchParams);
  };

  return (
    <View style={styles.container}>
      <SearchModelCourseForm
        defaultValues={route.params?.searchModelCourseFormDefaultValues}
        onSubmitAction={handleSubmitSearch}
      />
      {/* <ModelCourseList /> */}
      <SearchedModelCourseList searchParams={searchParams} />
    </View>
  );
};
