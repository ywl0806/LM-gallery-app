import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import colors from '../../colors';
import {PhotoGrid} from '../components/blocks/PhotoGrid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main_bg,
  },
});

export const HomeScreen = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  return (
    <View style={styles.container}>
      <PhotoGrid />
    </View>
  );
};
