import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';
import Header from './src/components/common/Header';

// Dummy data
const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends React.Component {
  renderCard(item) {
    return (
      <Card
        key={item.id}
        //title= {item.text} //Up-side of the image
        image={{ uri: item.uri }}
      >
        <Text style={styles.titleStyle}>
          {item.text} 
        </Text>

        <Text style={{ marginBottom:10 }} > BLABLABLABLA </Text>

        <Button 
        icon={{ name: 'code' }}
        backgroundColor='#03A9F4'
        title= 'View Now!'
        />

      </Card>
    );
  }

  renderNoMoreCards() {
    return(
      <Card 
        title='All Done!'
      >
       <Text style={{ marginBottom: 10 }}>
          There is no more content
        </Text>

        <Button 
        backgroundColor='#03A9F4'
        title= 'Get more!'
        />


      </Card>
    );
  }


  render() {
    return (    
      <View style={{ flex:1 }}>
        <Header headerText='Simple swipe app'/>
        <View style={styles.container}>
          <Deck 
            data={DATA}
            renderCard={this.renderCard}
            renderNoMoreCards = {this.renderNoMoreCards}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {   
    backgroundColor: '#fff',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  }
});
