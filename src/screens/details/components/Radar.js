import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Button,
  Alert,
  TextInput,
  Image,
  Modal,
  Pressable
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import { WebView } from 'react-native-webview';
import { getAsyncStorage } from '../../../utils/storageUtil';
import { decodeUserID } from '../../../utils/jwtUtil';
import { JWT_TOKEN } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Column } from 'native-base';

const screenHeight = Math.round(Dimensions.get('window').height);

const Radar = props => {
  const {
    route,
    navigation,   
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

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
      <SafeAreaView style={{flex : 1}}>
        
        <View style={styles.arrow}>
          <Ionicons
            name={'arrow-back'}
            size={50}
            color="#4287C3"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View  style={{ height : 400}}>
        <WebView
            source={{ uri: `https://beta.gilcouncil.com/frost-radar?user_id=${userId}` }}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            ref={webviewRef}
           
          />
          </View>
          <View style={{flex: 1}}>     
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>    
          <View style= {styles.mainContent}>
            <View>
              <View style={{flexDirection : 'row', flex: 1}}>
                <View style={{flex: 2}} >
                  <Text style={{fontSize: 12}}>Name</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={{fontSize: 12}}>Growth Index</Text>
                </View>  
                <View style={{flex: 2}}>
                  <Text style={{fontSize: 12}}>Innovation Index</Text>
                </View>
              </View>
             
              <View style={styles.seperationline} />

              <View style={{flexDirection : 'row', flex: 1}}>
                
                <View style={{flex: 2}} >
                  <Text>Elon Musk</Text>
                </View>
                <View style={{flex: 4}}>
                <Button title='View Description'
                      style={[styles.button, {marginLeft: 15}]}
                     >                    
                    </Button>
                </View> 
                
              </View>
             
            </View>
           
          
               
               
          </View> 
        </View>
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
      </ScrollView>     
    </View>
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
    width: '100%',
  },
  mainContent : {
    margin: 20,
    borderRadius: 10,
    padding: 20,    
    backgroundColor: 'blue',  
  },
  seperationline: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#F6F4F4',
    borderBottomWidth: 1,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
    color: '#77838F',
  },  
  button: {
    ...CommonStyles.button,
    height: 10,
    marginBottom: 15,
    borderRadius: 20,
    width: '100%',
  },
  ContentWrapper: {
    height: 400,
    width: '100%',
    marginTop: 20,
    marginLeft: 15,   
  }, 
  name: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    height: 30,
    alignItems: 'center',
    fontFamily: Typography.FONT_SF_REGULAR,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
