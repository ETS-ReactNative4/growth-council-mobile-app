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
    navigation
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
                  <Text style={styles.name}>Name</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.name}>Growth Index</Text>
                </View>  
                <View style={{flex: 2}}>
                  <Text style={styles.name}>Innovation Index</Text>
                </View>
              </View>

              <View style={{flexDirection : 'row', flex: 1}}>
                <View style={{flex: 2}} >
                  <Text style={styles.name}>Member</Text>
                </View>
                <View style={{flex: 2}}>
                <TextInput style={styles.input} />
                </View>  
                <View style={{flex: 2}}>
                <TextInput style={styles.input} />
                </View>
              </View>             
             
              <View style={styles.seperationline} />

              <View>
                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>
                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>   

                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>   

                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>   

                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>   

                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
                </View>   

                <View style={styles.descriptionBtn}>
                  <View style={{flex: 2}} >
                    <Text  style={styles.name}>Elon Musk</Text>
                  </View>
                  <View style={{flex: 4}}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={styles.textStyle}>View Description</Text>
                    </Pressable>                 
                  </View> 
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
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Satya Nadella is Indian-born business executive who is CEO of the computer software company Microsoft. He has steered the company away from a failing mobile strategy and focused on other segments, including cloud computing and augmented reality. In 2016 he oversaw the purchase of the professional network LinkedIn for $26.2 billion. </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
     
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
    //backgroundColor: 'blue',  
  },
  seperationline: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#F6F4F4',
    borderBottomWidth: 1,
  },
  descriptionBtn :{
    flexDirection : 'row',
    flex: 1,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: Typography.FONT_SF_REGULAR,
    fontSize: 14,
    lineHeight: 24,
    padding: 15,
    textAlign: 'left',
    color: '#77838F',
  },
  ContentWrapper: {
    height: 400,
    width: '100%',
    marginTop: 20,
    marginLeft: 15,   
  }, 
  name: {
    fontSize: 12,
    fontWeight: '600',
    height: 30,
    alignItems: 'center',
    fontFamily: Typography.FONT_SF_REGULAR,
    color: 'black',
  },
  input: {
    width: 100,
    height: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
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
    height: 20,
    borderRadius: 20,    
    elevation: 3
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
