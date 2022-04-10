import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {BubblesLoader} from 'react-native-indicator';
import YoutubePlayer from '../../../shared/youtube';
import Footer from '../../../shared/footer';
import Player from '../../dashboard/components/Player';
import HTMLView from 'react-native-htmlview';
import {CommonStyles, Colors, Typography} from '../../../theme';
import Loading from '../../../shared/loading';
import ReactNativeBlobUtil from 'react-native-blob-util';
import ToastMessage from '../../../shared/toast';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const SubPOEDetails = props => {
  const {
    navigation,
    route,
    poeDetails,
    poeDetailLoading,
    poeDetailError,
    fetchAllPOEDetail,
    cleanPOEDetail,
    pillarMemberContents,
    pillarMemberContentLoading,
    pillarMemberContentError,
    fetchAllPillarMemberContent,
    cleanPillarMemberContent,
    pillarPOEs,
    pillarPOELoading,
    pillarPOEError,
    fetchAllPillarPOE,
    cleanPillarPOE,
  } = props;

  const isFocused = useIsFocused();
  const [memberConnection, setMemberConnection] = useState([]);


  useEffect(() => {
    const fetchAllPOEDetailAsync = async () => {
      await fetchAllPOEDetail(route.params.poeId);
    };
    fetchAllPOEDetailAsync();
  }, []);



  useEffect(() => {
    const fetchAllPillarMemberContentAsync = async () => {
      await fetchAllPillarMemberContent(route.params.pillarId);
    };
    fetchAllPillarMemberContentAsync();
  }, [isFocused]);

  useEffect(() => {
    setMemberConnection(pillarMemberContents);
  }, [pillarMemberContents]);

  useFocusEffect(
    useCallback(() => {
      const fetchAllPillarPOEAsync = async () => {
        await fetchAllPillarPOE(route.params.poeId);
      };
      fetchAllPillarPOEAsync();

      return () => {
        cleanPillarPOE();
      };
    }, []),
  );
  console.log(route.params.poeId);
  
  const _renderItem = ({item, index}, navigation) => {
    return (
      <View style={[styles.bottomWrapper, styles.shadowProp]} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: '100%',
              height: 83,
              borderRadius: 10,
            }}
          />
          <View style={{padding: 10, paddingBottom: 20}}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: Typography.FONT_SF_SEMIBOLD,
                color: Colors.TERTIARY_TEXT_COLOR,
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 6}}>Frost and Sullivan</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.chatIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('People')}>
            <Ionicons name={'add'} size={15} color="#B1AFAF" />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const _renderTopItem = ({item, index}) => {
    const actualDate = moment(item.event_start).format('ll').split(',', 3);
    const date = actualDate[0].split(' ', 3);
    //console.log(date[1]);

    let backgroundImage = '';
    switch (
      item?.pillar_categories[0]?.parent ||
      item?.pillar_categories[1]?.parent
    ) {
      case 0:
      case 117:
        backgroundImage = require('../../../assets/img/Rectangle2.png');
        break;

      case 0:
      case 118:
        backgroundImage = require('../../../assets/img/best-practice-bg.png');
        break;

      default:
        backgroundImage = require('../../../assets/img/Rectangle.png');
    }

    let organizer = item?.organizer?.term_name;
    let description = item?.organizer?.description;
    if (organizer === undefined) {
      organizer = ' ';
    } else {
      organizer = <Text>Hosted By {item?.organizer?.term_name}</Text>;
    }

    if (description === undefined) {
      description = ' ';
    } else {
      description = item?.organizer?.description;
    }
    return (
      <View style={styles.topWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EventDetail', {id: item.ID})}>
          <ImageBackground
            style={{
              width: '100%',
              height: 150,
              borderRadius: 20,
            }}
            source={backgroundImage}>
            <View
              style={{
                width: 40,
                height: 50,
                marginTop: 10,
                marginLeft: 200,
                backgroundColor: '#EBECF0',
                borderRadius: 10,
                padding: 5,
                alignItems: 'center',
              }}>
              <Text>{date[1]}</Text>
              <Text>{date[0]}</Text>
            </View>

            <View style={styles.header}>
              <Text style={styles.headingText1}>{item.title}</Text>
              <Text style={styles.headingText2}>
                {organizer} {description}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderContentItem = ({item, index}) => {
    const file = item?.file;
    const link = file.split('=', 2);

    let videoLink = link[1]?.split('&', 2);
    return <Player {...props} item={item} file={file} videoLink={videoLink} />;
  };

  const _renderContent = ({item, index}) => {
    const fileUrl = item?.file?.url;

    const checkPermission = async () => {
      if (Platform.OS === 'ios') {
        downloadFile();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'Application needs access to your storage to download File',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            downloadFile();

            console.log('Storage Permission Granted.');
          } else {
            Alert.alert('Error', 'Storage Permission Not Granted');
          }
        } catch (err) {
          console.log('++++' + err);
        }
      }
    };

    const downloadFile = () => {
      let date = new Date();

      let FILE_URL = fileUrl;

      let file_ext = getFileExtention(FILE_URL);

      file_ext = '.' + file_ext[0];

      const {config, fs} = ReactNativeBlobUtil;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path:
            RootDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            file_ext,
          description: 'downloading file...',
          notification: true,
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch('GET', FILE_URL, ToastMessage.show('PDF File Download Started.'))
        .then(res => {
          console.log('res -> ', JSON.stringify(res));
          ToastMessage.show('PDF File Downloaded Successfully.');
        });
    };

    const getFileExtention = fileUrl => {
      return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
    };
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('pdf', {paramsFile: item?.file?.url})
        }>
        <View style={styles.attachmentContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <FontAwesomeIcon name="file-pdf-o" size={35} color="#9B9CA0" />
            <Text style={styles.attachmentTitle}>{item?.file?.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.attachmentDownloadButton}
            onPress={checkPermission}>
            <FeatherIcon name="arrow-down" size={20} color="#9B9CA0" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  let backgroundColor = '';
  const parent = poeDetails?.parent;
  switch (parent) {
    case 118:
      backgroundColor = Colors.PRACTICE_COLOR;
      break;
    case 117:
      backgroundColor = Colors.COMMUNITY_COLOR;
      break;
    case 119:
      backgroundColor = Colors.COACHING_COLOR;
  }

  let poeDescription = poeDetails?.description;
  if (poeDescription !== undefined) {
    poeDescription = poeDetails?.description;
  } else {
    poeDescription = '';
  }
  console.log('poe', route.params.poeId);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView
        style={{
          backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        }}>
        <View style={styles.container}>
          <ImageBackground
            source={{uri: poeDetails?.pillar_detail_image}}
            style={{height: 240, width: '100%'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Best Practices', {
                  poeId: route.params.id,
                  pillarId: route?.params?.pillarId,
                })
              }>
              <View style={styles.arrow}>
                <Ionicons name={'arrow-back'} size={50} color="white" />
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <View style={[styles.icon, styles.shadowProp]}>
            <Image
              source={{uri: poeDetails?.image}}
              style={{
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>

          <ScrollView
            style={[styles.content, {backgroundColor: backgroundColor}]}>
            <View style={styles.contentWrapper}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#1E2022',
                  textAlign: 'center',
                  marginTop: 50,
                }}>
                {poeDetails.name}
              </Text>

              <HTMLView
                value={poeDescription}
                textComponentProps={{
                  style: {
                    fontFamily: Typography.FONT_SF_REGULAR,
                    fontSize: 14,
                    lineHeight: 24,
                    padding: 15,
                    textAlign: 'left',
                    color: '#77838F',
                  },
                }}
              />

              {/* {poeEvents?.length !== 0 && (
                <View style={styles.top}>
                  <Text style={styles.title}> Events</Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={poeEvents}
                      renderItem={_renderTopItem}
                    />
                  </View>
                </View>
              )} */}
              {/* {pillarMemberContents?.members?.length !== 0 && (
                <View style={styles.bottom}>
                  <Text style={styles.title}> Members</Text>
                  <View>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={pillarMemberContents?.members}
                      renderItem={item => _renderItem(item, navigation)}
                    />
                  </View>
                </View>
              )} */}

              {poeDetails?.attachments?.length !== 0 &&
                poeDetails?.attachments !== null &&
                poeDetails?.attachments !== false && (
                  <View style={styles.sectionContainer}>
                    <FlatList
                      vertical
                      showsHorizontalScrollIndicator={false}
                      data={poeDetails?.attachments}
                      renderItem={_renderContent}
                    />
                  </View>
                )}
              {poeDetails?.pillar_contents?.length !== 0 &&
                poeDetails?.pillar_contents !== null &&
                poeDetails?.pillar_contents !== false && (
                  <View style={styles.growthContent}>
                    <Text style={styles.title}> Content Library</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={pillarMemberContents?.pillar_contents}
                        renderItem={_renderContentItem}
                      />
                    </View>
                  </View>
                )}

              {/* <Footer /> */}
            </View>
          </ScrollView>
        </View>
        {poeDetailLoading && <Loading />}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    marginTop: 30,
  },

  title: {
    fontSize: 16,
    fontFamily: Typography.FONT_SF_REGULAR,
    color: Colors.PRIMARY_TEXT_COLOR,
    fontWeight: '650',
    marginLeft: 10,
  },

  icon: {
    width: Platform.OS === 'ios' ? 80 : 80,
    height: Platform.OS === 'ios' ? 80 : 80,
    backgroundColor: 'white',
    borderRadius: 19,
    marginTop: 200,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    // borderRadius: 18,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 20,
  },
  contentWrapper: {
    backgroundColor: 'white',
    overflow: 'scroll',
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
  top: {
    marginTop: 10,
    justifyContent: 'center',
  },
  topWrapper: {
    height: 144,
    width: 256,
    marginLeft: 15,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 5,
    marginTop: 15,
  },
  middleWrapper: {
    width: (Dimensions.get('window').width - 10) / 4,
    borderRadius: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleW: {
    backgroundColor: 'white',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottom: {
    marginTop: 15,
  },
  bottomWrapper: {
    width: Dimensions.get('window').width / 4,
    position: 'relative',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  chatIcon: {
    borderRadius: 50,
    backgroundColor: '#F1F1F1',
    padding: 2,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  bottomImage: {
    width: '100%',
    height: 100,
    borderRadius: 20,
  },
  header: {
    margin: 10,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_SF_REGULAR,
    marginTop: 5,
    fontWeight: '600',
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

  growthContent: {
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  ContentWrapper: {
    height: 206,
    width: 364,
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  attachmentContainer: {
    margin: 1,
    width: contentContainerWidth,
    height: 70,
    paddingLeft: 20,
    paddingRight: 8,
    marginRight: 5,
    marginLeft: 15,
    marginTop: 20,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: Colors.UNDENARY_BACKGROUND_COLOR,
    elevation: 5,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
  },
  attachmentTitle: {
    marginLeft: 10,
    fontSize: 14,
    width: '80%',
    fontFamily: 'SFProText-Regular',
    color: Colors.SECONDARY_TEXT_COLOR,
  },
  attachmentDownloadButton: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
});

export default SubPOEDetails;
