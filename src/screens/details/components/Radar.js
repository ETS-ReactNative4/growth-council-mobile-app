import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Footer from '../../../shared/footer';
import { WebView } from 'react-native-webview';

const screenHeight = Math.round(Dimensions.get('window').height);

const Radar = props => {
  const {
    route,
    navigation,   
  } = props;

  const webviewRef = React.useRef(null);

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

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
        <WebView
          source={{ uri: "https://beta.gilcouncil.com/frost-radar/" }}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          ref={webviewRef}
        />
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
  arrow: {
    marginTop: 30,
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
