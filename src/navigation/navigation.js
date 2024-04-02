import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CardListScreen from '../screen/CardListScreen';
import CardDetailScreen from '../screen/CardDetailScreen';
import CardFilterScreen from '../screen/CardFilterScreen';

export const StackNavigator = createStackNavigator ({
    CardList              :   { screen: CardListScreen },
    CardDetailScreen      :   { screen: CardDetailScreen },
    CardFilterScreen      :   { screen: CardFilterScreen }
  });
  
export const App = createAppContainer(StackNavigator);