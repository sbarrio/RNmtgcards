
import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import MagicAPI from '../network/magicAPI';
import { Color, DeviceWidth, DeviceHeight, DeviceSize } from '../style/Common';
import CardCell from '../component/CardCell';

// Config
const SEARCH_QUERY_DELAY = 1000; // in ms
const INITIAL_PAGE = 0;


class CardListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "MTG - Card Viewer",
    };
  };

    constructor(props) {
      super(props);

      this.state = {
        searchQuery : "",
        lastQuerySearch : "",
        loadingCards : true,
        cards : null,
        alertErrorShowing : false,
        page : INITIAL_PAGE,
      }

      // Object variables
      this.cancel = null;
      this.fetchingCards = false;

      // Bindings
      this.searchCardsForQuery = this.searchCardsForQuery.bind(this);
      this.showCardDetail = this.showCardDetail.bind(this);
      this.renderCardList = this.renderCardList.bind(this);
      this.renderCardCell = this.renderCardCell.bind(this);
      this.showErrorAlert = this.showErrorAlert.bind(this);

    }

  // Component lifecycle

    componentDidMount() {

      // Initial default card load
      this.cancel = MagicAPI.getNewCancelSource();
      MagicAPI.getCardsPaginated(INITIAL_PAGE, MagicAPI.REQUEST_PAGE_SIZE, this.cancel).then(cards => {

        if (cards && cards.data && cards.data.cards) {

          this.setState({
            cards: cards.data.cards,
            loadingCards : false,
          })

        }

        this.cancel = null;

      }).catch(error => {

        this.setState( {
          loadingCards : false,
          cards: null,
        })

        this.cancel = null;

        this.showErrorAlert();        

      })

    }

    componentDidUpdate(prevProps) {

      if (prevProps.colorFilters !== this.props.colorFilters) {
        this.searchCardsForQuery(this.state.lastQuerySearch, INITIAL_PAGE, true);
      }

    }

  // Navigation methods

    showCardDetail(card) {
      this.props.navigation.navigate("CardDetailScreen", {card : card, cardName : card.name}); 
    }

  // Component methods

    searchCardsForQuery(query, page, forceUpdate) {

      if (!forceUpdate && query == this.state.lastQuerySearch && page == this.state.page) {
        return;
      }

      this.fetchingCards = true;

      // First, we cancel any previous request that was already sent but has not yet finished
      if (this.cancel != null) {
        MagicAPI.cancelRequest(this.cancel);
        this.cancel = null;
      }

      // Second, we preapre a new request with the query string specified by the user
      let filters = {}
      filters[MagicAPI.CONTAINS_MODIFIER] = MagicAPI.IMAGE_URL;
      filters[MagicAPI.NAME_MODIFIER] = query;

      // Apply color filters if any
      let colors = Object.keys(this.props.colorFilters);
      if (colors.length > 0) {

        let colorFilters = "";

        for (var c in colors) {

          if (this.props.colorFilters[colors[c]]) {

            if (colorFilters.length > 0) {
                colorFilters += ","
            }

            colorFilters += [colors[c]];
          }

        }

        filters[MagicAPI.COLOR_MODIFIER] = colorFilters;

      }

      // We will need a new cancellation token
      this.cancel = MagicAPI.getNewCancelSource();

      // We only show the activity indicator on the first list load
      if (page == INITIAL_PAGE) {
        this.setState({
          loadingCards : true
        })
      }

      // Finally, we perform the request
      MagicAPI.getCardsPaginatedWithFilters(page, MagicAPI.REQUEST_PAGE_SIZE, filters, this.cancel).then(cards => {

        this.cancel = null;

        if (cards && cards.data && cards.data.cards) {

          this.setState({
            cards : page > INITIAL_PAGE ? this.state.cards.concat(cards.data.cards) : cards.data.cards,
            loadingCards : false,
            lastQuerySearch : query,
            page : page,
          })

          this.fetchingCards = false;
  
        }

      }).catch(error => {
        
        this.cancel = null;

        this.setState({
          loadingCards : false,
          cards: null,
        })

        this.showErrorAlert()

      });
      
    }

    showErrorAlert() {

      if (!this.state.alertErrorShowing) {

        this.setState({
          alertErrorShowing : true,
        })

        Alert.alert(
          'Something went wrong',
          'Try again some time later.',
          [
            {text: 'Load offline test data', onPress: () => 
              {
                this.setState({
                  alertErrorShowing : false,
                  cards : MagicAPI.TestData.cards,
                  page : INITIAL_PAGE,
                  loadingCards : false,
                })
              }
            },
            {text: 'OK', onPress: () => 
              {
                this.setState({
                  alertErrorShowing : false,
                })
              }
            },
          ],
          {cancelable: false},
        );

      }

    }

  // Render methods

    renderCardCell(card) {

      return (

        <CardCell
          key = { card.multiverseid }
          card = {card.item}
          onPress = { () => this.showCardDetail(card.item) }
        />

      )

    }

    renderCardList(cards, loading) {

      if (loading) {
        return (
          <ActivityIndicator style={styles.cardLoadingIndicator} size="large" color={Color.LoadingBlue}/>
        )
      }

      if (cards != null && cards.length > 0) {

        return (

            <FlatList
              style = {styles.cardFlatList}
              data = {cards}
              onEndReachedThreshold = {6}
              onEndReached = { () => {

                  if (this.fetchingCards) {
                      return;
                  }

                  if (cards != null && cards.length >= MagicAPI.REQUEST_PAGE_SIZE) {
                      this.searchCardsForQuery(this.state.lastQuerySearch, this.state.page + 1, false);
                  }
                  
                }
              }
              renderItem = {(card) => {
                return this.renderCardCell(card);
              }}
              keyExtractor = { (card, index) => index.toString()}
            />

        )

      } else {

        return (

          <View style={styles.noResultsHolder}>

            <Text style={styles.noResultsMessage}> No results </Text>

            <TouchableOpacity style={styles.noResultsRetryButton}
              onPress={() => {

                this.setState({
                  searchQuery : "",
                  lastQuerySearch : ""
                })

                this.searchCardsForQuery("", INITIAL_PAGE, false, true);

              }}
            >
              <Text style={styles.noResultsRetryButtonTitle}> Clear search </Text>
            </TouchableOpacity>

          </View>
          
        )

      }

    }

    

    render() {
      return (

        <SafeAreaView style={styles.safeAreaView}>

          <View style={styles.container}>

            <View style={styles.header}>

              <View style={styles.searchInputHolder}>

                <TextInput
                  style = {styles.searchInput}
                  placeholder = {"Search card by name"}
                  placeholderTextColor = {Color.Grey}
                  autoCapitalize = "none"
                  autoCorrect = {false}
                  maxLength = {MagicAPI.MAX_SEARCH_QUERY_LENGTH}
                  value = {this.state.searchQuery}
                  onChangeText = {(query) => {

                      this.setState({searchQuery : query});

                      clearTimeout(this.timeout);
                      this.timeout = setTimeout(() => {
                        this.searchCardsForQuery(this.state.searchQuery, INITIAL_PAGE, false);
                      }, SEARCH_QUERY_DELAY);

                    }
                  }
                  onSubmitEditing = {() => this.searchCardsForQuery(this.state.searchQuery, INITIAL_PAGE, false)}
                  returnKeyType="search"
                >
                </TextInput>

              </View>

              <View style={styles.filterButtonHolder}>

                  <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => {
                      this.props.navigation.navigate("CardFilterScreen")}
                    }
                  >
                      <Image style={styles.filterIcon} 
                            resizeMode='contain' 
                            source={require("../../res/img/icons/filter.png")}/>

                  </TouchableOpacity>

              </View>

            </View>

            <View style={styles.content}>

              <View style={styles.cardListHolder}>

                  {this.renderCardList(this.state.cards, this.state.loadingCards)}

              </View>

            </View>

          </View>

        </SafeAreaView>

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

export default connect(mapStateToProps, mapDispatchToProps)(CardListScreen);

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({

  safeAreaView : {
    flex: 1,
    backgroundColor : Color.DarkerGreyishWhite,
  },

  container : {
    flex: 1,
    width: DeviceWidth,
    height: DeviceHeight,
    alignItems: "center",
    justifyContent : "center",
    backgroundColor : Color.White,
  },

  header : {
    flex: 1,
    alignItems: "center",
    justifyContent : "center",
    flexDirection: "row",
    width: DeviceWidth,
    height : DeviceHeight * 0.22,
    backgroundColor: Color.GreyishWhite,
  },
  searchInputHolder: {
    flex: 8,
    alignItems: "center",
    justifyContent : "center",
    flexDirection : "row",
    backgroundColor: Color.White,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput : {
    flex: 1,
    minHeight : DeviceWidth <= DeviceSize.smallScreenWidth ? 35 : 50,
    backgroundColor: Color.White,
    color: Color.TextBlue,
  },
  filterButtonHolder : {
    flex: 1.5,
    alignContent: "center",
    justifyContent : "center",
  },
  filterButton : {
    flex: 1,
    alignContent: "center",
    justifyContent : "center",
    paddingLeft : 5,
  },
  filterIcon : {
    flex: 1,
    height: DeviceWidth <= DeviceSize.smallScreenWidth ? 20 : 35,
    width: DeviceWidth <= DeviceSize.smallScreenWidth ? 20 : 35,
  },

  content : {
    flex: 9,
    alignItems: "center",
    justifyContent : "center",
    flexDirection: "column",
    width: DeviceWidth,
  },
  cardListHolder : {
    flex: 1,
    width: DeviceWidth,
    height: DeviceHeight,
    backgroundColor: Color.White,
    alignItems: "center",
    justifyContent : "center",
  },
  cardLoadingIndicator : {
    flex: 1,

  },
  cardFlatList : {
    width: DeviceWidth,
    height: DeviceHeight,
  },

          
  noResultsHolder : {
    flex: 1, 
    alignItems : "center",
    justifyContent : "center"
  },

  noResultsMessage : {
    fontSize : 25,
    color: Color.Grey,
  },

  noResultsRetryButton : {
    marginTop: 20,
  },

  noResultsRetryButtonTitle : {
    fontSize : 25,
    color: Color.TextBlue,
  },

})