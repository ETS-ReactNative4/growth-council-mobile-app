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
import DatePicker from 'react-native-datepicker';

const profileUpdateSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Name is required.'),
    email: Yup.string().email('Please enter a valid email.').required('Email is required.'),
    // dob: Yup
    //     .string()
    //     .required('Last name is required.'),
    mobile: Yup
        .string()
        .required('Mobile is required.'),
    // address: Yup
    //     .string()
    //     .required('Address is required.'),
    // passport_number: Yup
    //     .string()
    //     .required('Passport number is required.'),
    // passport_issue_place: Yup
    //     .string()
    //     .required('Passport issue place number is required.'),
    // passport_issue_date: Yup
    //     .string()
    //     .required('Passport issue date is required.'),
    // passport_expiry_date: Yup
    //     .string()
    //     .required('Passport expiry date is required.'),
    // residency_number: Yup
    //     .string()
    //     .required('Residency number is required.'),
});

const EditProfileForm = (props) => {

    const {navigation, profile, loading, error, fetchEmployeeByIdentifier, updateEmployee} = props;

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldValue,
    } = useFormik({
        enableReinitialize: true,
        validationSchema: profileUpdateSchema,
        initialValues: {
            name: profile?.name,
            email: profile?.email,
            dob: profile?.dob,
            mobile: profile?.mobile,
            address: profile?.address,
            passport_number: profile?.passport_number,
            passport_issue_place: profile?.passport_issue_place,
            passport_issue_date: profile?.passport_issue_date,
            passport_expiry_date: profile?.passport_expiry_date,
            residency_number: profile?.residency_number,
            residency_issue_date: profile?.residency_issue_date,
            residency_expiry_date: profile?.residency_expiry_date,
            finance_number: profile?.finance_number,
            seguranca_social_number: profile?.seguranca_social_number,
            mi_number: profile?.mi_number,
            bank_account_number: profile?.bank_account_number,
           // profile_picture: profile?.profile_picture,
        },
        onSubmit: async values => {
            values.id = profile?.id;
            values.project_id = profile?.project_id;
            values.nationality = profile?.nationality;
            values.contract_start_date = profile?.contract_start_date;
            await updateEmployee(values).then(response => {
                if (!response.error) {
                    navigation.navigate('Account');
                    ToastMessage.show('Your information has been successfully updated.');
                }
            });
        },
    });

    useEffect(() => {
        const fetchEmployeeAsync = async () => {
            let token = await getAsyncStorage(JWT_TOKEN);
            let customerID = decodeUserID(token);
            await fetchEmployeeByIdentifier(customerID);
        };
        fetchEmployeeAsync();

    }, []);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

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
                                top:120
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

                        <DatePicker
                            style={{
                                width: '100%',
                                marginBottom: 5,

                            }}
                            date={values.dob}
                            mode="date"
                            placeholder="DOB"
                            format="YYYY-MM-DD"
                            maxDate="2022-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                            }}
                            onDateChange={(date) => {
                                setFieldValue('dob', date);
                            }}
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

                        <FlatOutlineTextInput
                            label='PASSPORT NUMBER'
                            value={values.passport_number}
                            onChangeText={handleChange('passport_number')}
                            onBlur={handleBlur('passport_number')}
                            error={errors.passport_number}
                            touched={touched.passport_number}
                        />

                        <FlatOutlineTextInput
                            label='PASSPORT ISSUE PLACE'
                            value={values.passport_issue_place}
                            onChangeText={handleChange('passport_issue_place')}
                            onBlur={handleBlur('passport_issue_place')}
                            error={errors.passport_issue_place}
                            touched={touched.passport_issue_place}
                        />

                        <DatePicker
                            style={{
                                width: '100%',
                                marginBottom: 5,

                            }}
                            date={values.passport_issue_date}
                            mode="date"
                            placeholder="PASSPORT ISSUE DATE"
                            format="YYYY-MM-DD"
                            maxDate="2022-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                            }}
                            onDateChange={(date) => {
                                setFieldValue('passport_issue_date', date);
                            }}
                        />

                        <DatePicker
                            style={{
                                width: '100%',
                                marginBottom: 5,

                            }}
                            date={values.passport_expiry_date}
                            mode="date"
                            placeholder="PASSPORT EXPIRY DATE"
                            format="YYYY-MM-DD"
                            maxDate="2022-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                            }}
                            onDateChange={(date) => {
                                setFieldValue('passport_expiry_date', date);
                            }}
                        />

                        <FlatOutlineTextInput
                            label='RESIDENCY NUMBER'
                            value={values.residency_number}
                            onChangeText={handleChange('residency_number')}
                            onBlur={handleBlur('residency_number')}
                            error={errors.residency_number}
                            touched={touched.residency_number}
                        />

                        <DatePicker
                            style={{
                                width: '100%',
                                marginBottom: 5,

                            }}
                            date={values.residency_issue_date}
                            mode="date"
                            placeholder="RESIDENCY ISSUE DATE"
                            format="YYYY-MM-DD"
                            maxDate="2022-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                            }}
                            onDateChange={(date) => {
                                setFieldValue('residency_issue_date', date);
                            }}
                        />

                        <DatePicker
                            style={{
                                width: '100%',
                                marginBottom: 5,

                            }}
                            date={values.residency_expiry_date}
                            mode="date"
                            placeholder="RESIDENCY EXPIRY DATE"
                            format="YYYY-MM-DD"
                            maxDate="2022-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0,
                                },
                            }}
                            onDateChange={(date) => {
                                setFieldValue('residency_expiry_date', date);
                            }}
                        />


                        <FlatOutlineTextInput
                            label='FINANCE NUMBER'
                            value={values.finance_number}
                            onChangeText={handleChange('finance_number')}
                            onBlur={handleBlur('finance_number')}
                            error={errors.finance_number}
                            touched={touched.finance_number}
                        />

                        <FlatOutlineTextInput
                            label='SEGURANCA SOCIAL NUMBER'
                            value={values.seguranca_social_number}
                            onChangeText={handleChange('seguranca_social_number')}
                            onBlur={handleBlur('seguranca_social_number')}
                            error={errors.seguranca_social_number}
                            touched={touched.seguranca_social_number}
                        />

                        <FlatOutlineTextInput
                            label='MI NUMBER'
                            value={values.mi_number}
                            onChangeText={handleChange('mi_number')}
                            onBlur={handleBlur('mi_number')}
                            error={errors.mi_number}
                            touched={touched.mi_number}
                        />

                        <FlatOutlineTextInput
                            label='BANK ACCOUNT NUMBER'
                            value={values.bank_account_number}
                            onChangeText={handleChange('bank_account_number')}
                            onBlur={handleBlur('bank_account_number')}
                            error={errors.bank_account_number}
                            touched={touched.bank_account_number}
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
