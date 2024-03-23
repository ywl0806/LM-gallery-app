import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../../colors';
import {PhotoGrid} from '../components/blocks/PhotoGrid';
import {useGetPhotos} from '../hooks/useGetPhotos';
import {usePhotosRange} from '../hooks/usePhotosRange';

export const PhotoGridScreen = ({route}) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const {range} = usePhotosRange();

  const {photosGroups} = useGetPhotos({year, month});
  return (
    <View>
      <PhotoGrid photosGroups={photosGroups ?? []} />
    </View>
  );
};
