import React, {useEffect, useState} from 'react';
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
  Pressable,
} from 'react-native';
import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatTextInput from '../../../shared/form/FlatTextInput';
import {WebView} from 'react-native-webview';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Column} from 'native-base';
import {padding} from '@mui/system';

const screenHeight = Math.round(Dimensions.get('window').height);

const Radar = props => {
  const {
    route,
    navigation,
    radarMemberDetails,
    radarMemberDetailsLoading,
    radarMemberDetailsError,
    fetchRadarMemberDetail,
    cleanPOEDetail,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const webviewRef = React.useRef(null);
  const [userId, setUserId] = useState(0);

  useEffect(async () => {
    let token = await getAsyncStorage(JWT_TOKEN);
    let ID = decodeUserID(token);
    if (ID) {
      setUserId(ID);
    }
  }, []);

  useEffect(() => {
    fetchRadarMemberDetail();
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

  console.log(`https://beta.gilcouncil.com/frost-radar?user_id=${userId}`);

  console.log({radarMemberDetails});
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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.arrow}>
          <Ionicons
            name={'arrow-back'}
            size={50}
            color="#4287C3"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={{height: 400}}>
          <WebView
            source={{
              uri: `https://beta.gilcouncil.com/frost-radar?user_id=${userId}`,
            }}
            renderLoading={LoadingIndicatorView}
            startInLoadingState={true}
            ref={webviewRef}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.mainContent}>
              <View>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{flex: 2}}>
                    <Text style={styles.name}>Name</Text>
                  </View>
                  <View style={{flex: 2, marginLeft: 5}}>
                    <Text style={styles.name}>Growth Index</Text>
                  </View>
                  <View style={{flex: 2, marginLeft: 5}}>
                    <Text style={styles.name}>Innovation Index</Text>
                  </View>
                </View>

                <View
                  style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                  <View style={{flex: 2}}>
                    <Text style={styles.name}>
                      {radarMemberDetails?.display_name}
                    </Text>
                  </View>
                  <View style={{flex: 2}}>
                    <TextInput
                      editable={false}
                      textAlign={'center'}
                      style={styles.input}
                      value={radarMemberDetails?.user_radar_growth_index}
                    />
                  </View>
                  <View style={{flex: 2}}>
                    <TextInput
                      editable={false}
                      textAlign={'center'}
                      style={styles.input}
                      value={radarMemberDetails?.user_radar_innovation_index}
                    />
                  </View>
                </View>

                <View style={styles.seperationline} />

                {radarMemberDetails?.member_details?.map(item => {
                  const memberData = () => {
                    setDescription(item?.member_description);
                    setName(item?.member_name);
                  };
                  return (
                    <View>
                      <View style={styles.descriptionBtn}>
                        <View style={{flex: 2}}>
                          <Text style={styles.name}>{item?.member_name}</Text>
                        </View>
                        <View style={{flex: 4}}>
                          <Pressable
                            style={styles.button}
                            onPress={() => {
                              setModalVisible(true),
                                memberData(description, name);
                            }}>
                            <Text style={styles.textStyle}>
                              View Description
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  );
                })}

                {/* <View style={styles.descriptionBtn}>
                    <View style={{flex: 2}}>
                      <Text style={styles.name}>Elon Musk</Text>
                    </View>
                    <View style={{flex: 4}}>
                      <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(true)}>
                        <Text style={styles.textStyle}>View Description</Text>
                      </Pressable>
                    </View>
                  </View> */}
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
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      position: 'absolute',
                      left: 20,
                      top: 20,
                      bottom: 20,
                    }}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <Ionicons name={'close'} size={35} color={'#4936BE'} />
                    </Pressable>
                  </View>
                  <View style={{marginTop: 40}}>
                    <Text style={{fontSize: 18, color: 'black'}}>{name}</Text>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'black',
                        borderWidth: 1,
                        width: 250,
                        marginTop: 10,
                      }}
                    />
                    <Text style={styles.modalText}>{description}</Text>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Radar;

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    marginTop: 30,
  },
  mainContent: {
    margin: 20,
    borderRadius: 10,
    padding: 20,
    borderWidth: 0.5,
    // backgroundColor: 'blue',
  },
  seperationline: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#F6F4F4',
    borderBottomWidth: 1,
  },
  descriptionBtn: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    alignItems: 'center',
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
    height: 40,
    marginLeft: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#707070',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#0C336C',
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});
