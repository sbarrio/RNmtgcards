import React from 'react';
import { 
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { DeviceWidth, Color, DeviceHeight } from '../style/Common';
import FastImage from 'react-native-fast-image';

class CardDetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('cardName', "Card detail"),
      };
    };

    constructor(props) {
      super(props);

      this.state = {
        card : this.props.navigation.state.params.card,
      }
    }

    render() {

      return (

        <View style={styles.container}>

            {this.state.card.imageUrl &&
              <FastImage
              style={styles.cardImage}
              source={{
                  uri: this.state.card.imageUrl,
                  priority: FastImage.priority.high,
                  cache : FastImage.cacheControl.web,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          }

          {!this.state.card.imageUrl &&
            <Image style={styles.cardImage}
              resizeMode='contain' 
              source={require("../../res/img/placeHolder/placeHolderCard.png")}/>
          }

            
        </View>

      );
    }
}

export default CardDetailScreen;

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({

  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : Color.White,
  },

  cardImage : {
    height : DeviceHeight * 0.9,
    width : DeviceWidth * 0.9,
  },

})