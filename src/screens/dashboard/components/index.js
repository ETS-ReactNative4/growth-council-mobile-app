import React from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

import {CommonStyles, Colors} from '../../../theme';

const Dashboard = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={{height: 170, backgroundColor: 'grey'}}/>

            <Image
                source={require("../../../assets/img/massk.png")}
                style={{
                    position: 'absolute',
                    top: 70,
                    height: 150,
                    width: '30%',
                    left: 10,
                }}
            />
            <Image
                source={require("../../../assets/img/massk.png")}
                style={{
                    position: 'absolute',
                    top: 70,
                    height: 150,
                    width: '30%',
                    left: 138,
                }}
            />
            <Image
                source={require("../../../assets/img/massk.png")}
                style={{
                    position: 'absolute',
                    top: 70,
                    height: 150,
                    width: '30%',
                    right: 10,
                }}
            />
            <View>
                <Image
                    source={require("../../../assets/img/Card1.png")}
                    style={{
                        marginTop: 70,
                        height: 150,
                        width: '70%',

                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    wrapper: {
        top: '20%',
    },
});

export default Dashboard;
