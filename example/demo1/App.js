import React, { Component } from 'react';

import { View, TextInput, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import Form from './form';

export default class App extends Component {
  state = {
    inputValue1: 'You can change me!',
    inputValue2: 'You can change me!',
    inputValue3: 'You can change me!',
  };

  _handleTextChange = i => inputValue => {
    const x = {};
    x[`inputValue${i}`] = inputValue;
    this.setState(x);
  };

  render() {
    return (
      <Form style={styles.container}>
        <TextInput
          value={this.state.inputValue1}
          onChangeText={this._handleTextChange(1)}
          style={{ width: 200, height: 44, padding: 8 }}
          blurOnSubmit={false}
        />

        <TextInput
          value={this.state.inputValue2}
          onChangeText={this._handleTextChange(2)}
          style={{ width: 200, height: 44, padding: 8 }}
          blurOnSubmit={false}
        />

        <TextInput
          value={this.state.inputValue3}
          onChangeText={this._handleTextChange(3)}
          style={{ width: 200, height: 44, padding: 8 }}
          onSubmitEditing={ () => { console.log('poooop'); } }
        />
      </Form>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'red',
  }
});