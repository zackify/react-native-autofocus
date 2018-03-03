import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor() {
    super();
    this.inputs = [];
  }

  defaultProps = {
    inputElements: [
      {
        names: [
          'TextInput'
        ], // names: 'TextInput' or name: 'TextInput' is also okay
        submitFunctionNames: [
          'onSubmitEditing'
        ] // submitFunctionNames: 'onSubmitEditing' or submitFunctionName: 'onSubmitEditing' is also okay
	focus: 'focus'
      }
    ]
  }

  checkIfInput = (element) => {
    for (let i = 0; i < this.props.inputElements.length; ++i) {
      let names = [];
      if (this.props.names) {
        names = names.concat(this.props.names)
      }
      if (this.props.name) {
        names .push(this.props.name);
      }
      if (names.includes(element.type.name)) {
        return i;
      }
    }
    return false;
  }

  cloneElement = (element, index, inputInfo) => {
    let functionNames = [];
    if (inputInfo.submitFunctionNames) {
      functionNames.concat(inputInfo.submitFunctionNames);
    }
    if (inputInfo.submitFunctionName) {
      functionNames.concat(inputInfo.submitFunctionName);
    }
    let oldEnter = null;
    for (let i = 0; i < functionNames.length && !oldEnter; ++i) {
      oldEnter = element.props[functionNames[i]];
    }
    const oldRef = element.props.ref;
    const handleEnter = (...arg) =>
      this.inputs[index + 1] ? this.inputs[index + 1][inputInfo['focus']]() : oldEnter(...arg);
    const handleRef = (ref, ...rest) => {
      this.inputs[index] = ref;
      if (oldRef) {
        oldRef(ref, ...rest);
      }
    }
    return React.cloneElement(element,
      { onEnter: handleEnter, ref: handleRef );
  }

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

