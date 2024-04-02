
import React from 'react';
import { 
  StyleSheet,
  View, 
  Text,
  Image,
  TouchableOpacity
 } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DeviceWidth, Color, DeviceHeight, DeviceSize } from '../style/Common';
import FadeInView from "../component/FadeInView"
import CardBubble from "../component/ColorBubble";

const CARD_FADE_IN_SPEED = 500;

class CardCell extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {

      return (
                      
      <FadeInView speed={CARD_FADE_IN_SPEED}>
        
        <TouchableOpacity 
          style={styles.container}
          onPress= {() => {this.props.onPress(this.props.card)}}
          >
          
            <FadeInView style={styles.cardImageHolder} speed={CARD_FADE_IN_SPEED}>
              {this.props.card.imageUrl &&
                  <FastImage
                    style={styles.cardImage}
                    source={{
                        uri: this.props.card.imageUrl,
                        priority: FastImage.priority.high,
                        cache : FastImage.cacheControl.web,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
              }

              {!this.props.card.imageUrl &&
                <Image style={styles.cardImage}
                  resizeMode='contain' 
                  source={require("../../res/img/placeHolder/placeHolderCard.png")}/>
              }
            </FadeInView>

            <View style={styles.cardInfoHolder}>

              <Text style={styles.cardName}>
                {this.props.card.name}
              </Text>

              <Text style={styles.cardType}>
                {this.props.card.type}
              </Text>

              <Text style={styles.cardSet}>
                {this.props.card.setName}
              </Text>

              <View style={styles.colorHolder}>

                  {this.props.card.colors && this.props.card.colors.map((color) => {
                      return <CardBubble color={color} key={color}/>
                    }
                  )}

              </View>

            </View>

          </TouchableOpacity>

        </FadeInView>
      );
    }

}

export default CardCell;

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: DeviceWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection : "row",
    minHeight : DeviceHeight * 0.22,
    backgroundColor: Color.White,
    borderBottomWidth : 1,
    borderBottomColor : Color.GreyishWhite,
    color: Color.Grey,
    paddingLeft: DeviceWidth * 0.05,
    paddingRight: DeviceWidth * 0.05,
  },

  cardImageHolder : {
    flex: 4,
  },

  cardImage : {
    height : DeviceHeight * 0.18,
    width : DeviceHeight * 0.18,
  },

  cardInfoHolder : {
    flex: 6,
    marginLeft: DeviceWidth * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection : "column",
  },

  cardName : {
    color: Color.TextBlue,
    fontSize: DeviceWidth <= DeviceSize.smallScreenWidth ? 15 : 18,
    marginBottom: 10,
  },

  cardType: {
    marginBottom: 5,
  },

  cardSet : {
    marginBottom: 10,
  },

  colorHolder : {
    flexDirection : "row",
    alignItems: "flex-start",
    justifyContent : "center",
  }

})