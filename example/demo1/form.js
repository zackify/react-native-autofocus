import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = [];
  }

  checkIfInput = element => {
    const elemName = element.type.name || element.type.displayName;
    const inputElements = this.props.inputElements ||
    [
      {
        names: ['TextInput'], // names: 'TextInput' or name: 'TextInput' is also okay
        submitFunctionNames: ['onSubmitEditing'], // submitFunctionNames: 'onSubmitEditing' or submitFunctionName: 'onSubmitEditing' is also okay
        focus: 'focus',
      },
    ];
    for (let input of inputElements) {
      let names = [];
      if (input.names) {
        names = names.concat(input.names);
      }
      if (input.name) {
        names.push(input.name);
      }
      console.log('z', names, elemName);
      if (names.includes(elemName)) {
        return input;
      }
    }
    return false;
  };

  cloneElement = (element, index, inputInfo) => {
    console.log('cloning');
    let functionNames = [];
    if (inputInfo.submitFunctionNames) {
      functionNames = functionNames.concat(inputInfo.submitFunctionNames);
    }
    if (inputInfo.submitFunctionName) {
      functionNames = functionNames.concat(inputInfo.submitFunctionName);
    }
    const handleEnterBuilder = (oldEnter) => (...arg) =>
      this.inputs[index + 1]
        ? this.inputs[index + 1][inputInfo['focus']]()
        : oldEnter(...arg);
    const submitFunctions = {};
    for (let func of functionNames) {
      let oldFunc = element.props[func];
      submitFunctions[func] = handleEnterBuilder(oldFunc);
    }
    const oldRef = element.props.ref;
    const handleRef = (ref, ...rest) => {
      this.inputs[index] = ref;
      if (oldRef) {
        oldRef(ref, ...rest);
      }
    };
    return React.cloneElement(element, {
      ...submitFunctions,
      ref: handleRef,
    });
  };

  renderChildren(children, recursiveIndex = 0) {
    console.log('renderChildren', children.length);
    return React.Children.map(children, (child, index) => {
    //return children.map((child, index) => {
      if (child.props.children)
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children, index)
        });
      const childType = this.checkIfInput(child);
      console.log(childType);
      if (childType === false) return child;
      console.log('action');
      const realIndex = index + recursiveIndex;
      return this.cloneElement(child, realIndex, childType);
    });
  }

  render() {
    let { children, ...props } = this.props;
    return (
      <View {...props}>
        {this.renderChildren(children)}
      </View>
    );
  }
}

