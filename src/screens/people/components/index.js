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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';
import {Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {Dialog} from 'react-native-paper';
import {BubblesLoader} from 'react-native-indicator';

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
    setMemberConnection(users);
  }, []);

  useEffect(() => {
    const fetchAllExpertisesAsync = async () => {
      await fetchAllExpertises();
    };
    fetchAllExpertisesAsync();
  }, []);

  console.log({searchKey}, {sorting}, {category});
  console.log({memberConnections});

  const connectMemberByMemberID = async (memberID, index) => {
    const response = await connectMemberByIdentifier({member_id: memberID});
    if (response?.payload?.code === 200) {
      let items = [...memberConnection];
      let item = {...items[index]};
      item.connection = true;
      items[index] = item;
      setMemberConnection(items);

      ToastMessage.show('You have successfully connected.');
    } else {
      toast.closeAll();
      ToastMessage.show(response?.payload?.response);
    }
    console.log(response);
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const _renderItem = ({item, index}) => {
    return (
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
              color: 'black',
            }}>
            {item?.display_name}
          </Text>
          <Text style={{fontSize: 12, color: '#77838F'}}>
            {item?.user_email}
          </Text>
          <Text style={{fontSize: 12, color: '#77838F'}}>{item?.company}</Text>
        </View>
        {!memberConnection[index]?.connection && (
          <TouchableOpacity
            onPress={() => connectMemberByMemberID(item.ID, index)}>
            <Feather
              name="plus-circle"
              size={25}
              color="skyblue"
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        )}
        {memberConnection[index]?.connection && (
          <Feather
            name="check-circle"
            size={25}
            color="skyblue"
            style={{marginTop: 25}}
          />
        )}
      </View>
    );
  };

  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
      }}>
      <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
          <Ionicons
            name="search-outline"
            color={'#B2B3B9'}
            size={24}
            style={{
              marginLeft: 30,
              marginTop: 30,
              zIndex: 10,
              position: 'absolute',
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            keyboardType="text"
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
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity
            onPress={() => setPickerVisible(true)}
            style={{
              flex: 1,
              alignItems: 'center',
              borderWidth: 1,
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: 'gray',
              marginRight: 30,
            }}>
            <Text style={{fontSize: 12}}>
              {category === '' ? 'Select Category' : category}
            </Text>
          </TouchableOpacity>
          <View style={styles.icon}>
            <Ionicons
              name="arrow-up"
              size={20}
              color="#d7d7d7"
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
              size={20}
              color="#d7d7d7"
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

        {userLoading && (
          <View style={styles.loading1}>
            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={80} />
          </View>
        )}
        <View style={{marginTop: 40}}>
          {memberConnectionLoading && (
            <View style={styles.loading1}>
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
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '35%',
          marginLeft: 140,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
        <Image
          source={require('../../../assets/img/fristDigi.png')}
          style={{width: '100%', height: 20}}
        />
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
                ref={pickerRef}
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
                      style={{fontSize: 12}}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...CommonStyles.container,
    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    flex: 1,
  },
  input: {
    height: 45,
    width: '90%',
    margin: 20,
    borderWidth: 0.2,
    paddingLeft: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    borderColor: '#707070',
  },
  textWrapper: {
    fontSize: 14,
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
