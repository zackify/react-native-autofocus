import React, { Component } from 'react';

import { View, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
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
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <Form style={styles.form}>
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
              onSubmitEditing={ () => { console.log('poooopie'); } }
            />
        </Form>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'red',
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});