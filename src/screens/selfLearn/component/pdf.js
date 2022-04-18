import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  PermissionStatus,
} from 'react-native';
import Pdf from 'react-native-pdf';
import ToastMessage from '../../../shared/toast';
import ReactNativeBlobUtil from 'react-native-blob-util';

const pdf = props => {
  const {navigation, route} = props;

  const source = {uri: route.params.paramsFile, cache: true};

  const fileUrl = route.params.paramsFile;

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
    let RootDir =
      Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
    let options = Platform.select({
      ios: {
        fileCache: true,
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
      },
      android: {
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
      },
    });
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
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${5}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${1}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />

      <TouchableOpacity style={styles.buttonWrapper} onPress={checkPermission}>
        <Text style={styles.text}>Download File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonWrapper: {
    width: '50%',
    padding: 5,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#F26722',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
});
