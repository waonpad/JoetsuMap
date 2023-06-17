import { useState } from 'react';

import { View } from 'react-native';

import { SearchTravelBookletForm } from '../../components/SearchTravelBookletForm';
import { SearchedTravelBookletList } from '../../components/SearchedTravelBookletList';
// import { TravelBookletList } from '../../components/TravelBookletList';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

import type { SearchTravelBookletFormInput } from '../../components/SearchTravelBookletForm/types';

export const TravelBookletHomeScreen = () => {
  const route = useTravelBookletRoute<'TravelBookletHome'>();

  const [searchParams, setSearchParams] = useState<SearchTravelBookletFormInput>({
    freeKeyword: '',
  });

  const handleSubmitSearch = (searchParams: SearchTravelBookletFormInput) => {
    setSearchParams(searchParams);
  };

  return (
    <View style={styles.container}>
      <SearchTravelBookletForm
        defaultValues={route.params?.searchTravelBookletFormDefaultValues}
        onSubmitAction={handleSubmitSearch}
      />
      {/* <TravelBookletList /> */}
      <SearchedTravelBookletList searchParams={searchParams} />
    </View>
  );
};
