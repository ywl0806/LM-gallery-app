import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';

/* eslint-disable react/no-unstable-nested-components */
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from './colors';
import {MyTabBar} from './src/navigation/MyTabBar';
import {HomeScreen} from './src/screens/Home';
import {SettingScreen} from './src/screens/SettingScreen';
import {UploadScreen} from './src/screens/UploadScreen';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.main_bg,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  root: {
    flex: 1,
    backgroundColor: colors.main_bg,
  },
});
const queryClient = new QueryClient();
const App = () => {
  const [uploadModal, setUploadModal] = React.useState<boolean>(false);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={styles.header} />
        <View style={styles.root}>
          <Tab.Navigator
            tabBar={props => (
              <MyTabBar setUploadModal={setUploadModal} {...props} />
            )}
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Upload">
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Setting"
              component={SettingScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="gear" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
          <Modal
            animationType="slide"
            transparent={false}
            visible={uploadModal}
            onRequestClose={() => {
              setUploadModal(false);
            }}>
            <UploadScreen closeModal={() => setUploadModal(false)} />
          </Modal>
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
};
export default App;

// import React from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';
// import {
//   CameraRoll,
//   PhotoIdentifier,
// } from '@react-native-camera-roll/camera-roll';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {NativeModules} from 'react-native';
// import Video from 'react-native-video';
// import {NavigationContainer} from '@react-navigation/native';

// const {LivePhotoModule} = NativeModules;

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [photos, setPhotos] = React.useState<PhotoIdentifier[]>([]);
//   const [videoUrl, setVideo] = React.useState<string>('');

//   React.useEffect(() => {
//     LivePhotoModule.getLivePhotoMov('22688AE4-B872-4705-9DB6-FAC8CB7CA68B')
//       .then((r: any) => {
//         console.log('🚀 / .then / r:', r);
//         setVideo(r);
//       })
//       .catch((e: any) => {
//         console.log('🚀 / App / e:', e);
//       });
//     CameraRoll.getPhotos({
//       first: 20,
//       assetType: 'All',
//     }).then(r => {
//       setPhotos(r.edges);
//     });
//   }, []);
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <NavigationContainer>
//         <StatusBar
//           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//           backgroundColor={backgroundStyle.backgroundColor}
//         />
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={backgroundStyle}>
//           <View>
//             <Text>Hello World</Text>
//             {photos.map((photo, index) => (
//               <View key={index}>
//                 <Text>{photo.node.image.uri}</Text>
//                 <Text>{photo.node.image.extension}</Text>
//                 <Text>{photo.node.type}</Text>

//                 <Image
//                   source={{uri: photo.node.image.uri, width: 100, height: 100}}
//                 />
//               </View>
//             ))}

//             <Image
//               source={{
//                 uri: 'ph://22688AE4-B872-4705-9DB6-FAC8CB7CA68B/L0/001',
//                 width: 300,
//                 height: 300,
//               }}
//             />
//             {videoUrl && (
//               <Video
//                 source={{
//                   uri: videoUrl,
//                 }}
//                 style={{width: 300, height: 300}}
//                 repeat
//                 resizeMode="contain"
//               />
//             )}
//           </View>
//         </ScrollView>
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// export default App;
