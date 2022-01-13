import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity, Image
} from 'react-native';

import {CommonStyles, Colors,Typography} from '../../../theme';
import {getAsyncStorage} from "../../../utils/storageUtil";
import {JWT_TOKEN} from "../../../constants";
import {decodeUserID} from "../../../utils/jwtUtil";
import {Button} from 'native-base';

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

    useEffect(async () => {
        let token = await getAsyncStorage(JWT_TOKEN);
        setUserID(decodeUserID(token));
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
				<TouchableOpacity onPress={() => navigation.navigate('Chat', {friendID: item.id, userID: userID})}>

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
							<Text style={{fontSize: 15, fontWeight: "bold", color: "black"}}>{item.displayname}</Text>
							<Text style={{fontSize: 10}}>{item.email}</Text>
						</View>
                
            		</View>
				</TouchableOpacity>
			</View>
        

        );
    };

    return (
        <View style={styles.container}>
			<View style={styles.buttonWrapper}>
                    <TouchableOpacity>
                        <Button style={[styles.button, styles.shadowProp]}>
                         	<Text style={[styles.buttonText,{color:"#4835BE"}]}>Message</Text>
                        </Button>
                    </TouchableOpacity>
					<TouchableOpacity>
                        <Button style={[styles.button,{backgroundColor:"#F26722"}]}>
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
        // borderWidth: 0.3,
    },
	buttonWrapper: {
		display:'flex',
		flexDirection:'row', 
		marginTop:10, 
    }, 
    button: {
        width:180,
        borderRadius: 10,
        height: 38,
		margin:8,
		backgroundColor:'white'
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
		shadowRadius: 3.84,
		elevation: 5,
	  },
});

export default UserList;
