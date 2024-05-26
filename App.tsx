/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
// import type {PropsWithChildren} from 'react';
import // ActivityIndicator,
  // SafeAreaView,
  // ScrollView,
  // StatusBar,
  // StyleSheet,
  // useColorScheme,

  'react-native';
import { PaperProvider } from 'react-native-paper';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import Route from './src/navigation/Route';
import { NavigationContainer } from '@react-navigation/native';
import {
  ApolloProvider,
} from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from './src/service/store';
import FlashMessage from 'react-native-flash-message';
import { client } from './src/utils/apolloclient';

// import {PaperProvider} from 'react-native-paper';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// keytool -list -v \ -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore

// const client = new ApolloClient({
//   // uri: 'http://192.168.52.213:3000/graphql',
//   uri: `${env.server}/graphql`,
//   cache: new InMemoryCache(),
//   // link: createUploadLink()
// });

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PaperProvider>
          <NavigationContainer>
            <Route />
            <FlashMessage position="bottom" />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
