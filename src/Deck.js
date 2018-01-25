import React, { Component } from 'react';
import { 
	View,
	Animated,
	PanResponder,
	Dimensions,
	LayoutAnimation,
	UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 450; //duration in miliseconds

class Deck extends Component {
	static defaultProps = {
		onSwipeRight: () => {},
		onSwipeLeft: () => {}
	}

	constructor(props) {
		super(props);
		this.state = { index : 0 };
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.data !== this.props.data){
			this.setState({ index: 0 });
		}
	}

	componentWillMount() {
		//Object position	
		this.position = new Animated.ValueXY();
		
		//Handling user screentouch/Dragging
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (evt, gestureState) => {
				this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx>SWIPE_THRESHOLD) {
					this.forceSwipe('right');
				} else if (gestureState.dx < -SWIPE_THRESHOLD) {
					this.forceSwipe('left');
				} else {
					this.resetPosition();
				}
			}
		});
	}

	componentWillUpdate(){
		//Nor sure if following line works on Android¿?
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	}

	forceSwipe(direction) {
		const oX = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

		Animated.timing(this.position, {
			toValue: { x: oX * 1.5, y: 0},
			duration: SWIPE_OUT_DURATION 
		}).start(() => {this.onSwipeComplete(direction)});
	}

	//For knowing which element are we swiping and where!!!
	onSwipeComplete(direction) {
		const {onSwipeLeft, onSwipeRight, data} = this.props;
		//Current object on screen
		const currentItem =  data[this.state.index];


		direction === 'right' ? onSwipeRight() : onSwipeLeft();
		this.position.setValue({ x: 0, y: 0 });
		this.setState({ index: this.state.index + 1});
	}

	resetPosition() {
		Animated.spring(this.position, {
			toValue: { x: 0, y: 0 }
		}).start();
	}

	//Interpolation System (between x dir and Rotation) inside this function!
	getCardStyle() {
		const position = this.position;
		//Interpolation starts here!!
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
			outputRange: ['-45deg', '0deg', '45deg']
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }]
		};
	}

	renderCards() {
		if(this.state.index >= this.props.data.length) {
			return this.props.renderNoMoreCards();
		}

		return this.props.data.map((item,currentCard ) => {
			if(currentCard < this.state.index) { 
				return null; 
			}

			if(currentCard === this.state.index){
				return (
					<Animated.View
					key={item.id}
					style={[this.getCardStyle(), styles.cardStackStyle]}
					{...this.panResponder.panHandlers} 
					>
						{this.props.renderCard(item)}
					</Animated.View>
				);
			}

			return (
				<Animated.View 
				style= {[styles.cardStackStyle, { top: 10 * (currentCard-this.state.index) }]} //cascadeStyle
				key = {item.id}
				>
					{this.props.renderCard(item)}
				</Animated.View>
			);
		}).reverse(); //Because if we want Stack style, last element would be the upper one in the stack
	}

	render() {
		return(
			<View>
				{this.renderCards()}
			</View>
		);
	}

}

//Creating the Stack Style in all our Cards
const styles = {
	cardStackStyle: {
		position: 'absolute',
		width: SCREEN_WIDTH
	}
};


export default Deck;
