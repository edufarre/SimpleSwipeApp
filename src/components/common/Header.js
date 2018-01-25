//Import libaries for making the component
import React from 'react';
import { Text, View } from 'react-native';

//Making a component

const Header = (props) => {
	//We can also pass the style using: {styles.viewStyle} directly without creating another var 
	const { textStyle, viewStyle } = styles; 

	return (
		<View style={viewStyle}> 
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
		);
};

const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		//iOS styling
			paddingTop: 15,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.9,
		//
		elevation: 5, // Android command for shadowing
		position: 'relative'
	},
	textStyle: {
		fontSize: 30
	}
};

//Make the component abaliable for the other parts of the app
export default Header;
