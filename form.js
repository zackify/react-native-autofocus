import React from 'react';
import { View } from 'react-native';

export default class Form extends React.Component {
  constructor() {
    super();
    this.inputs = [];
  }

  renderChildren(children, recursiveIndex = 0) {
    return React.Children.map(children, (child, index) => {
      if(!child)
        return;
      if (child.props.children)
        return React.cloneElement(child, {
          ...child.props, 
          children: this.renderChildren(child.props.children, index)
        });
      if (child.type.name !== 'TextInput') return child;
      
      let realIndex = index + recursiveIndex
      return React.cloneElement(child, {
        onEnter: () =>
          this.inputs[realIndex + 1] ? this.inputs[realIndex + 1].focus() : null,
        inputRef: ref => (this.inputs[realIndex] = ref),
      });
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
