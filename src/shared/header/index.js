import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getAsyncStorage} from "../../utils/storageUtil";
import {USER_NAME} from "../../constants";

const HeaderTitle = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        async function myName() {
            const name = await getAsyncStorage(USER_NAME);
            await setUsername(name);
        }

        myName();

    }, []);

    return (
        <View style={{marginLeft: 40}}>
            <Text style={{marginTop: 10, color: "#000", fontSize: 15}}>Good Morning</Text>
            <Text style={{fontWeight: "700", color: "#000", fontSize: 20}}>{username}</Text>
        </View>
    );
};

export default HeaderTitle;
