import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList, ScrollView
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';

import {CommonStyles, Colors} from '../../../theme';

const EventCalendar = (props) => {

    const [region, setRegion] = useState("Kathmandu");
    const [timezone, setTimezone] = useState("java");
    const [industry, setIndustry] = useState("java");
    const [pillar, setPillar] = useState("Growth Community");

    const [activeYear, setActiveYear] = useState("2021");

    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Executive coaching center',
            subTitle: 'Executive coaching center',
            time: '9:00',
            date: '2021-05-15'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Executive coaching goal setting',
            subTitle: 'Executive coaching center',
            time: '9:00',
            date: '2021-05-15'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Executive coaching goal setting',
            subTitle: 'Executive coaching center',
            time: '9:00',
            date: '2021-05-15'
        },
    ];

    const years = [
        {
            id: 1,
            title: '2020',
        },
        {
            id: 2,
            title: '2021',
        },
        {
            id: 3,
            title: '2022',
        },
    ];

    const renderItem = ({item}) => (
        <Text>{item.title}</Text>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.yearTab}>
                    {years.map((year, i) => {
                        return (
                            <>
                                <TouchableOpacity key={i}
                                                  style={activeYear === year.title ? styles.activeWrapper : styles.passiveWrapper}
                                                  onPress={() => alert(year.title)}>
                                    <Text style={styles.linkText}>{year.title}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    })}
                </View>
                <Picker
                    selectedValue={region}
                    mode={'dropdown'}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}
                >
                    <Picker.Item label="Kathmandu" value="kathmandu"/>
                    <Picker.Item label="Bhaktapur" value="bhaktapur"/>
                </Picker>
                <View style={styles.calendar}>
                    <Calendar
                        markingType={'period'}
                        markedDates={{
                            '2021-05-15': {marked: true, dotColor: '#50cebb'},
                            '2021-05-16': {marked: true, dotColor: '#50cebb'},
                            '2021-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                            '2021-05-22': {color: '#70d7c7', textColor: 'white'},
                            '2021-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                            '2021-05-24': {color: '#70d7c7', textColor: 'white'},
                            '2021-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
                        }}
                    />
                </View>
                <View style={styles.events}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
    },
    yearTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
    },
    activeWrapper: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
    },
    passiveWrapper: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 30,
    },
    wrapper: {
        top: '20%',
    },
    calendar: {},
    events: {},
});

export default EventCalendar;
