import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import {Button} from 'native-base';
import {Linking} from 'react-native';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN, USER_NAME, USER_AVATAR} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {useIsFocused} from '@react-navigation/native';
import Footer from '../../../shared/footer';
import BottomNav from '../../../layout/BottomLayout';
import ChatCount from '../../../shared/chatCount';

const UserList = props => {
    const {
        navigation,
        connection,
        connectionLoading,
        connectionError,
        fetchAllConnection,
        cleanConnection,
    } = props;

    const [userID, setUserID] = useState(null);
    const [avatarImg, setAvatarImg] = useState(null);
    const [userName, setUserName] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        const setLoggedInUserInfoAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            setUserID(decodeUserID(token));
            let avatar = await getAsyncStorage(USER_AVATAR);
            setAvatarImg(avatar);
            let username = await getAsyncStorage(USER_NAME);
            setUserName(username);
        };
        setLoggedInUserInfoAsync();
    }, [isFocused]);

    useEffect(() => {
        fetchAllConnection();
        return () => {
            cleanConnection();
        };
    }, [isFocused]);

    const _renderItems = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Chat', {
                            friendID: item.ID,
                            friendName: item.display_name,
                            friendAvatar: item.avatar,
                            userID: userID,
                            userName: userName,
                            userAvatar: avatarImg,
                        })
                    }>
                    <View style={[styles.wrapper, styles.shadowProp]} key={index}>
                        <Image
                            source={{uri: item.avatar}}
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 50,
                                margin: 14,
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
                            <Text style={{fontSize: 12, marginTop: 10}}>
                                {item?.user_email}
                            </Text>

                            <ChatCount item={item} userID={userID}/>

                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (

        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
                }}>
                <View style={styles.container}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity>
                            <Button style={[styles.button, styles.shadowProp]}>
                                <Text style={[styles.buttonText, {color: '#4835BE'}]}>
                                    Message
                                </Text>
                            </Button>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Button
                                style={[styles.button, {backgroundColor: '#F26722'}]}
                                onPress={() => Linking.openURL('mailto:contact@frost.com')}>
                                <Text style={styles.buttonText}>Contact us</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
                    {connectionLoading && (
                        <View style={styles.loading1}>
                            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR} size={60}/>
                        </View>
                    )}
                    <FlatList
                        Vertical
                        showsVerticalScrollIndicator={false}
                        data={connection}
                        renderItem={_renderItems}
                    />
                </View>

                <Footer/>
            </ScrollView>
            <BottomNav {...props} navigation={navigation}/>
        </SafeAreaView>
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
        padding: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    button: {
        width: Platform.OS === 'ios' ? 140 : 160,
        borderRadius: 10,
        height: 38,
        marginTop: 8,
        backgroundColor: 'white',
    },
    buttonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
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

export default UserList;
