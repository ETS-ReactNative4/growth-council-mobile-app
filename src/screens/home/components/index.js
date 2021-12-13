import React, {useEffect} from 'react';
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';

const Home = (props) => {

    const {
        navigation,
        profile,
        loading,
        error,
        fetchEmployeeByIdentifier,
        cleanEmployee
    } = props;

    useEffect(() => {
        const fetchEmployeeAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            await fetchEmployeeByIdentifier(decodeUserID(token));
        };
        fetchEmployeeAsync();
    }, []);

    return (

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.SECONDARY_BACKGROUND_COLOR}/>
            <View style={styles.salutationBox}>
                <View style={styles.salutationBoxCol}>
                    <Text style={styles.salutationBoxText}>{'Welcome'},</Text>
                    <Text style={styles.name}>{profile?.name} !</Text>
                </View>

            </View>

            <View style={styles.middleContent}>
                <TouchableOpacity  onPress={() => navigation.navigate('TimeLog', {project_id: profile?.project_id})}>
                <View style={styles.timeLogWrapper}>
                    <View style={styles.timeLogInner}>
                        <View style={styles.timeLogCircle}>
                            <Icon name="clock" color={Colors.PRIMARY_TEXT_COLOR} size={30}/>
                        </View>
                        <Text style={styles.timeLogText}>Time Log</Text>
                    </View>
                </View>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    salutationBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 90 : 50,
        marginLeft: 32,
        marginRight: 32,
    },
    salutationBoxText: {
        fontSize: Typography.FONT_SIZE_SMALL,
        fontFamily: Typography.FONT_MEDIUM,
    },
    salutationBoxCol: {
        marginBottom: Platform.OS === 'ios' ? 30 : 20,
    },
    name: {
        fontFamily: Typography.FONT_BOLD,
        fontSize: Typography.FONT_SIZE_LARGE,
        lineHeight: 24,
        fontWeight:'bold'
    },
    middleContent: {
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderColor: '#000287',
        borderWidth: 1,
        padding: 32,
        paddingTop: 20,
        height: '100%',
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
    timeLogWrapper: {
        flexDirection: 'row',
        paddingTop: 14,
        marginRight: 20,
        justifyContent: 'center',
    },
    timeLogInner: {
        width: '50%',
        borderRadius: 6,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#f85102',
        borderColor: Colors.SENARY_BORDER_COLOR,
        borderWidth: 1,
        paddingTop: 25,
    },
    timeLogCircle: {
        backgroundColor: 'rgba(210,212,252,0.50)',
        height: 46,
        width: 46,
        borderRadius: 23,
        borderColor: 'rgba(210,212,252,0.50)',
        borderWidth: 1,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeLogText: {
        color: Colors.QUATERNARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_SMALL,
        fontFamily: Typography.FONT_SEMI_BOLD,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 25,
    },
});
export default Home;
