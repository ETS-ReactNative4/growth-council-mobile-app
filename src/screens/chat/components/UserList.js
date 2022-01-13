import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity, Image
} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';
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
            <View
                style={styles.wrapper}
                key={index}
            >
                <TouchableOpacity onPress={() => navigation.navigate('Chat', {friendID: item.id, friendName: item.displayname, friendAvatar: item.avatar, userID: userID, userName:userName, userAvatar:avatarImg})}>
                    <Image
                        source={{
                            uri: item.avatar,
                        }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginRight: 20,
                        }}
                    />
                    <Text style={{fontSize: 15, fontWeight: "bold", color: "black"}}>{item.displayname}</Text>
                    <Text style={{fontSize: 10}}>{item.email}</Text>
                </TouchableOpacity>
            </View>

        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                Vertical
                showsVerticalScrollIndicator={false}
                data={connection}
                renderItem={_renderItems}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
});

export default UserList;
