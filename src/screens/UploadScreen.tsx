import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';

import {SelectablePhoto} from '../components/elements/SeletablePhoto';
import {uploadPhoto} from '../services/uploadPhoto';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    flex: 1,
    maxWidth: '33%',
    padding: 5,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
  header: {
    width: '100%',
    height: 50,
    top: 0,
  },
});
const ONE_PAGE = 20;
export const UploadScreen = () => {
  const [photos, setPhotos] = React.useState<PhotoIdentifier[]>([]);
  const [first, setFirst] = useState<number>(ONE_PAGE);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const {data} = useQuery({
    queryKey: ['localPhotos', first],
    queryFn: () => CameraRoll.getPhotos({first}).then(r => r.edges),
  });

  useEffect(() => {
    if (data) {
      setPhotos(data);
      data.forEach(photo => {
        console.log(new Date(photo.node.timestamp * 1000));
        console.log(photo.node.subTypes.includes('PhotoLive'));
      });
    }
  }, [data]);
  return (
    <View style={styles.container}>
      <View className="h-10" />

      <FlatList
        className="w-full h-full"
        data={photos}
        renderItem={({item}) => (
          <SelectablePhoto
            photo={item}
            isSeleted={selectedPhotos.includes(item.node.id)}
            seletePhoto={photo => {
              if (selectedPhotos.includes(photo.node.id)) {
                setSelectedPhotos(prev =>
                  prev.filter(p => p !== photo.node.id),
                );
              } else {
                setSelectedPhotos(prev => [...prev, photo.node.id]);
              }
            }}
          />
        )}
        keyExtractor={item => item.node.image.uri}
        numColumns={3}
        onEndReached={() => {
          setFirst(first + ONE_PAGE);
        }}
        onEndReachedThreshold={0.1}
      />
      <View className="absolute w-full flex justify-center bottom-11 bg-main_bg rounded-xl p-2">
        <Button
          title="upload"
          onPress={() => {
            const p = photos.filter(photo =>
              selectedPhotos.includes(photo.node.id),
            );
            uploadPhoto(p).then(res => {
              console.log(res);
            });
          }}
        />
      </View>
      {/* {photos.map((photo: PhotoIdentifier) => {
            return (
              <View key={photo.node.image.uri}>
                <Image
                  source={{
                    uri: photo.node.image.uri,
                  }}
                  style={styles.image}
                />
              </View>
            );
          })} */}
    </View>
  );
};
