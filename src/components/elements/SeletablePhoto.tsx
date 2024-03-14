import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import {Image, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import colors from '../../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type Props = {
  photo: PhotoIdentifier;
  isSeleted: boolean;
  seletePhoto: (photo: PhotoIdentifier) => void;
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    maxWidth: '33.333333%',
    aspectRatio: 1,
    width: '100%',
  },
  image: {
    flex: 1,
    borderRadius: 4,
    width: '100%',
  },
  selected: {
    backgroundColor: colors.main,
    borderColor: colors.main,
  },
});

export const SelectablePhoto = ({photo, isSeleted, seletePhoto}: Props) => {
  return (
    <View className="relative" style={[styles.item]}>
      <TouchableWithoutFeedback
        className="w-full"
        onPress={() => {
          seletePhoto(photo);
        }}>
        <View
          className={`w-7 h-7 absolute rounded-full bg-white/70 z-10 right-0 flex justify-center items-center ${
            isSeleted ? 'border-main bg-white' : 'border-slate-500/50'
          } border-[3px] transition-all duration-500`}>
          {isSeleted && <Icon name="check" color={colors.dark_gray} />}
        </View>
      </TouchableWithoutFeedback>
      {photo.node.subTypes.includes('PhotoLive') && (
        <View className="absolute top-2 left-2 z-10 opacity-70">
          <MaterialIcons
            name="motion-photos-on"
            color={colors.dark_gray}
            size={20}
            className="shadow-2xl"
          />
        </View>
      )}

      <Image
        source={{uri: photo.node.image.uri}}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};
