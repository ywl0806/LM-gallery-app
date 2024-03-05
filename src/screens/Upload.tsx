import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SelectablePhoto} from '../components/elements/SeletablePhoto';

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
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoIdentifier[]>([]);

  const {data} = useQuery({
    queryKey: ['localPhotos', first],
    queryFn: () => CameraRoll.getPhotos({first}).then(r => r.edges),
  });

  useEffect(() => {
    if (data) {
      setPhotos(data);
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
            isSeleted={selectedPhotos.includes(item)}
            seletePhoto={photo => {
              if (selectedPhotos.includes(photo)) {
                setSelectedPhotos(prev => prev.filter(p => p !== photo));
              } else {
                setSelectedPhotos(prev => [...prev, photo]);
              }
            }}
          />
          //   <View style={styles.item}>
          //     <Image
          //       source={{uri: item.node.image.uri}}
          //       resizeMode="cover"
          //       style={styles.image}
          //     />
          //   </View>
        )}
        keyExtractor={item => item.node.image.uri}
        numColumns={2}
        onEndReached={() => {
          setFirst(first + ONE_PAGE);
        }}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={<Text>Empty</Text>}
      />
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
