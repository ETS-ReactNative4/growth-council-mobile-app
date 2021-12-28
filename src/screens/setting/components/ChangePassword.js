import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CommonStyles, Colors, Typography} from '../../../theme';
import FlatOutlineTextInput from '../../../shared/form/FlatOutlineTextInput';
import ToastMessage from '../../../shared/toast';
import {getAsyncStorage} from '../../../utils/storageUtil';
import {decodeUserID} from '../../../utils/jwtUtil';
import {JWT_TOKEN} from '../../../constants';

const passwordSchema = Yup.object().shape({
    current_password: Yup.string()
        .min(6, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Old Password is required.'),
    new_password: Yup.string()
        .min(6, 'Too Short!')
        .max(10, 'Too Long!')
        .required('New Password is required.'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Password and confirm password must be match.')
        .required('Confirm password is required.'),
});

const ChangePasswordForm = (props) => {

    const {navigation, loading, error, updateCustomerPassword, cleanCustomerPassword} = props;

    const [hidePass, setHidePass] = useState(true);
    const [hidePass1, setHidePass1] = useState(true);
    const [hidePass2, setHidePass2] = useState(true);

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
    } = useFormik({
        validationSchema: passwordSchema,
        initialValues: {current_password: '', new_password: '', confirm_password: ''},
        onSubmit: async (values) => {
            let token = await getAsyncStorage(JWT_TOKEN);
            values.id = decodeUserID(token);
            delete values.confirm_password;
            await updateCustomerPassword(values).then(response => {
                if (!response.error) {
                    navigation.navigate('SignIn');
                    ToastMessage.show('Your password has been successfully changed.');
                }
            });
        },
    });

    useEffect(
        () => {
            return () => {
                cleanCustomerPassword();
            };
        },
        [],
    );

    return (

        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}/>

            <View style={styles.content}>

                {error && <View style={styles.message}>
                    <Text style={styles.errorText}>{error.message}</Text>
                </View>
                }

                {loading && (
                    <>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            zIndex: 1011,
                        }}>
                            <BubblesLoader color={Colors.SECONDARY_TEXT_COLOR}/>
                        </View>
                    </>
                )}

                <View style={styles.body}>
                    <FlatOutlineTextInput
                        label='Current Password'
                        value={values.current_password}
                        isPassword={true}
                        secureTextEntry={hidePass}
                        onChangeText={handleChange('current_password')}
                        onBlur={handleBlur('current_password')}
                        onFocus={handleBlur('current_password')}
                        error={errors.current_password}
                        touched={touched.current_password}
                    />
                    <Ionicons
                        name={hidePass ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass(!hidePass)}
                        style={{
                            position: 'absolute',
                            bottom: 160,
                            right: 10,
                        }}
                    />

                    <FlatOutlineTextInput
                        label='New Password'
                        value={values.new_password}
                        isPassword={true}
                        secureTextEntry={hidePass1}
                        onChangeText={handleChange('new_password')}
                        onBlur={handleBlur('new_password')}
                        onFocus={handleBlur('new_password')}
                        error={errors.new_password}
                        touched={touched.new_password}
                    />
                    <Ionicons
                        name={hidePass1 ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass1(!hidePass1)}
                        style={{
                            position: 'absolute',
                            bottom: 92,
                            right: 10,
                        }}
                    />

                    <FlatOutlineTextInput
                        label='Re New Password'
                        value={values.confirm_password}
                        isPassword={true}
                        secureTextEntry={hidePass2}
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        onFocus={handleBlur('confirm_password')}
                        error={errors.confirm_password}
                        touched={touched.confirm_password}
                    />
                    <Ionicons
                        name={hidePass2 ? 'eye-outline' : 'eye-off-outline'}
                        size={25}
                        color={Colors.PRIMARY_HEADING_COLOR}
                        onPress={() => setHidePass2(!hidePass2)}
                        style={{
                            position: 'absolute',
                            bottom: 25,
                            right: 10,
                        }}
                    />
                </View>


                <View style={styles.buttonWrapper}>
                    <Button style={styles.button} onPress={handleSubmit} disabled={!isValid}>
                        <Text style={styles.buttonText}>Change | Update</Text>
                    </Button>
                </View>

                <View style={styles.cancelWrapper}>
                    <TouchableOpacity>
                        <Text style={styles.cancelText} onPress={() => navigation.goBack()}>Cancel</Text>
                    </TouchableOpacity>
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
    body: {
        ...CommonStyles.body,
    },
    message: {
        ...CommonStyles.message,
    },
    buttonWrapper: {
        ...CommonStyles.buttonWrapper,
        marginTop: 20,
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
    hideShowCustomWrapper: {
        ...CommonStyles.hideShowWrapper,
        bottom: 165,
    },
    hideShowWrapper: {
        ...CommonStyles.hideShowWrapper,
    },
    hideShowWrapper1: {
        ...CommonStyles.hideShowWrapper,
        bottom: 25,
    },
    hideShow: {
        ...CommonStyles.hideShow,
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


export default ChangePasswordForm;
