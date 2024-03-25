import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';

import colors from '../../colors';
import {DropdownYear} from '../components/blocks/DropdownYear';
import {TabProvider} from '../context/tabContext';
import {usePhotosRange} from '../hooks/usePhotosRange';
import {PhotoGridScreen} from './PhotoGridScreen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.main_bg,
    flex: 1,
  },
});
const Tab = createMaterialTopTabNavigator();
const tabRef = createNavigationContainerRef();

export const HomeScreen = () => {
  const {range, isFetched} = usePhotosRange();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const years = useMemo(() => {
    const set = new Set<number>();
    range.forEach(r => {
      set.add(r.year);
    });
    return Array.from(set);
  }, [range]);
  if (!isFetched || range.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <View className="flex items-center overflow-visible z-50">
        <DropdownYear
          year={year}
          years={years}
          setYear={setYear}
          onSelected={selectY => {
            setYear(selectY);
            const selectMonth = range.find(r => r.year === selectY)?.month ?? 1;

            setMonth(selectMonth);

            if (tabRef.current) {
              tabRef.current.navigate(`${selectY}-${selectMonth}` as never);
            }
          }}
        />
      </View>
      <TabProvider
        value={{
          year,
          month,
          setYear,
          setMonth,
        }}>
        <NavigationContainer independent ref={tabRef}>
          <Tab.Navigator
            shouldRasterizeIOS
            screenOptions={{
              tabBarScrollEnabled: true,
              tabBarActiveTintColor: colors.main_blue,
              tabBarInactiveTintColor: colors.dark_gray,
              tabBarItemStyle: {width: 70},
              tabBarStyle: {backgroundColor: colors.main_bg},
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarIndicatorStyle: {backgroundColor: colors.main_blue},
            }}>
            {range.length > 0 ? (
              range.map((r, index) => {
                return (
                  <Tab.Screen
                    key={index}
                    name={`${r.year}-${r.month + 1}`}
                    component={PhotoGridScreen}
                    initialParams={{year: r.year, month: r.month}}
                    options={{tabBarLabel: r.month + '', title: r.month + ''}}
                  />
                );
              })
            ) : (
              <Tab.Screen
                name="empty"
                component={LearnMoreLinks}
                options={{tabBarLabel: ''}}
              />
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </TabProvider>
    </View>
  );
};
