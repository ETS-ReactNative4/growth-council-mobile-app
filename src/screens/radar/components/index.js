import React, {useState} from 'react'
import {StyleSheet, Text, View, ScrollView, ImageBackground, TextInput} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';

import {CommonStyles, Colors, Typography} from '../../../theme';

const data = [
    {battery: 0.7, design: 1, useful: 0.9, speed: 0.67, weight: 0.8},
    {battery: 0.6, design: 0.9, useful: 0.8, speed: 0.7, weight: 0.6}
];

const chartSize = 450;
const numberOfScales = 4;

const scale = value => (
    <circle
        key={`scale-${value}`}
        cx={0}
        cy={0}
        r={((value / numberOfScales) * chartSize) / 2}
        fill="#FAFAFA"
        stroke="#999"
        strokeWidth="0.2"
    />
);
const FrostRadar = (props) => {
	const{navigation}=props
    const [show, setShow] = useState(true);
    // const groups = [];
    // const scales = [];
    // for (let i = numberOfScales; i > 0; i--) {
    //   scales.push(scale(i));
    // }
    // groups.push(<g key={`scales`}>{scales}</g>);
    // const middleOfChart = (chartSize / 2).toFixed(4);
    return (

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                
                    <View style={styles.arrow}>
                        <Ionicons
                            name={'arrow-back'}
                            size={50}
                            color='#4287C3'
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View style={{height: '100%'}}>
                        <View style={styles.header}>
                            <Text style={{fontWeight: "bold", fontSize: 20, color:"white"}}>Frost Radar</Text>
                        </View>
                        <View style={styles.radar}>
                            {/* <svg
							version="1"
							xmlns="http://www.w3.org/2000/svg"
							width={chartSize}
							height={chartSize}
							viewBox={`0 0 ${chartSize} ${chartSize}`}
							>
							<g transform={`translate(${middleOfChart},${middleOfChart})`}>{groups}</g>
							</svg> */}
                        </View>
                        <View style={styles.detail}>
                            {show ?
                                <View style={{padding: 20,}}>
                                    <Text style={styles.paragraph}>
                                        Frost & Sullivan's global team of analysts and consultants continuosly
                                        researches a wide range of industries across the globe.
                                        Our work is focused exclusively on identifyig the growth opportunities of the
                                        future and evaluating companies that reabest positioned to take advantage of
                                        them.
                                        The frost Radar is a robust analytical tool that allows us to evalute companies
                                        across two key indices: their focused
                                        on continuouse innovatios and their ability to translate their innovations into
                                        consistent growth. Our primary and secondary analyses span the entire value
                                        chain of each industry,
                                        identifying organistions that consistently develop new growth strategies based o
                                        a visionary understanding of the futures and
                                        a proven ability to effectively address emerging challenges and opportunities.
										{"\n"}
       									{"\n"}
                                        In that vein, the Frost Radar serves as a truly dynamic solution to continuously
                                        benchmark companies' future growth
                                        potential with clear insight into their core strengths and weaknesses.
                                    </Text>

                                    <Button
                                        style={styles.button}
                                        onPress={() => setShow(!show)}
                                    >
                                        <Text style={{color: "white"}}>Add New Data</Text>
                                    </Button>
                                </View>
                                :
								<View>
                                <View style={{
									width:"100%",
									padding: 10,
									display:'flex',
									flexDirection:'row',
									padding:20,
									 }}>
                                   <View style={styles.text}>
									   <Text style={{fontSize:11}}>Name</Text>
									   <Text style={styles.name}>Elon Musk</Text>
									   <Text style={styles.name}>Steve Jobs</Text>
									   <Text style={styles.name}>Jeff Bezos</Text>
									   <Text style={styles.name}>Bill Gates</Text>
									   <Text style={styles.name}>Member 1</Text>
								   </View>
								   <View style={{width:"30%", marginTop:15, marginRight:10, alignItems:'center'}}>
										<Text style={{fontSize:11}}>Growth Index</Text>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
								   </View>
								   <View style={{width:"30%", marginTop:15, alignItems:"center"}}>
									   <Text style={{fontSize:11}}>Innovation Index</Text>
									   <TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
										<TextInput
											style={styles.input}
										/>
								   </View>
									
								  
                                </View>
								<Button
                                        style={styles.button1}
                                        onPress={() => setShow(!show)}
                                    >
                                        <Text style={{color: "white"}}>Show on Radar</Text>
                                    </Button>
								</View>
                            }
                        </View>
                    </View>
               
            </View>
        </ScrollView>
    )
};

export default FrostRadar;

const styles = StyleSheet.create({
    container: {
        ...CommonStyles.container,
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        width: "100%",
        height: '100%',
    },
    header: {
        width: 145,
        height:40,
        backgroundColor: "#4287C3",
        marginLeft: 120,
        justifyContent: 'center',
        alignItems: 'center',

    },
	arrow:{
		marginTop:10,
		marginLeft:10,
	},
    radar: {
        height: 300,
        margin: 10
    },
    detail: {
        backgroundColor: "#E4F2F8",
        height: 405,
        margin: 15,
        borderRadius: 20,
		flex:1
    },
    paragraph: {
        fontFamily: Typography.FONT_SF_REGULAR,
        fontSize: 12,
		color:"#77838F"
    },
    button: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        height: 40,
        borderRadius: 10,
		
    },
	button1: {
        marginTop: 20,
        backgroundColor: Colors.PRIMARY_BUTTON_COLOR,
        height: 40,
        borderRadius: 10,
		margin:20
    },
    text: {
		width:"30%",
		marginTop:15,
    },
	name:{
		marginTop:10,
		fontSize:14,
		fontWeight:'600',
		height:30,
		alignItems:'center',
		fontFamily:Typography.FONT_SF_REGULAR,
		color:'black'
	},
    cardetails: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    input: {
        width: 100,
        height: 30,
        borderRadius: 10,
        borderWidth: 0.5,
		marginTop:10,

    },
	
});
