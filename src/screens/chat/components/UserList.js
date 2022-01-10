import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';
import {getAsyncStorage} from "../../../utils/storageUtil";
import {JWT_TOKEN} from "../../../constants";
import {decodeUserID} from "../../../utils/jwtUtil";

const UserList = (props) => {

    const {navigation, route} = props;
    const [userID, setUserID] = useState(null);
    const data = [
        {
            ID: '1',
            name: 'Krishna',
            description: 'Hosted by Michael Cooper',
        },
        {
            ID: '2',
            name: 'Shyam',
            description: 'Hosted by Michael Cooper',
        },
        {
            ID: '3',
            name: 'Hari',
            description: 'Hosted by Michael Cooper',
        },
    ];

    useEffect(async () => {
        let token = await getAsyncStorage(JWT_TOKEN);
        setUserID(decodeUserID(token));
    }, []);


    const _renderItems = ({item, index}) => {

        return (
            <View
                style={styles.wrapper}
                key={index}
            >
                <TouchableOpacity onPress={() => navigation.navigate('Chat', {friendID: item.ID, userID: userID})}>
                    <Text style={{fontSize: 15, fontWeight: "bold", color: "black"}}>{item.name}</Text>
                    <Text style={{fontSize: 10}}>{item.description}</Text>
                </TouchableOpacity>
            </View>

        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                Vertical
                showsVerticalScrollIndicator={false}
                data={data}
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
