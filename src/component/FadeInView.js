import React, { useState, useEffect } from 'react';
import { 
  Animated,
  StyleSheet
} from 'react-native';

const DEFAULT_SPEED = 1000; // in ms

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: props.speed ? props.speed : DEFAULT_SPEED,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 
      style={{
        ...props.style,
        opacity: fadeAnim,         
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeInView;

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  
})
