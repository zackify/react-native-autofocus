import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = [];
  }

  checkIfInput = element => {
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
      if (names.includes(element.type.name)) {
        return input;
      }
    }
    return false;
  };

  cloneElement = (element, index, inputInfo) => {
    let functionNames = [];
    if (inputInfo.submitFunctionNames) {
      functionNames.concat(inputInfo.submitFunctionNames);
    }
    if (inputInfo.submitFunctionName) {
      functionNames.concat(inputInfo.submitFunctionName);
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
    return React.Children.map(children, (child, index) => {
      if (child.props.children)
        return React.cloneElement(child, {
          ...child.props,
          children: this.renderChildren(child.props.children, index)
        });
      const childType = this.checkIfInput(child);
      if (childType === false) return child;

      const realIndex = index + recursiveIndex;

      return this.cloneElement(child, realIndex, this.props.inputElements[childType]);
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

