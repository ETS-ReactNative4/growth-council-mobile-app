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
    console.log('Pillar Detail:::::::::::::::::', pillars);

    return (
        <ScrollView>
            <View style={styles.meta}>
            {!loadMore && (
                <View style={{padding: 20, backgroundColor: '#ffffff'}}>
                 <Image
                    style={{
                        width: '100%',
                        height: 236,
                        alignItems: 'center',
                        borderRadius: 13,
                        position: 'relative',
                    }}
                    source={{ uri : pillars?.pillar_detail_image }}
                />
                 <View
                    style={{
                        position: 'absolute',
                        left: 30,
                        top: 30,
                    }}>
                    <Ionicons
                        name={'md-close-circle-sharp'}
                        size={40}
                        color={'#14A2E2'}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                </View>
           

            )}
             {loadMore && (
           <View style={{backgroundColor: '#ffffff'}}>
                 <Image
                    style={{
                        width: '100%',
                        height: 236,
                        alignItems: 'center',                       
                    }}
                    source={{ uri : pillars?.pillar_detail_image }}
                />
                 <View
                    style={{
                        position: 'absolute',
                        left: 20,
                        top: 30
                    }}>
                    <Ionicons
                        name={'md-close-circle-sharp'}
                        size={40}
                        color={'#14A2E2'}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                </View>               

            )}
                
               
            </View>
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={Colors.PRIMARY_BACKGROUND_COLOR}
                />                

                <View style={{ marginLeft: 30, marginRight:30}}>
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
       flex: 1
    },
    meta: {
        width: '100%',       
    },
    headingTitle: {
        ...CommonStyles.headingTitle,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#080F18',
        marginTop: 20,
        marginBottom: 30,
    },
    paragraph: {
        fontFamily: Typography.FONT_NORMAL,
        fontSize: 14,
        lineHeight: 10,
        fontWeight: 'regular',
        color: '#666767',             
        textAlign: 'left',
    },
    moreButton: {
        width: 134,
        marginTop: 30,
        borderRadius: 10,
        height: 46,      
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        marginLeft: 5,
    },
    moreButtonText: {
        color: Colors.PRIMARY_BUTTON_TEXT_COLOR,       
        fontSize: 12,
        fontWeight: 'medium',
    },
});
export default CouncilDetail;
