import React, {useEffect} from 'react';
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../../../shared/footer';
import HTMLView from 'react-native-htmlview';
import FlatTextInput from '../../../shared/form/FlatTextInput';

import {CommonStyles, Colors, Typography} from '../../../theme';

const Email = props => {
  const {
    navigation,
    profile,
    profileLoading,
    profileError,
    fetchProfile,
    cleanProfile,
  } = props;

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfile();
    };
    fetchProfileAsync();
  }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={40}
                color="white"
                style={{marginTop: 15}}
              />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'center',
                  marginLeft: 20,
                }}>
                <Text style={{color: 'white', fontSize: 20}}>New Messages</Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {profile?.user_email}
                </Text>
              </View>
            </View>
            <Ionicons
              name={'send-sharp'}
              size={30}
              color={'white'}
              style={{marginTop: 30, position: 'absolute', right: 20}}
            />

            {/**/}
          </View>
          <View style={{padding: 20, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, marginTop: 10}}>From :</Text>
              <TextInput
                multiline={true}
                style={styles.input}
                value={profile?.user_email}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, marginTop: 10}}>To :</Text>
              <TextInput
                multiline={true}
                style={styles.input}
                value="agajgjgjejkgsha"
              />
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18}}>Subject :</Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.textarea}
                value=""
              />
            </View>

            <View style={{marginTop: 10}}>
              <Text style={{fontSize: 18}}>Messages :</Text>
              <TextInput
                multiline={true}
                numberOfLines={15}
                style={styles.textarea}
                value=""
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Email;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    height: 80,
    backgroundColor: '#02B0F0',
    borderTopWidth: 0.2,
    padding: 10,

    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    paddingLeft: 10,
  },
  textarea: {
    padding: 10,
  },
});
