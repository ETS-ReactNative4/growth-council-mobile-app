import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
// import Pdf from 'react-native-pdf';

const pdf = props => {

	const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
	return (
		<View style={styles.container}>
					<Pdf
						source={source}
						onLoadComplete={(numberOfPages,filePath) => {
							console.log(`Number of pages: ${5}`);
						}}
						onPageChanged={(page,numberOfPages) => {
							console.log(`Current page: ${1}`);
						}}
						onError={(error) => {
							console.log(error);
						}}
						onPressLink={(uri) => {
							console.log(`Link pressed: ${uri}`);
						}}
						style={styles.pdf}/>
				</View>
	);
};

export default pdf;

const styles = StyleSheet.create({
	container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
