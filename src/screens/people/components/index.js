import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  SafeAreaView,
  RefreshControl,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';
import {Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {Dialog} from 'react-native-paper';
import {BubblesLoader} from 'react-native-indicator';
import Footer from '../../../shared/footer';
import {Searchbar} from 'react-native-paper';
import BottomNav from '../../../layout/BottomLayout';

const win = Dimensions.get('window');
const contentContainerWidth = win.width - 30;

const People = props => {
  const {
    navigation,
    users,
    userLoading,
    userError,
    fetchAllUsers,
    cleanUser,

    memberConnections,
    memberConnectionLoading,
    memberConnectionError,
    connectMemberByIdentifier,
    cleanConnectMember,

    expertise,
    expertiseLoading,
    expertiseError,
    fetchAllExpertises,
    cleanExperties,
  } = props;

  const toast = useToast();
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [region, setRegion] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [sorting, setSorting] = useState('ASC');
  const [memberConnection, setMemberConnection] = useState([]);

  useEffect(() => {
    const fetchAllUsersAsync = async () => {
      await fetchAllUsers({
        s: searchKey,
        sort: sorting,
        expertise_areas: category,
      });
    };
    fetchAllUsersAsync();

    return () => {
      cleanUser();
    };
  }, []);

  useEffect(() => {
    setMemberConnection(users);
  }, [users]);

  useEffect(() => {
    const fetchAllExpertisesAsync = async () => {
      await fetchAllExpertises();
    };
    fetchAllExpertisesAsync();
  }, []);

  const connectMemberByMemberID = async (memberID, index) => {
    const response = await connectMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...memberConnection];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setMemberConnection(items);
      fetchAllUsers({
        s: searchKey,
        sort: sorting,
        expertise_areas: category,
      });
      ToastMessage.show('You have successfully connected.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OthersAccount', {id: item.ID})}>
        <View style={[styles.wrapper, styles.shadowProp]} key={index}>
          <Image
            source={{uri: item.avatar}}
            style={{
              width: 66,
              height: 66,
              margin: 8,
              borderRadius: 8,
            }}
          />

          <View style={{margin: 10, width: '55%'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Typography.FONT_SF_REGULAR,
                color: '#222B45',
              }}>
              {item?.user_meta?.first_name} {item?.user_meta?.last_name}
            </Text>
            <Text style={{fontSize: 12, color: '#222B45'}}>
              {item?.user_email}
            </Text>
            <Text style={{fontSize: 12, color: '#222B45'}}>
              {item?.company}
            </Text>
          </View>
          {!memberConnection[index]?.connection && (
            <TouchableOpacity
              onPress={() => connectMemberByMemberID(item.ID, index)}>
              <Ionicons
                name="add-circle"
                size={30}
                color="#B2B3B9"
                style={{marginTop: 25}}
              />
            </TouchableOpacity>
          )}
          {memberConnection[index]?.connection && (
            <Material
              name="check-circle"
              size={30}
              color="#14A2E2"
              style={{marginTop: 25}}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const [pickerVisible, setPickerVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="grey"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
            <Searchbar
              style={styles.input}
              placeholder="Search"
              keyboardType="default"
              value={searchKey}
              onChangeText={async text => {
                setSearchKey(text);
                await fetchAllUsers({
                  s: text,
                  sort: sorting,
                  expertise_areas: category,
                });
              }}
            />
            <View style={styles.icon}>
              <Ionicons
                name="arrow-up"
                size={25}
                color="#7E7F84"
                onPress={async () => {
                  setSorting('DESC');
                  await fetchAllUsers({
                    s: searchKey,
                    sort: 'DESC',
                    expertise_areas: category,
                  });
                }}
              />
              <Ionicons
                name="arrow-down"
                size={25}
                color="#7E7F84"
                onPress={async () => {
                  setSorting('ASC');
                  await fetchAllUsers({
                    s: searchKey,
                    sort: 'ASC',
                    expertise_areas: category,
                  });
                }}
              />
              <Text style={styles.textWrapper}>Sort</Text>
            </View>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.5,
                paddingVertical: 10,
                borderColor: 'gray',
              }}>
              <Text style={{fontSize: 14, color: '#222B45'}}>
                {category ? category : 'Expertise Areas'}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setAccountVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.5,
                paddingVertical: 10,
                borderColor: 'gray',
              }}>
              <Text style={{fontSize: 14, color: '#222B45'}}>
                {account ? account : 'Account Type'}
              </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => setRegionVisible(true)}
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 0.5,
                paddingVertical: 10,
                borderColor: 'gray',
              }}>
              <Text style={{fontSize: 14, color: '#222B45'}}>
                {region ? region : 'Region'}
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,

            backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
          }}>
          {userLoading && (
            <View style={styles.loading1}>
              <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
            </View>
          )}
          <View style={{marginTop: 10}}>
            {memberConnectionLoading && (
              <View
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 1011,
                }}>
                <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
              </View>
            )}
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={users}
              renderItem={_renderItem}
            />
          </View>
          {/* <Footer /> */}
        </ScrollView>
      </View>
    
      <Modal transparent visible={pickerVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPickerVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={category}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async (itemValue, itemIndex) => {
                  setCategory(itemValue);
                  await fetchAllUsers({
                    s: searchKey,
                    sort: 'ASC',
                    expertise_areas: category,
                  });
                }}>
                {Object.keys(expertise).map(key => {
                  return (
                    <Picker.Item
                      label={expertise[key]}
                      value={key}
                      key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={accountVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setAccountVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={account}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async (itemValue, itemIndex) => {
                  setAccount(itemValue);
                  //   await fetchAllUsers({
                  //     s: searchKey,
                  //     sort: 'ASC',
                  //     expertise_areas: category,
                  //   });
                }}>
                {/* {Object.keys(expertise).map(key => {
                  return (
                    <Picker.Item
                      label={expertise[key]}
                      value={key}
                      key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })} */}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={regionVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(56,56,56,0.3)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 300,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setRegionVisible(false)}
              style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  padding: 15,
                  fontSize: 18,
                }}>
                Done
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 40}}>
              <Picker
                selectedValue={region}
                mode="dropdown"
                itemTextStyle={{fontSize: 12}}
                onValueChange={async (itemValue, itemIndex) => {
                  setRegion(itemValue);
                  //   await fetchAllUsers({
                  //     s: searchKey,
                  //     sort: 'ASC',
                  //     expertise_areas: category,
                  //   });
                }}>
                {/* {Object.keys(expertise).map(key => {
                  return (
                    <Picker.Item
                      label={expertise[key]}
                      value={key}
                      key={key}
                      style={{fontSize: 14}}
                    />
                  );
                })} */}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNav {...props} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
    marginBottom: 20,
  },
  input: {
    height: 45,
    width: '70%',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  wrapper: {
    height: 88,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#707070',
    width: '20%',
  },
  textWrapper: {
    fontSize: 14,
    color: '#7E7F84',
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
  loading1: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1011,
  },
});

export default People;
