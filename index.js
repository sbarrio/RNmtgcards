/**
 * @format
 */
import "react-native-gesture-handler";  // Fixes crash with gesture-handler on RN 0.61 => https://github.com/kmagiera/react-native-gesture-handler/issues/783
import {
    AppRegistry,
} from 'react-native';
import {name as appName} from './app.json';
import setup from "./src/setup";

AppRegistry.registerComponent(appName, () => setup());
