import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {useToast} from 'native-base';

import {Colors, Typography} from '../../../theme';
import ToastMessage from "../../../shared/toast";

const People = (props) => {

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
        cleanConnectMember
    } = props;

    const toast = useToast();

    const [category, setCategory] = useState('Category' );
	const [listofExpertise, setlistofExpertise] = useState([]);

    const [searchKey, setSearchKey] = useState('');
    const [sorting, setSorting] = useState('ASC');
    const [memberConnection, setMemberConnection] = useState([]);

    useEffect(() => {
        const fetchAllUsersAsync = async () => {
            await fetchAllUsers({s: searchKey, sort: sorting});
        };
        fetchAllUsersAsync();
        setMemberConnection(users);
    }, []);

    const connectMemberByMemberID = async (memberID, index) => {
        const response = await connectMemberByIdentifier({member_id: memberID});
        if (response?.payload?.status === 200) {

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
    };

    const _renderItem = ({item, index}) => {

        return (
            <View style={[styles.wrapper, styles.shadowProp]} key={index}>
                <Image source={{uri: item.avatar}}
                       style={{
                           width: 66,
                           height: 66,
                           margin: 8,
                           borderRadius: 8,
                       }}
                />
                <View style={{margin: 10, width: '55%'}}>
                    <Text style={{fontSize: 14, fontFamily:Typography.FONT_SF_REGULAR, color:'black'}}>{item?.display_name}</Text>
                    <Text style={{fontSize: 12, color:'#77838F'}}>{item?.user_email}</Text>
                    <Text style={{fontSize: 12,color:'#77838F'}}>{item?.company}</Text>
                </View>
                {!memberConnection[index]?.connection &&
                <TouchableOpacity onPress={() => connectMemberByMemberID(item.ID, index)}>
                    <Feather
                        name='plus-circle'
                        size={25}
                        color='skyblue'
                        style={{marginTop: 25}}
                    />
                </TouchableOpacity>
                }
                {memberConnection[index]?.connection &&
                <Feather
                    name='check-circle'
                    size={25}
                    color='skyblue'
                    style={{marginTop: 25}}
                />
                }
            </View>
        )
    };
	const renderExpertise = () => {
		return listofExpertise.map((expertise) => {
		  return <Picker.item label="Corporate Strategy"
		  value="Corporate Strategy" />;
		});
	  };

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR}}>
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Ionicons name="search-outline" color={'#B2B3B9'} size={24}
                              style={{marginLeft: 30, marginTop: 30, zIndex: 10, position: 'absolute'}}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        keyboardType="text"
                        value={searchKey}
                        onChangeText={async (text) => {
                            setSearchKey(text);
                            await fetchAllUsers({s: text, sort: sorting});
                        }}
                    />
                    {/* <Ionicons name='list-outline' color="#14A2E2" size={30} style={{marginTop: 10}}/>
                    <Ionicons name='apps' color={'#B2B3B9'} size={25} style={{marginLeft: 10, marginTop: 14}}/> */}

                </View>
                <View style={styles.iconWrapper}>
                    <View style={{borderRightWidth: 0.2, borderColor: '#707070',}}>
						<Picker
						selectedValue={category}
						mode={'dropdown'}
						style={{height: 30, width: 250,}}
						onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
						>
						{/* <Picker.Item label="Category" value="Category" style={{fontSize: 14,}}/>
						<Picker.Item label="Corporate Strategy" value="Corporate Strategy" style={{fontSize: 14,}}/>
						<Picker.Item label="Research & Developement/Innovation" value="Research" style={{fontSize: 14,}}/>
						<Picker.Item label="Business Developement" value="Business" style={{fontSize: 14,}}/>
						<Picker.Item label="Product Strategy/Developement" value="Product" style={{fontSize: 14,}}/>
						<Picker.Item label="Marketing" value="Marketing" style={{fontSize: 14,}}/> */}

						{renderExpertise()}
						</Picker>
                  </View>

                    <View style={styles.icon}>
                        <Ionicons
                            name='arrow-up'
                            size={20}
                            color='#d7d7d7'
                            style={{marginTop: 15, }}
                            onPress={async () => {
                                setSorting('DESC');
                                await fetchAllUsers({s: searchKey, sort: 'DESC'});
                            }}
                        />
                        <Ionicons
                            name='arrow-down'
                            size={20}
                            color='#d7d7d7'
                            style={{marginTop: 15}}
                            onPress={async () => {
                                setSorting('ASC');
                                await fetchAllUsers({s: searchKey, sort: 'ASC'});
                            }}
                        />
                        <Text style={styles.textWrapper}>Sort</Text>
                    </View>

					{/* <View style={styles.icon}>
						<Font
							name='filter'
							size={20}
							color='#7E7F84'
							style={{marginTop: 15, marginRight:10}}
						/>
						<Text style={styles.textWrapper}>Filter</Text>
					</View> */}
                  
                </View>
                <View style={{marginTop: 30}}>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={users}
                        renderItem={_renderItem}/>
                </View>


            </View>
            <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                <Image
                    source={require('../../../assets/img/fristDigi.png')}
                    style={{width: "100%", height: 20}}
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
	iconWrapper:{
		display: 'flex',
		flexDirection: 'row',
		height: 48,
		justifyContent:'center',
		alignContent:'center',
		
	},
	icon:{
		width:"20%",
		borderColor: '#707070',
		display: 'flex',
		flexDirection: 'row',
		justifyContent:'center',
		 alignContent:'center',
		
		 
	},
	textWrapper:{
		marginTop: 15, 
		fontSize:14
	},
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});

export default People;
