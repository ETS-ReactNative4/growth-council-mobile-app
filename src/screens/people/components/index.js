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
import {Picker} from '@react-native-picker/picker';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from "../../../shared/toast";


const People = (props) => {

    const {
        navigation,
        connection,
        connectionLoading,
        connectionError,
        fetchAllConnection,
        cleanConnection,

        memberConnections,
        memberConnectionLoading,
        memberConnectionError,
        connectMemberByIdentifier,
        cleanConnectMember
    } = props;

    const [category, setCategory] = useState("Category");
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const fetchAllConnectionAsync = async () => {
            await fetchAllConnection();
        };
        fetchAllConnectionAsync();
    }, []);

    const connectMemberByMemberID = async (memberID) => {
        const response = await connectMemberByIdentifier({member_id: memberID});
        if (response?.payload?.status === 200) {
            ToastMessage.show('You have successfully connected.');
        } else {
            ToastMessage.show(response?.payload?.response);
        }
    };

    const _renderItem = ({item, index}) => {

        return (
            <View style={[styles.wrapper, styles.shadowProp]}>
                <Image source={{uri: item.avatar}}
                       style={{
                           width: 68,
                           height: 68,
                           margin: 8,
                           borderRadius: 8,
                       }}
                />
                <View style={{margin: 10, width: '55%'}}>
                    <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.displayname}</Text>
                    <Text style={{fontSize: 16}}>{item.user_meta.title}</Text>
                    <Text style={{fontSize: 14}}>{item.user_meta.company}</Text>
                </View>
                <TouchableOpacity onPress={() => connectMemberByMemberID(item.ID)}>
                    <Ionicons
                        name='checkmark-circle'
                        size={30}
                        color='skyblue'
                        style={{marginTop: 25}}
                    />
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Ionicons name="search-outline" color={'#000'} size={24}
                              style={{marginLeft: 20, marginTop: 20, zIndex: 20, position: 'absolute'}}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        keyboardType="text"
                    />
                    <Ionicons name='list-outline' color="#14A2E2" size={30} style={{marginTop: 10}}/>
                    <Ionicons name='apps' color={'#000'} size={30} style={{marginLeft: 10, marginTop: 15}}/>

                </View>
                <View style={{display: 'flex', flexDirection: 'row', height: 48, marginTop: 16}}>


                    <View style={{borderRightWidth: 1, borderColor: '#707070'}}>
                        <Picker
                            selectedValue={category}
                            mode={'dropdown'}
                            style={{height: 30, width: 170,}}
                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        >
                            <Picker.Item label="Category" value="Category" style={{fontSize: 14,}}/>
                            <Picker.Item label="Kathmandu" value="kathmandu"/>
                            <Picker.Item label="Bhaktapur" value="bhaktapur"/>
                        </Picker>
                    </View>

                    <View style={{borderRightWidth: 1, borderColor: '#707070', display: 'flex', flexDirection: 'row'}}>
                        <Ionicons
                            name='arrow-up'
                            size={20}
                            color='#d7d7d7'
                            style={{marginTop: 20}}
                        />
                        <Ionicons
                            name='arrow-down'
                            size={20}
                            color='#d7d7d7'
                            style={{marginTop: 20}}
                        />
                        <Text style={{marginTop: 20, marginRight: 40}}>Sort</Text>
                    </View>


                    <Font
                        name='filter'
                        size={20}
                        color='#d7d7d7'
                        style={{marginTop: 20, marginLeft: 20}}
                    />
                    <Text style={{marginTop: 20, marginLeft: 10}}>Filter</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <FlatList
                        vertical
                        showsVerticalScrollIndicator={false}
                        data={connection}
                        renderItem={_renderItem}/>
                </View>

                <View style={{alignItems: 'center', width: '35%', marginLeft: 140, marginBottom: 10}}>
                    <Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
                    <Image
                        source={require('../../../assets/img/fristDigi.png')}
                        style={{width: "100%", height: 20}}
                    />
                </View>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        // ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR
    },
    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 0.5,
        paddingLeft: 40,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    wrapper: {

        height: 88,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        // borderWidth: 0.3,
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
