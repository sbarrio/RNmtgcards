
import React from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity 
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import MagicAPI from '../network/magicAPI';
import { Color, DeviceWidth, DeviceSize, DeviceHeight } from '../style/Common';

class CardFilterScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: "Color filters",
      };
    };

    constructor(props) {
      super(props);

      // Load color filters from redux store
      var colorFilters = [];
      let colors = Object.keys(this.props.colorFilters);

      if (colors.length > 0) {
        colorFilters = this.props.colorFilters;
      } else {
        colorFilters = this.getDefaultColorFilters();
      }

      this.state = {
        colors : Object.keys(MagicAPI.CardColor),
        colorFilters : colorFilters,
      }

      // Bindings
      this.resetColorFilters = this.resetColorFilters.bind(this);
      this.toggleColorFilter = this.toggleColorFilter.bind(this);
      this.updateFilters = this.updateFilters.bind(this);
    }

    getDefaultColorFilters() {

      let colors = Object.keys(MagicAPI.CardColor);
      let colorFilters = [];

      for (var c in colors) {
        colorFilters[colors[c]] = false;
      }

      return colorFilters;
    }

    resetColorFilters() {

      let colorFilters = this.getDefaultColorFilters();

      this.setState({
        colorFilters : colorFilters,
      })

      this.props.setColorFilters([]);

    }

    toggleColorFilter(color) {

      let colorFilters = this.state.colorFilters;
      colorFilters[color] = !colorFilters[color];

      this.setState({
        colorFilters : colorFilters,
      })
      
    }

    updateFilters() {

      this.props.setColorFilters(this.state.colorFilters);
      this.props.navigation.goBack();
    }

    render() {

      return (
        <View style={styles.container}>

          <View style= {styles.colorHolder}>

            {this.state.colors.map((color) => {
                return (

                    <View key={color} style={styles.colorSwitchHolder}>

                      <Switch style={styles.colorSwitch} 
                              value={this.state.colorFilters[color]}
                              onValueChange = { () => {
                                  this.toggleColorFilter(color);
                                }
                              }
                            />

                      <Text style={styles.colorSwitchLabel}>
                        {color}
                      </Text>

                    </View>
                  
                  )
              }
            )}

          </View>

          <TouchableOpacity 
            style={styles.applyFiltersButton}
            onPress = {() => this.updateFilters()}
            >

              <Text style={styles.applyFiltersButtonLabel}>
                  Apply selected filters
              </Text>

          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resetFiltersButton}
            onPress = {() => this.resetColorFilters()}
            >

              <Text style={styles.resetFiltersButtonLabel}>
                  Reset all color filters
              </Text>

          </TouchableOpacity>
          
        </View>
      );

    }

}

function mapStateToProps(state, props) {
  return {
      colorFilters         :   state.colorFilterReducer.colorFilters,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFilterScreen);

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor : Color.White,
  },
  colorHolder : {
    width : DeviceWidth,
    alignItems : "center",
    justifyContent : "center",
    paddingTop: DeviceHeight * 0.05,
  },
  colorSwitchHolder : {
    width : DeviceWidth,
    flexDirection: "row",
    alignItems : "center",
    justifyContent : "center",
    marginBottom: DeviceHeight * 0.02,
  },
  colorSwitch : {
    width : DeviceWidth * 0.2,
  },
  colorSwitchLabel : {
    width : DeviceWidth * 0.2,
    textAlign : "left",
    fontSize : 20,
    color : Color.Grey,
  },
  applyFiltersButton : {
    width : DeviceWidth,
    justifyContent : "flex-start",
    alignItems : "center",
  },
  applyFiltersButtonLabel : {
    textAlign : "center",
    fontSize: 25,
    color: Color.TextBlue,
  },
  resetFiltersButton : {
    width : DeviceWidth,
    justifyContent : "center",
    alignItems : "center",
  },
  resetFiltersButtonLabel : {
    textAlign : "center",
    fontSize: 25,
    color: Color.Red,
  }

})