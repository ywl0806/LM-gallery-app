import React from 'react';
import {Image, Text, View} from 'react-native';

import {useGetPhotos} from '../../hooks/useGetPhotos';

export const PhotoGrid = () => {
  const {photosGroups} = useGetPhotos({year: 2024, month: 2});

  return (
    <View>
      {photosGroups &&
        photosGroups.map(photosGroup => {
          return (
            <View key={photosGroup._id.month}>
              <Text>{photosGroup._id.month}</Text>
              <View>
                {photosGroup.photos.map(photo => {
                  return (
                    <View key={photo._id}>
                      <Text>{photo.thumbnail_url}</Text>
                      <Image
                        src={`http://localhost:1323/${photo.thumbnail_url}`}
                        alt={photo.file_name}
                        style={{width: 100, height: 100}}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
};
