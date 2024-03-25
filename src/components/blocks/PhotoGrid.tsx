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
    <View className="h-full w-full">
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
              {/* {photosGroup.photos.map((photo, index) => {
                if (index % 10 === 0)
                  return (
                    <View key={photo._id} style={styles.imageFull}>
                      <Image
                        src={`http://localhost:1323/${photo.thumbnail_url}`}
                        alt={photo.file_name}
                        style={styles.image}
                      />
                    </View>
                  );
                if (index % 10 > 0 && index % 10 <= 3)
                  return (
                    <View key={photo._id} style={styles.image33}>
                      <Image
                        src={`http://localhost:1323/${photo.thumbnail_url}`}
                        alt={photo.file_name}
                        style={styles.image}
                      />
                    </View>
                  );
                if (index % 4 === 0)
                  return (
                    <View key={photo._id} style={styles.imageFlex}>
                      <Image
                        src={`http://localhost:1323/${photo.thumbnail_url}`}
                        alt={photo.file_name}
                        style={styles.image}
                      />
                    </View>
                  );
                return (
                  <View key={photo._id} style={styles.imageFlex}>
                    <Image
                      src={`http://localhost:1323/${photo.thumbnail_url}`}
                      alt={photo.file_name}
                      style={styles.image}
                    />
                  </View>
                );
              })} */}
            </View>
          );
        })}
    </View>
  );
};
