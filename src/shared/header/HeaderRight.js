import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import {getAsyncStorage} from "../../utils/storageUtil";
import {USER_AVATAR} from "../../constants";

const HeaderRight = ({navigation}) => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        async function myAvatarImg() {
            const avatarImg = await getAsyncStorage(USER_AVATAR);
            await setAvatar(avatarImg);
        }

        myAvatarImg();

    }, []);

    return (
        <View style={{display: 'flex', flexDirection: 'row'}}>
            <Ionicons name="search-outline" color={'#000'} size={26} style={{marginTop: 10, marginRight: 15}}/>
            <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}>
                <Image
                    //source={require('../assets/img/small_profile_image.png')}
                    source={{
                        uri: avatar,
                    }}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        marginRight: 20,
                    }}
                />
            </TouchableOpacity>

        </View>
    );
};

export default HeaderRight;
