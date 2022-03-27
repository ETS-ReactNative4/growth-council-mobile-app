import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import { WebView } from 'react-native-webview';
import { getAsyncStorage } from '../../../utils/storageUtil';
import { decodeUserID } from '../../../utils/jwtUtil';
import { JWT_TOKEN } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Math.round(Dimensions.get('window').height);

const Radar = props => {
  const {
    route,
    navigation,   
  } = props;

  const webviewRef = React.useRef(null);

  const [userId, setUserId] = useState(0);

  useEffect(async () => {
    let token =  await getAsyncStorage(JWT_TOKEN);
    let ID = decodeUserID(token);
    if(ID){
      setUserId(ID);
    }
  }, []);

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  console.log(`https://beta.gilcouncil.com/frost-radar?user_id=${userId}`)

  return (
    // <ScrollView>
    //   <View style={styles.container}> 
    //     <ScrollView style={styles.content}>
    //       <View style={styles.contentWrapper}>      
    //         <Text style={styles.title}> Radar</Text> 
    //         <WebView
    //             source={{ uri: 'https://beta.gilcouncil.com/frost-radar/' }}
    //             style={{ marginTop: 20 }}
    //             originWhitelist={['*']}
    //             allowFileAccess={true}
    //             domStorageEnabled={true}
    //             allowUniversalAccessFromFileURLs={true}
    //             allowFileAccessFromFileURLs={true}
    //         />
    //       </View>
    //     </ScrollView>
    //   </View>
    //   <Footer />
    // </ScrollView>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.arrow}>
          <Ionicons
            name={'arrow-back'}
            size={50}
            color="#4287C3"
            onPress={() => navigation.goBack()}
          />
        </View>
        <WebView
            source={{ uri: `https://beta.gilcouncil.com/frost-radar?user_id=${userId}` }}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            ref={webviewRef}
          />
      </SafeAreaView>
  );
};

export default Radar;

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: 'center',
    height: 500,
    width: '100%',
  },
  title: {
    fontFamily: Typography.FONT_SF_SEMIBOLD,
    fontSize: 14,
    color: Colors.PRIMARY_TEXT_COLOR,
    marginLeft: 15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderTopWidth: 10,
    width: '100%',
    borderColor: Colors.COACHING_COLOR,
  },
  contentWrapper: {      
    marginTop: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
    color: '#77838F',
  },  
  bottom: {
    marginTop: 25,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  
 
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 10,
    fontWeight: '800',
    color: 'white',
    fontSize: 12,
  },
  headingText2: {
    ...CommonStyles.headingText2,
    fontFamily: Typography.FONT_SF_REGULAR,
    fontWeight: '400',
    color: 'white',
    fontSize: 8,
  },

  ContentWrapper: {
    height: 400,
    width: '100%',
    marginTop: 20,
    marginLeft: 15,   
  }, 
});
