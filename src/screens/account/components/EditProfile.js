import React, {useEffect} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView, TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatOutlineTextInput from '../../../shared/form/FlatOutlineTextInput';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';

const profileUpdateSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required.'),
    email: Yup.string().email('Please enter a valid email.').required('Email is required.'),

    mobile: Yup
        .string()
        .required('Mobile is required.'),
});

const EditProfileForm = (props) => {

    const {navigation, profile, profileLoading, profileError, fetchProfileByIdentifier, updateUser} = props;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        enableReinitialize: true,
        validationSchema: profileUpdateSchema,
        initialValues: {
            name: profile?.name,
            email: profile?.email,
            mobile: profile?.mobile,
            address: profile?.address,
        },
        onSubmit: async values => {
            values.id = profile?.id;
            await updateUser(values).then(response => {
                if (!response.error) {
                    navigation.navigate('Account');
                    ToastMessage.show('Your information has been successfully updated.');
                }
            });
        },
    });

    useEffect(() => {
        const fetchUserAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let customerID = decodeUserID(token);
            await fetchProfileByIdentifier(customerID);
        };
        fetchUserAsync();

    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            <View style={styles.container}>

                <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>
                <View style={styles.content}>

                    {profileError && <View style={styles.message}>
                        <Text style={styles.errorText}>{profileError.message}</Text>
                    </View>
                    }

                    {profileLoading && (
                        <>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                position: 'absolute',
                                zIndex: 1011,
                                top: 120
                            }}>
                                <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR}/>
                            </View>
                        </>
                    )}

                    <View style={styles.body}>
                        <FlatOutlineTextInput
                            label='NAME'
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            error={errors.name}
                            touched={touched.name}
                        />

                        <FlatOutlineTextInput
                            label='EMAIL'
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                        />

                        <FlatOutlineTextInput
                            label='MOBILE'
                            value={values.mobile}
                            keyboardType="numeric"
                            onChangeText={handleChange('mobile')}
                            onBlur={handleBlur('mobile')}
                            error={errors.mobile}
                            touched={touched.mobile}
                        />

                        <FlatOutlineTextInput
                            label='ADDRESS'
                            value={values.address}
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            error={errors.address}
                            touched={touched.address}
                        />

                        <View style={styles.buttonWrapper}>
                            <Button style={styles.button} onPress={handleSubmit} disabled={!isValid}>
                                <Text style={styles.buttonText}>UPDATE</Text>
                            </Button>
                        </View>

                        <View style={styles.cancelWrapper}>
                            <TouchableOpacity>
                                <Text style={styles.cancelText} onPress={() => navigation.goBack()}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
    },
    content: {
        ...CommonStyles.content,
    },
    body: {
        ...CommonStyles.body,
    },
    message: {
        ...CommonStyles.message,
        width: '86%',
    },
    buttonWrapper: {
        ...CommonStyles.buttonWrapper,
        width: '100%',
    },
    button: {
        ...CommonStyles.button,
        height: 56,
    },
    buttonText: {
        ...CommonStyles.buttonText,
    },
    errorWrapper: {
        width: '70%',
    },
    errorText: {
        ...CommonStyles.errorText,
    },
    uploadWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 15 : 10,
        marginBottom: Platform.OS === 'ios' ? 20 : 15,
    },
    photoText: {
        color: Colors.SECONDARY_TEXT_COLOR,
        fontSize: Typography.FONT_SIZE_LARGE,
        fontFamily: Typography.FONT_SEMI_BOLD,
        textAlign: 'left',
        paddingBottom: 5,
    },
    cameraWrapper: {
        ...CommonStyles.content,
        marginLeft: 5,
        width: '20%',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //top: 5,
    },
    camera: {
        height: 45,
        marginTop: Platform.OS === 'ios' ? -5 : -2.75,
        padding: 2,
    },
    capture: {
        backgroundColor: Colors.DUODENARY_BACKGROUND_COLOR,
        borderRadius: 10,
    },
    modalBackground: {
        ...CommonStyles.modalBackground,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
    },
    form: {
        ...CommonStyles.form,
        flexDirection: 'column',
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        height: '100%',
    },
    previewProfile: {
        backgroundColor: Colors.NONARY_BACKGROUND_COLOR,
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: Colors.OCTONARY_BORDER_COLOR,
        borderWidth: 1,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
    },
    previewImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: Colors.OCTONARY_BORDER_COLOR,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        marginBottom: 70,
    },

    contentContainer: {
        paddingBottom: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cancelWrapper: {
        ...CommonStyles.linkWrapper,
        paddingTop: 20,
        paddingBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelText: {
        color: Colors.SECONDARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_MEDIUM,
        paddingLeft: 8,
    },
});


export default EditProfileForm;
