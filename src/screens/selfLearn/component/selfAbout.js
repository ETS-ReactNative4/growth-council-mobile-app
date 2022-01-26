import React,{useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import {Button} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import PDF from './pdf';


import {CommonStyles, Colors, Typography} from '../../../theme';

const selfAbout = props => {
	const [pdf, setpdf] = useState(false);
  return (
	  <ScrollView>
		<View style={styles.container}>

			<View style={styles.learnWrapper}>
				<Image
				style={{
					width: 163,
					height: 232,
					
					borderRadius: 10,
				}}
				source={require('../../../assets/img/best_practices_slider_image.png')}
				/>
				<View style={{width:160, marginLeft:20}}>
					<View style={{marginTop:30, height:130}}>
						<Text style={{fontSize:18, fontWeight:"bold", marginBottom:10, color:"#080F18"}}>THE GROWTH COACHING BOOK</Text>

						<View style={{height:2, width:50,backgroundColor:"#4774B5"}}/>

						<Text style={{fontSize:10, marginTop:15, color:"#77838F"}}>Prime yourself to become an insanely great leader</Text>
					</View>

					{!pdf && (
						<Button 
						style={styles.buttonWrapper}
						onPress={() => setpdf(!pdf)}>
						<Text style={{color:"white", fontSize:11}} >Read E-Book</Text>
						</Button>
					)}
					{pdf && <PDF {...props}/>}
					
				</View>
			</View>

			<View style={{marginTop:10}}>
				<Text style={{fontSize:14, fontFamily:Typography.FONT_SF_SEMIBOLD, color:"black"}}>Book Summary</Text>

				<Text style={{marginTop:10, fontSize:14, fontFamily:Typography.FONT_SF_REGULAR}}>It’s time to account for the full toll that modern work is exacting on our ability to keep up with and stay ahead of the pace of change.
				With our boundaries broken down by a more interconnected world, time has proven to be an insufficient resource in this era.
				It is energy, not time, that is our most precious and undervalued resource to solve this extraordinary challenge</Text>
			</View>

			<View style={{marginTop:20}}>
				<Text style={{fontSize:14, fontFamily:Typography.FONT_SF_SEMIBOLD, color:"black"}}>Key Take-Aways:</Text>

				<Text style={{marginTop:10, fontSize:14, fontFamily:Typography.FONT_SF_REGULAR}}>
					A practical and fresh perspective on the role of personal energy as a resource in your life to increase your capacity.
					{"\n"}
					{"\n"}
					Critical insights on the choices you are making right now that impact your capacity.
					{"\n"}
					{"\n"}
					A proven technique to improve your day to day energy
				</Text>
			</View>


		</View>
	  </ScrollView>
	
  );
};

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
		margin:15,

    },
	  learnWrapper: {
		height: 252,
		borderRadius: 8,
		
		display: 'flex',
		flexDirection: 'row',
		
	  },
    
});

export default selfAbout;