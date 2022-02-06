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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';
import {Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import { Dialog } from 'react-native-paper';
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
  const [category, setCategory] = useState( );
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
          
            <Picker
              selectedValue={category}
			  ref={pickerRef}
              mode={Dialog}
			  style={{ height: 50, width: '65%'}}
			  itemTextStyle={{fontSize:12}}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              onPress={async () => {
                setSorting('DESC');
                await fetchAllUsers({
                  s: searchKey,
                  sort: sorting,
                  expertise_areas: category,
                });
              }}>
              {Object.keys(expertise).map(key => {
                return (
                  <Picker.Item label={expertise[key]} value={key} key={key} style={{fontSize:12}}  />
                );
              })}
            </Picker>

          <View style={styles.icon}>
            <Ionicons
              name="arrow-up"
              size={20}
              color="#d7d7d7"
              style={{marginTop: 15}}
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
              style={{marginTop: 15}}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    width: '20%',
    borderColor: '#707070',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  textWrapper: {
    marginTop: 15,
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
    top: 10,
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
