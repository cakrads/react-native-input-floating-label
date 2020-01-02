import React, { Component, useEffect, useState, useRef } from 'react';
import { View, StatusBar, TextInput, Animated } from 'react-native';

const InputFloatingLabel = props => {
  const [textValue, setTextValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = new Animated.Value(0);
  const animatedIsFocusedRef = useRef(animatedIsFocused);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animatedIsFocusedRef.current.interpolate({
      inputRange: [0, 1],
      outputRange: [29, 0],
    }),
    fontSize: animatedIsFocusedRef.current.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocusedRef.current.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000', 'blue'],
    }),
  };
  useEffect(() => {
    Animated.timing(animatedIsFocusedRef.current, {
      toValue: isFocused || textValue !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }, [isFocused]);

  const handleFocus = status => {
    setIsFocused(status);
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        {...props}
        style={{
          fontSize: 20,
          borderBottomWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 1,
          color: '#000',
          borderColor: 'red',
        }}
        value={textValue}
        onChangeText={text => setTextValue(text)}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
    </View>
  );
};

InputFloatingLabel.defaultProps = {
  style: {},
  children: null,
  borderColor: 'blue',
  label: '',
};

export default class App extends Component {
  state = {
    value: '',
  };

  handleTextChange = newText => this.setState({ value: newText });

  render() {
    return (
      <View style={{ flex: 1, padding: 30, backgroundColor: '#f5fcff' }}>
        <StatusBar hidden />
        <InputFloatingLabel
          label="Email"
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}
