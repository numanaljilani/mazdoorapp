/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';


  'react-native';
import { PaperProvider } from 'react-native-paper';

import Route from './src/navigation/Route';
import { createNavigationContainerRef, NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from './src/service/store';
import FlashMessage from 'react-native-flash-message';
import { client } from './src/utils/apolloclient';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { notificationListeners, requestUserPermission } from './src/utils/notificationservice';
import dynamicLinks from '@react-native-firebase/dynamic-links';


export const navigationRef = createNavigationContainerRef();
function App(): React.JSX.Element {


  const linking = {
    prefixes: ['https://mazdur.com','mazdoor://'],
    config: {
      screens: {
        Profile: 'WorkDetails/:id', // The "id" will be extracted from the URL
      },
    },
  };

  useEffect(()=>{

    if(Platform.OS == 'android'){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res)=>{
          console.log("res+++++",res)
          requestUserPermission()
          notificationListeners()
          if(!!res && res == 'granted'){

          }
      }).catch(error=>{
        console.log('something wrong')
      })
    }else{
  
    }
  
  },[])

  // useEffect(() => {
  //   const handleDeepLink = (event: { url: string }) => {
  //     const route = event.url.match(/WorkDetails\/(\w+)/);
  //     if (route) {
  //       const userId = route[1];
  //       navigationRef.current?.navigate('WorkDetails', { id: userId });
  //     }
  //   };

  //   Linking.getInitialURL().then((url) => {
  //     if (url) handleDeepLink({ url });
  //   });

  //   const subscription = Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);


  // const handleDynamicLink = (link:any) => {
  //   // Handle dynamic link inside your own application
  //   if (link.url === 'https://invertase.io/offer') {
  //     // ...navigate to your offers screen
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // When the component is unmounted, remove the listener
  //   return () => unsubscribe();
  // }, []);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider>
          <NavigationContainer linking={linking}>
            <Route />
            <FlashMessage position="bottom" />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
