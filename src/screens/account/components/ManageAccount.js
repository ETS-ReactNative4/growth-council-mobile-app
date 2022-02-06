import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BubblesLoader} from 'react-native-indicator';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {CommonStyles, Colors, Typography} from '../../../theme';
import ToastMessage from '../../../shared/toast';
import {PRIMARY_BACKGROUND_COLOR} from '../../../theme/colors';
import Footer from '../../../shared/footer';

const profileUpdateSchema = Yup.object().shape({
  display_name: Yup.string().required('Name is required.'),
  first_name: Yup.string().required('First name is required.'),
  last_name: Yup.string().required('Last Name is required.'),
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
});

const ManageAccount = props => {
  const {
    navigation,
    route,
    profile,
    profileLoading,
    profileError,
    fetchProfileByIdentifier,
    cleanProfile,
    userLoading,
    updateUser,

    uploadProfileImages,
    uploadProfileImageLoading,
    uploadProfileImageError,
    uploadImage,

    updateEntities,
    updateLoading,
    updateError,
    updateImage,

    expertise,
    expertiseLoading,
    expertiseError,
    fetchAllExpertises,
    cleanExperties,
  } = props;

  const [open, setOpen] = useState(false);

  let Location = profile?.user_meta?.Location;
  if (typeof Location === 'undefined') {
    Location = ' ';
  } else {
    Location = profile?.user_meta?.Location[0];
  }

  let favorite_quote = profile?.user_meta?.favorite_quote;
  if (typeof favorite_quote === 'undefined') {
    favorite_quote = ' ';
  } else {
    favorite_quote = profile?.user_meta?.favorite_quote[0];
  }

  let professional_summary = profile?.user_meta?.professional_summary;
  if (typeof professional_summary === 'undefined') {
    professional_summary = ' ';
  } else {
    professional_summary = profile?.user_meta?.professional_summary[0];
  }

  let initatives = profile?.user_meta?.initatives;
  if (typeof initatives === 'undefined') {
    initatives = ' ';
  } else {
    initatives = profile?.user_meta?.initatives[0];
  }

  let insights = profile?.user_meta?.insights;
  if (typeof insights === 'undefined') {
    insights = ' ';
  } else {
    insights = profile?.user_meta?.insights[0];
  }

  let expertise_areas1 = profile?.expertise_areas1;
  if (typeof expertise_areas1 === 'undefined') {
    expertise_areas1 = [];
  } else {
    expertise_areas1 = profile?.expertise_areas1;
  }

  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  const [image, setImage] = useState(profile.avatar);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
    }).then(async image => {
      setImage(image.path);
      let fd = new FormData();
      const file = {
        type: image.mime,
        uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
        //name: image.filename || image.path.split('/').pop(),
        name: 'profile_photo.jpg',
      };
      fd.append('file', file);
      console.log('choosePhotoFromLibrary', fd);
      await uploadImage(fd).then(async response => {
        console.log('Upload response:::::::::::', response?.payload?.id);
        await updateImage({attachment_id: response?.payload?.id}).then(
          async response => {
            console.log('Update response::::::::::', response);
          },
        );
      });
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      cropping: true,
    }).then(async image => {
      setImage(image.path);
      let fd = new FormData();
      const file = {
        type: image.mime,
        uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
        //name: image.filename || image.path.split('/').pop(),
        name: 'profile_photo.jpg',
      };
      fd.append('file', file);
      console.log('choosePhotoFromLibrary', fd);
      await uploadImage(fd).then(async response => {
        console.log('Upload response:::::::::::', response?.payload?.id);
        await updateImage({attachment_id: response?.payload?.id}).then(
          async response => {
            console.log('Update response::::::::::', response);
          },
        );
      });
    });
  };

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
      display_name: profile?.display_name,
      first_name: profile?.user_meta?.first_name[0],
      last_name: profile?.user_meta?.last_name[0],
      email: profile?.user_email,
      Location: Location,
      favorite_quote: favorite_quote,
      insights: insights,
      expertise_areas1: expertise_areas1,
      initatives: initatives,
      professional_summary: professional_summary,
    },
    onSubmit: async values => {
      console.log('values::::::::::', values);
      await updateUser(values).then(response => {
        if (response?.payload?.code === 200) {
          navigation.navigate('Person');
          ToastMessage.show('Profile has been successfully updated.');
        }
      });
    },
  });

  useEffect(() => {
    const fetchProfileAsync = async () => {
      await fetchProfileByIdentifier();
    };
    fetchProfileAsync();
  }, []);

  useEffect(() => {
    const fetchAllExpertisesAsync = async () => {
      await fetchAllExpertises();
    };
    fetchAllExpertisesAsync();
  }, []);

  useEffect(() => {
    console.log('expertise_areas1::::::::::', expertise_areas1);
    setValue(expertise_areas1);
    const result = Object.entries(expertise).map(([key, value]) => ({
      label: key,
      value,
    }));
    setItems(result);
    // return () => {setValue([])};
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
      }}>
      <View style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <Image
          source={require('../../../assets/img/appBG.png')}
          style={{height: 160}}
        />
        <View
          style={{
            display: 'flex',
            marginTop: -90,
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <View
            style={{
              zIndex: 30,
              position: 'absolute',
              right: 5,
              marginTop: 10,
              marginRight: 10,
            }}>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <Ionicons
                name={'camera'}
                size={20}
                color="#C4C8CC"
                style={{marginTop: 5, marginLeft: 30}}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={choosePhotoFromLibrary}>
              <AntDesign
                name={'upload'}
                size={20}
                color="#C4C8CC"
                style={{marginTop: 10, marginLeft: 30}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileWrapper}>
            <View style={styles.icon}>
              <Image
                source={{uri: image}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            <View style={styles.header}>
              <Button style={{marginBottom: 10}}>Update</Button>
              <Text style={styles.headingText1}>{profile.display_name}</Text>
              <Text>{profile.user_email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <View style={styles.middle}>
              <View style={styles.wrapper}>
                {profileError && (
                  <View style={styles.message}>
                    <Text style={styles.errorText}>{profileError.message}</Text>
                  </View>
                )}
                {profileLoading && (
                  <>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        position: 'absolute',
                        zIndex: 1011,
                        top: 120,
                        left: 100,
                      }}>
                      <BubblesLoader
                        color={Colors.SECONDARY_TEXT_COLOR}
                        size={80}
                      />
                    </View>
                  </>
                )}

                <View style={styles.middleWrapper}>
                  <View style={styles.middleImage}>
                    <Ionicons name="person-outline" color="white" size={20} />
                  </View>
                  <Text style={styles.menuText}>Account</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color="#d7d7d7"
                    style={{right: 0, position: 'absolute'}}
                  />
                </View>

                <View style={styles.TextWrapper}>
                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    Username
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={values.display_name}
                    onChangeText={handleChange('display_name')}
                    onBlur={handleBlur('display_name')}
                    error={errors.display_name}
                    touched={touched.display_name}
                    editable={false}
                  />

                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    First Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={values.first_name}
                    onChangeText={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    error={errors.first_name}
                    touched={touched.first_name}
                  />

                  <Text
                    style={{
                      size: 7,
                      marginLeft: 10,
                      fontSize: 10,
                      color: '#8F9BB3',
                    }}>
                    Last Name
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    error={errors.last_name}
                    touched={touched.last_name}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Email Address
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                    editable={false}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    Location
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="text"
                    value={values.Location}
                    onChangeText={handleChange('Location')}
                    onBlur={handleBlur('Location')}
                    error={errors.Location}
                    touched={touched.Location}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    FAVORITE QUOTE
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={values.favorite_quote}
                    onChangeText={handleChange('favorite_quote')}
                    onBlur={handleBlur('favorite_quote')}
                    error={errors.favorite_quote}
                    touched={touched.favorite_quote}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    PROFESSIONAL SUMMARY
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={6}
                    style={styles.textarea}
                    keyboardType="text"
                    value={values.professional_summary}
                    onChangeText={handleChange('professional_summary')}
                    onBlur={handleBlur('professional_summary')}
                    error={errors.professional_summary}
                    touched={touched.professional_summary}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    EXPERTISE AREAS
                  </Text>

                  <DropDownPicker
                    multiple={true}
                    min={0}
                    max={5}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={value => {
                      setFieldValue('expertise_areas1', value);
                    }}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    MOST RECENT GROWTH/INNOVATION INITIATIVE
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={values.initatives}
                    onChangeText={handleChange('initatives')}
                    onBlur={handleBlur('initatives')}
                    error={errors.initatives}
                    touched={touched.initatives}
                  />

                  <Text
                    style={{marginLeft: 10, fontSize: 10, color: '#8F9BB3'}}>
                    I'M SEEKING INSIGHTS ON
                  </Text>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.textarea}
                    keyboardType="text"
                    value={values.insights}
                    onChangeText={handleChange('insights')}
                    onBlur={handleBlur('insights')}
                    error={errors.insights}
                    touched={touched.insights}
                  />

                  <View style={styles.loginButtonWrapper}>
                    <TouchableOpacity>
                      <Button style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.loginButtonText}>Update</Text>
                      </Button>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ChangePassword')}>
                  <View style={[styles.middleWrapper, {borderBottomWidth: 0}]}>
                    <View style={styles.middleImage}>
                      <Ionicons name="key" color="white" size={20} />
                    </View>
                    <Text style={styles.menuText}>Change Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  textarea: {
    margin: 10,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },

  loginButtonWrapper: {
    marginLeft: 10,
    marginTop: 18,
    marginBottom: 10,
  },
  loginButton: {
    width: '50%',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#3A9BDC',
  },
  loginButtonText: {
    color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
    fontFamily: Typography.FONT_BOLD,
  },
  message: {
    ...CommonStyles.message,
    width: '86%',
  },
  errorWrapper: {
    width: '70%',
  },
  errorText: {
    ...CommonStyles.errorText,
  },

  container: {
    ...CommonStyles.container,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    paddingLeft: 40,
    paddingRight: 40,
  },
  profileWrapper: {
    padding: 20,
    alignItems: 'center',
    width: 328,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 12,
    position: 'relative',
    paddingTop: 100,
    borderWidth: 1,
    borderColor: '#707070',
  },
  header: {
    alignItems: 'center',
  },
  icon: {
    width: 110,
    height: 110,
    borderColor: PRIMARY_BACKGROUND_COLOR,
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    position: 'absolute',
    top: -35,
  },
  headingText1: {
    ...CommonStyles.headingText1,
    fontFamily: Typography.FONT_NORMAL,
    fontSize: 22,
    fontWeight: '600',
  },
  middle: {},
  wrapper: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F7',
  },
  middleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: '#EDF1F7',
    position: 'relative',
  },
  TextWrapper: {
    marginTop: 10,
  },

  middleImage: {
    width: 40,
    height: 40,
    backgroundColor: '#3A9BDC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },

  menuText: {
    fontSize: 14,
    fontWeight: '500',
    margin: 15,
  },
});
