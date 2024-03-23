import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../colors';

type Props = {
  photo: PhotoIdentifier;
  isSeleted: boolean;
  seletePhoto: (photo: PhotoIdentifier) => void;
  onPress: () => void;
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 5,
    minWidth: '33.333333%',
    maxWidth: '33.333333%',
    aspectRatio: 1,
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

export const SelectablePhoto = ({
  photo,
  isSeleted,
  seletePhoto,
  onPress,
}: Props) => {
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
        <View className="absolute top-2 left-2 z-10 rounded-xl bg-white p-1 border-main border">
          <Text className="font-mono font-bold text-[8px] text-dark_gray">
            LIVE
          </Text>
        </View>
      )}

      <TouchableWithoutFeedback onPress={onPress}>
        <Image
          source={{uri: photo.node.image.uri}}
          resizeMode="cover"
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
