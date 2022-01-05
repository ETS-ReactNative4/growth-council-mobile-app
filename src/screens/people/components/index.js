import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Font from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

const People = (props) => {

    const {
        navigation,
        connection,
        connectionLoading,
        connectionError,
        fetchAllConnection,
        cleanConnection
    } = props;

    const [category, setCategory] = useState("Category");
	const _renderItem = ({item, index}) => {
		return (
			<View style={styles.wrapper}>
				<Image source={require('../../../assets/img/welcome_profile_image.png')}
					   style={{
						   width: "30%",
						   height: 90,
						   margin: 8,
					   }}
				/>
				<View style={{margin: 10, width: '50%'}}>
					<Text style={{fontSize: 18, fontWeight: "bold"}}>{item.data.display_name}</Text>
					<Text style={{fontSize: 16}}>Director</Text>
					<Text style={{fontSize: 10}}>West Canadian Digital Imaging</Text>
				</View>
				<Ionicons
					name='checkmark-circle'
					size={30}
					color='skyblue'
					style={{marginTop: 25}}
				/>
			</View>
		)
	};

    useEffect(() => {
        const fetchAllConnectionAsync = async () => {
            await fetchAllConnection();
        };
        fetchAllConnectionAsync();
    }, []);

	
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Ionicons name="search-outline" color={'#000'} size={24}
                              style={{marginLeft: 20, marginTop: 20, zIndex: 20, position: 'absolute'}}/>
                    <TextInput
						
                        style={styles.input}
                        placeholder="Search"
                        keyboardType="text"
						
						
                    />
                    <Ionicons name='list-outline' color="blue" size={40} style={{marginTop: 10}}/>
                    <Ionicons name='ios-grid-outline' color={'#000'} size={30} style={{marginLeft: 10, marginTop: 15}}/>

                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>

                    <Picker
                        selectedValue={category}
                        mode={'dropdown'}
                        style={{height: 30, width: 170,}}
                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                    >
                        <Picker.Item label="Category" value="Category"/>
                        <Picker.Item label="Kathmandu" value="kathmandu"/>
                        <Picker.Item label="Bhaktapur" value="bhaktapur"/>
                    </Picker>

                    <View style={{height: "100%", width: 1, backgroundColor: '#808080'}}/>

                    <Ionicons
                        name='arrow-up'
                        size={20}
                        color='#d7d7d7'
                        style={{marginTop: 20}}
                    />
                    <Ionicons
                        name='arrow-down'
                        size={20}
                        color='#d7d7d7'
                        style={{marginTop: 20}}
                    />
                    <Text style={{marginTop: 20, marginRight: 40}}>Sort</Text>

                    <View style={{height: "100%", width: 0.5, backgroundColor: '#808080'}}/>

                    <Font
                        name='filter'
                        size={20}
                        color='#d7d7d7'
                        style={{marginTop: 20, marginLeft: 20}}
                    />
                    <Text style={{marginTop: 20, marginLeft: 10}}>Filter</Text>
                </View>
                <FlatList
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={connection}
                    renderItem={_renderItem}/>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        // ...CommonStyles.container,
    },
    input: {
        height: 40,
        width: '70%',
        margin: 12,
        borderWidth: 0.5,
        paddingLeft: 40,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    wrapper: {
        width: '95%',
        height: 110,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 8,
        borderRadius: 10,
        borderWidth: 0.3,
    }
});

export default People;
