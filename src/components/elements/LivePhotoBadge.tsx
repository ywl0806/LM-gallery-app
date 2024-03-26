import React from 'react';
import {Image, Text, View} from 'react-native';

import {livePhotoIcon} from '../../icons/livePhotoIcon';

export const LivePhotoBadge = () => {
  return (
    <View className="absolute top-2 left-2 z-10 rounded-xl bg-white/70 p-[2px] flex flex-row items-center justify-center">
      <Image source={livePhotoIcon} style={{width: 12, height: 12}} />
      <Text className="text-[9px] text-main_black">LIVE</Text>
    </View>
  );
};
