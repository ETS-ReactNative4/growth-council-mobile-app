import React, {useEffect, useState} from 'react';
import {
    Platform,
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import {Button} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';

import {CommonStyles, Colors, Typography} from '../../../theme';
import LoadMore from './LoadMore';

const CouncilDetail = props => {

    const {
        navigation,
        route,
        pillars,
        pillarLoading,
        pillarError,
        fetchPillarByIdentifier,
        cleanPillar,
    } = props;

    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        const fetchPillarDetailAsync = async () => {
            await fetchPillarByIdentifier(route?.params?.id);
        };
        fetchPillarDetailAsync();
    }, []);

    console.log('route.params.id:::::::::::::::::', route.params.id);
    // console.log('Pillar Detail:::::::::::::::::', pillars);

    return (
        <ScrollView>
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                />

                <View style={styles.meta}>
                    <Image
                        style={{
                            width: '100%',
                            height: 230,
                            alignItems: 'center',
                        }}
                        source={require('../../../assets/img/welcome_screen_info_image.png')}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                        }}>
                        <Ionicons
                            name={'md-close-circle-sharp'}
                            size={40}
                            color={'#0aade7'}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                </View>

                <View style={{padding: 30}}>
                    <Text style={styles.headingTitle}>{pillars?.name}</Text>
                    <HTMLView value={pillars?.description} style={styles.paragraph}/>
                </View>
                {!loadMore && (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            style={styles.moreButton}
                            onPress={() => setLoadMore(!loadMore)}>
                            <Text style={styles.moreButtonText}>Load More</Text>
                        </Button>
                    </View>
                )}
                {loadMore && (
                    <LoadMore
                        {...props}
                        pillar_id={route?.params?.id}
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        padding: 20,
    },
    meta: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 50 : 10,
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f3354',
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: Typography.FONT_SIZE_MEDIUM,
        lineHeight: 24,
        marginTop: 10,
        marginBottom: 5,
        color: Colors.TERTIARY_TEXT_COLOR,
        textAlign: 'left',
    },
    moreButton: {
        width: '40%',
        borderRadius: 10,
        height: 40,
        fontSize: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    moreButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,
        fontFamily: Typography.FONT_BOLD,
        fontSize: 13,
        fontWeight: 'bold',
    },
});
export default CouncilDetail;
