// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main_bg,
  },
});
// const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const {range} = usePhotosRange();

  const {photosGroups} = useGetPhotos({year, month});
  return (
    <View style={styles.container}>
      <View className="flex justify-center my-2">
        <Text className="text-1xl font-bold">{year}</Text>
      </View>
      {/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4">
        {range.map((r, index) => {
          return (
            <View className="border-r-[1px]  border-slate-300" key={index}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setYear(r.year);
                  setMonth(r.month + 1);
                }}
                className={`px-5 py-1 rounded-md border-main_blue ${
                  year === r.year && month === r.month + 1
                    ? 'border-b-[1px]'
                    : ''
                }`}>
                {year === r.year && month === r.month + 1 ? (
                  <Text className="text-main_blue font-bold border-b-2 border-main_blue">
                    {r.month + 1}
                  </Text>
                ) : (
                  <Text>{r.month + 1}</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <PhotoGrid photosGroups={photosGroups ?? []} />
    </View>
  );
};
