import React, {useEffect} from 'react';
import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {CommonStyles, Colors, Typography} from '../../../theme';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {JWT_TOKEN} from '../../../constants';
import {decodeUserID} from '../../../utils/jwtUtil';
import {useAuthentication} from '../../../context/auth';
import {BubblesLoader} from 'react-native-indicator';

const Profile = (props) => {

    const {navigation, profile, loading, error, fetchEmployeeByIdentifier} = props;
    const {signOut} = useAuthentication();

    useEffect(() => {
        const fetchEmployeeAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let customerID = decodeUserID(token);
            fetchEmployeeByIdentifier(customerID);
        };
        fetchEmployeeAsync();

    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.SECONDARY_BACKGROUND_COLOR}/>

            <View style={styles.content}>

                {loading && (
                    <>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            zIndex: 1011,
                            top: 100
                        }}>
                            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR}/>
                        </View>
                    </>
                )}

                <View style={styles.profile}>

                    <View>
                        <Text style={styles.name}>{profile?.name}</Text>
                        <Text style={styles.address}>{profile?.address}</Text>
                        <Text style={styles.address}>{profile?.nationality}</Text>
                        <Text style={styles.phone}>Mobile: {profile?.mobile}</Text>
                        <Text style={styles.date}>Member
                            since {moment(profile?.contract_start_date).format('MMMM D, YYYY')}</Text>
                        <Text style={styles.date}>Project: {profile?.project_name}</Text>
                    </View>
                    {profile?.profile_picture && (
                        <>
                            <View>
                                <View style={styles.circleProfile}>
                                    <Image style={styles.circleImage} source={{uri: profile?.profile_picture}}/>
                                </View>
                            </View>
                        </>
                    )}
                </View>


                <View style={styles.middleContent}>
                    <View style={styles.contentList}>
                        <TouchableOpacity style={styles.contentListItem}
                                          onPress={() => navigation.navigate('ChangePassword')}>
                            <Text style={styles.contentListName}>Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contentListItem}
                                          onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.contentListName}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.bottomWrapper}>
                    <TouchableOpacity onPress={() => signOut()}>
                        <Text style={styles.signout}>Sign Out</Text>
                    </TouchableOpacity>
                    <Text style={styles.version}>VERSION 1.0</Text>
                </View>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    content: {
        ...CommonStyles.content,
    },
    profile: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 25,
        paddingRight: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Colors.QUATERNARY_BORDER_COLOR,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 150,
        width: '100%',
        flexDirection: 'row',
    },
    circleProfile: {
        backgroundColor: Colors.NONARY_BACKGROUND_COLOR,
        height: 106,
        width: 106,
        borderRadius: 53,
        borderColor: Colors.OCTONARY_BORDER_COLOR,
        borderWidth: 2,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: Colors.UNDENARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
        fontFamily: Typography.FONT_SEMI_BOLD,
        lineHeight: 27,
    },
    address: {
        color: Colors.UNDENARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_BOLD,
    },
    phone: {
        color: Colors.SECONDARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        fontFamily: Typography.FONT_SEMI_BOLD,
        marginTop: 15,
    },
    date: {
        color: Colors.UNDENARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_SMALL,
        fontFamily: Typography.FONT_BOLD,
    },
    circleImage: {
        height: 106,
        width: 106,
        borderRadius: 53,
        borderColor: Colors.OCTONARY_BORDER_COLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        ...CommonStyles.button,
        width: 246,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderColor: 'rgba(112,112,112,0.25)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        ...CommonStyles.buttonText,
        color: 'rgba(177,177,177,0.72)',
        fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
        fontFamily: Typography.FONT_SEMI_BOLD,
    },
    middleContent: {
        padding: 25,
        paddingTop: 20,
        height: '50%',
        marginTop: 10,
    },
    contentList: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    contentListItem: {
        width: '48%',
        alignItems: 'center',
        borderColor: Colors.QUATERNARY_BORDER_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    contentListName: {
        ...CommonStyles.listName,
        color: '#8DA2C7',
        fontSize: Typography.FONT_SIZE_EXTRA_LARGE,
    },
    bottomWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    signout: {
        fontSize: Typography.FONT_SIZE_LARGE,
        fontFamily: Typography.FONT_NORMAL,
        lineHeight: 20,
        marginBottom: 10,
    },
    version: {
        ...CommonStyles.listName,
        color: Colors.SECONDARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_SMALL,
        fontFamily: Typography.FONT_NORMAL,
        lineHeight: 15,
    },
});

export default Profile;

