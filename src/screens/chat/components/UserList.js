import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity, Image,
	ScrollView
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from "../../../utils/storageUtil";
import {JWT_TOKEN, USER_NAME, USER_AVATAR} from "../../../constants";
import {decodeUserID} from "../../../utils/jwtUtil";

const UserList = (props) => {

    const {
        navigation,
        route,
        connection,
        connectionLoading,
        connectionError,
        fetchAllConnection,
        cleanConnection
    } = props;

    const [userID, setUserID] = useState(null);
    const [avatarImg, setAvatarImg] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(async () => {
        let token = await getAsyncStorage(JWT_TOKEN);
        setUserID(decodeUserID(token));
        let avatar = await getAsyncStorage(USER_AVATAR);
        setAvatarImg(avatar);
        let username = await getAsyncStorage(USER_NAME);
        setUserName(username);
    }, []);

    useEffect(() => {
        const fetchMyConnectionAsync = async () => {
            await fetchAllConnection();
        };
        fetchMyConnectionAsync();
    }, []);

    console.log("connection:::::::::::::", connection);

    const _renderItems = ({item, index}) => {

        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Chat', {
                    friendID: item.id,
                    friendName: item.displayname,
                    friendAvatar: item.avatar,
                    userID: userID,
                    userName: userName,
                    userAvatar: avatarImg
                })}>

                    <View style={[styles.wrapper, styles.shadowProp]} key={index}>
                        <Image source={{uri: item.avatar,}}
                               style={{
                                   height: 60,
                                   width: 60,
                                   borderRadius: 50,
                                   margin: 14,
                               }}
                        />
                        <View style={{margin: 10, width: '55%'}}>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: Typography.FONT_SF_REGULAR,
                                color: "black"
                            }}>{item.displayname}</Text>
                            <Text style={{fontSize: 12, marginTop: 10}}>{item.email}</Text>
                        </View>

                        <View style={{marginTop: 10}}>
                            <Text style={{fontSize: 12, fontFamily: Typography.FONT_SF_REGULAR}}>15 min</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>

        );
    };

    return (
		<ScrollView contentContainerStyle={{flexGrow: 1,backgroundColor:Colors.PRIMARY_BACKGROUND_COLOR}}>
			  <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity>
                    <Button style={[styles.button, styles.shadowProp]}>
                        <Text style={[styles.buttonText, {color: "#4835BE"}]}>Message</Text>
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button style={[styles.button, {backgroundColor: "#F26722"}]}
                            onPress={() => Linking.openURL('mailto:contact@frost.com')}>
                        <Text style={styles.buttonText}>Contact US</Text>
                    </Button>
                </TouchableOpacity>

            </View>
            <FlatList
                Vertical
                showsVerticalScrollIndicator={false}
                data={connection}
                renderItem={_renderItems}
            />
        </View>

		<View style={{ alignItems:'center', width:'35%',marginLeft:140, marginBottom:10}}>
					<Text style={{fontSize: 8, marginTop: 10}}>Powered By</Text>
					<Image 
						source={require('../../../assets/img/fristDigi.png')}
						style={{width:"100%", height:20}}
					/>
				</View>
		</ScrollView>
      
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    },
    wrapper: {

        height: 88,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        width: 180,
        borderRadius: 10,
        height: 38,
        margin: 8,
        backgroundColor: 'white'
    },
    buttonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,

    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
    },
});

export default UserList;
