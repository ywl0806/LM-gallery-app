import MasonryList from '@react-native-seoul/masonry-list';
import React, {useMemo} from 'react';
import {Image, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {PhotosGroup} from '../../services/getPhotosGroup';
import {Photo} from '../../types/photo';

type Props = {
  photosGroups: PhotosGroup[];
  refetch?: () => void;
};

const styles = StyleSheet.create({
  imageGrid: {
    display: 'flex',
    flex: 1,
    minHeight: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  imageBox: {
    alignSelf: 'stretch',
    padding: 1,
  },
});

const PhotoCard = ({
  photo,
  style,
}: {
  photo: Photo;
  style?: StyleProp<ViewStyle>;
}) => {
  const randomHeight = useMemo(() => Math.floor(Math.random() * 100) + 200, []);
  return (
    <View style={[style, styles.imageBox, {height: randomHeight}]}>
      <Image
        source={{uri: `http://localhost:1323/${photo.thumbnail_url}`}}
        style={styles.image}
      />
    </View>
  );
};
export const PhotoGrid = ({photosGroups}: Props) => {
  return (
    <View className="flex-1">
      {photosGroups &&
        photosGroups.map(photosGroup => {
          return (
            <View key={photosGroup._id.month} style={styles.imageGrid}>
              <MasonryList
                data={photosGroup.photos}
                renderItem={
                  (({item}: {item: Photo; index: number}) => {
                    return <PhotoCard photo={item} />;
                  }) as any
                }
                numColumns={2}
              />
            </View>
          );
        })}
    </View>
  );
};
